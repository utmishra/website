// Tool schemas for file-system utilities
// This file defines zod schemas for each method signature exported by file-system.ts
// so they can be surfaced to an AI tool calling layer.

import { z } from 'zod'
import type { ToolSet, UIMessageStreamWriter, UIMessage } from 'ai'
import {
  resolveSafePath,
  getFileMeta,
  listDirectory,
  readTextFile,
  readBuffer,
  readJsonFile,
  pathExists,
  getRoot,
  getCwd,
  walk,
  getFileMetaCached,
  type ListDirOptions,
} from '../../../lib/tools/file-system'
import { logger } from '@components/lib/logging/logger'
import { getCtx } from '@components/lib/logging/context'

// Reusable schemas
const pathSchema = z
  .string()
  .min(1)
  .describe('Path relative to project root (no traversal above root).')

const optionalPathSchema = z
  .string()
  .optional()
  .describe('Optional path relative to project root (defaults to ".").')

const listDirOptionsSchema: z.ZodType<ListDirOptions> = z
  .object({
    recursive: z.boolean().optional().describe('Recurse into sub-directories.'),
    includeHidden: z
      .boolean()
      .optional()
      .describe('Include entries whose name starts with a dot.'),
    followSymlinks: z
      .boolean()
      .optional()
      .describe('Stat targets of symlinks instead of the link entries.'),
    includeSelf: z
      .boolean()
      .optional()
      .describe('Include the directory itself in the returned entries.'),
    maxDepth: z
      .number()
      .int()
      .min(0)
      .optional()
      .describe('Maximum recursion depth (0 = only current dir).'),
  })
  .strict()
  .describe('Options that control directory listing behavior.')

// Individual tool schemas (object keyed by tool name) – zod v3 compatible
// NOTE: These are the raw, un-instrumented definitions. Use buildToolSchemas to
// get versions that stream progress events to the UI data stream.
const rawToolSchemas = {
  resolveSafePath: {
    description:
      'Resolve a path against the sandbox root ensuring it does not escape (prevents traversal).',
    inputSchema: z.object({
      segments: z
        .array(z.string())
        .nonempty()
        .describe('Path segments to join and resolve.'),
    }),
    execute: async ({ segments }: { segments: string[] }) =>
      resolveSafePath(...segments),
  },
  getFileMeta: {
    description: 'Get metadata for a file or directory.',
    inputSchema: z.object({ path: pathSchema }),
    execute: ({ path }: { path: string }) => getFileMeta(path),
  },
  listDirectory: {
    description: 'List directory entries with rich metadata.',
    inputSchema: z.object({
      dir: optionalPathSchema.default('.'),
      options: listDirOptionsSchema.optional(),
    }),
    execute: ({
      dir = '.',
      options = {},
    }: {
      dir?: string
      options?: ListDirOptions
    }) => listDirectory(dir, options),
  },
  readTextFile: {
    description: 'Read a text file with optional encoding (utf8 default).',
    inputSchema: z.object({
      path: pathSchema,
      encoding: z
        .string()
        .optional()
        .describe('Node.js BufferEncoding (default utf8).'),
    }),
    execute: ({
      path,
      encoding,
    }: {
      path: string
      encoding?: BufferEncoding
    }) => readTextFile(path, (encoding as BufferEncoding) || 'utf8'),
  },
  readBuffer: {
    description: 'Read a file as a binary Buffer.',
    inputSchema: z.object({ path: pathSchema }),
    execute: ({ path }: { path: string }) => readBuffer(path),
  },
  readJsonFile: {
    description: 'Read & parse a JSON file, returning the parsed value.',
    inputSchema: z.object({ path: pathSchema }),
    execute: ({ path }: { path: string }) => readJsonFile(path),
  },
  pathExists: {
    description: 'Check whether a path exists (returns boolean).',
    inputSchema: z.object({ path: pathSchema }),
    execute: ({ path }: { path: string }) => pathExists(path),
  },
  getRoot: {
    description: 'Return the file-system sandbox root absolute path.',
    inputSchema: z.object({}),
    execute: () => getRoot(),
  },
  getCwd: {
    description:
      'Return the current working directory relative to root (always ".").',
    inputSchema: z.object({}),
    execute: () => getCwd(),
  },
  walk: {
    description:
      'Iterate directory tree entries as an array (async walk). NOTE: Converts async generator to array.',
    inputSchema: z.object({
      dir: optionalPathSchema.default('.'),
      options: listDirOptionsSchema.optional(),
    }),
    execute: async ({
      dir = '.',
      options = {},
    }: {
      dir?: string
      options?: ListDirOptions
    }) => {
      const results = [] as unknown[]
      for await (const meta of walk(dir, options)) {
        results.push(meta)
      }
      return { entries: results }
    },
  },
  getFileMetaCached: {
    description:
      'Get cached metadata for a path (computes & caches if missing).',
    inputSchema: z.object({ path: pathSchema }),
    execute: ({ path }: { path: string }) => getFileMetaCached(path),
  },
} as const

interface BuildOptions {
  /** Optional UI data stream writer for emitting custom data parts (currently unused). */
  dataStream?: UIMessageStreamWriter<UIMessage>
  /** If true, include input args in the start event (sanitized). */
  includeInputs?: boolean
}

function safeJson(value: unknown, max = 400): string {
  try {
    const str = JSON.stringify(value)
    if (str.length > max) return str.slice(0, max) + '…'
    return str
  } catch {
    return '[unserializable]'
  }
}

export function buildToolSchemas(options: BuildOptions = {}): ToolSet {
  const { dataStream, includeInputs = true } = options
  return Object.fromEntries(
    Object.entries(rawToolSchemas).map(([name, def]) => {
      const ctx = getCtx()
      const toolCallId = crypto.randomUUID()
      return [
        name,
        {
          description: def.description,
          inputSchema: def.inputSchema,
          execute: async (args: any) => {
            const started = Date.now()
            logger.info(
              {
                ...ctx,
                toolCallId,
                tool: name,
                args: includeInputs ? args : undefined,
              },
              'tool.start',
            )

            try {
              const result = await def.execute(args)
              logger.info(
                {
                  ...ctx,
                  toolCallId,
                  tool: name,
                  ms: Date.now() - started,
                  ok: true,
                },
                'tool.finish',
              )

              return result
            } catch (err: any) {
              logger.error(
                {
                  ...ctx,
                  toolCallId,
                  tool: name,
                  ms: Date.now() - started,
                  err,
                },
                'tool.error',
              )
              throw err
            }
          },
        },
      ]
    }),
  ) as ToolSet
}

export type ToolDefinition = ReturnType<
  typeof buildToolSchemas
>[keyof ReturnType<typeof buildToolSchemas>]

export function getToolByName<T extends keyof typeof rawToolSchemas>(
  name: T,
  options: BuildOptions,
) {
  return buildToolSchemas(options)[name]
}

export const toolNames = Object.keys(
  rawToolSchemas,
) as (keyof typeof rawToolSchemas)[]
