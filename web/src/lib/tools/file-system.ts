import type { Stats } from 'fs'
import { promises as fsp } from 'fs'
import path from 'path'

// Read-only file system utilities (Node.js only)
// Place in: web/src/utils/file-system.ts

/**
 * Root directory within which all resolved paths must stay (prevent traversal).
 * You can change this if you want to sandbox to a sub-folder.
 */
const FS_ROOT = process.cwd()

/**
 * Ensures code only runs server-side (Node.js). Throws if used in the browser / edge without fs.
 */
function assertNodeEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('file-system: This module is server-only (Node.js).')
  }
}

/**
 * Normalize & resolve a path against FS_ROOT and ensure it does not escape.
 */
export function resolveSafePath(...segments: string[]): string {
  assertNodeEnv()
  const candidate = path.resolve(FS_ROOT, path.join(...segments))
  if (!candidate.startsWith(FS_ROOT)) {
    throw new Error(`Path escapes root: ${candidate}`)
  }
  return candidate
}

export type FileKind =
  | 'file'
  | 'dir'
  | 'symlink'
  | 'socket'
  | 'fifo'
  | 'block-device'
  | 'char-device'
  | 'unknown'

export interface FileMeta {
  absPath: string
  relPath: string
  name: string
  kind: FileKind
  size: number | null
  isHidden: boolean
  mtimeMs: number
  ctimeMs: number
  mode: number
}

function classify(stats: Stats): FileKind {
  if (stats.isFile()) return 'file'
  if (stats.isDirectory()) return 'dir'
  if (stats.isSymbolicLink()) return 'symlink'
  if (stats.isSocket()) return 'socket'
  if (stats.isFIFO()) return 'fifo'
  if (stats.isBlockDevice()) return 'block-device'
  if (stats.isCharacterDevice()) return 'char-device'
  return 'unknown'
}

/**
 * Get metadata for a single file or directory.
 * Follows symlinks (use lstat option if needed later).
 */
export async function getFileMeta(p: string): Promise<FileMeta> {
  assertNodeEnv()
  const absPath = resolveSafePath(p)
  const stats = await fsp.stat(absPath)
  const relPath = path.relative(FS_ROOT, absPath) || '.'
  const name = path.basename(absPath)
  return {
    absPath,
    relPath,
    name,
    kind: classify(stats),
    size: stats.isFile() ? stats.size : null,
    isHidden: name.startsWith('.'),
    mtimeMs: stats.mtimeMs,
    ctimeMs: stats.ctimeMs,
    mode: stats.mode,
  }
}

export interface ListDirOptions {
  recursive?: boolean
  includeHidden?: boolean
  followSymlinks?: boolean
  filter?(meta: FileMeta): boolean | Promise<boolean>
  /**
   * If true, returns directory itself metadata plus children.
   * Default false (only children).
   */
  includeSelf?: boolean
  /**
   * Max recursion depth (0 = only current dir). Only applies when recursive = true.
   */
  maxDepth?: number
}

export interface ListResult {
  entries: FileMeta[]
}

/**
 * List directory contents (read-only).
 */
export async function listDirectory(
  dir: string = '.',
  options: ListDirOptions = {},
): Promise<ListResult> {
  assertNodeEnv()
  const {
    recursive = false,
    includeHidden = false,
    followSymlinks = false,
    filter,
    includeSelf = false,
    maxDepth = Infinity,
  } = options
  const absDir = resolveSafePath(dir)
  const out: FileMeta[] = []

  async function processDir(currentAbs: string, depth: number) {
    const dirents = await fsp.readdir(currentAbs, { withFileTypes: true })

    for (const d of dirents) {
      const absPath = path.join(currentAbs, d.name)
      let stats: Stats
      try {
        stats = followSymlinks
          ? await fsp.stat(absPath)
          : await fsp.lstat(absPath)
      } catch {
        continue
      }
      const relPath = path.relative(FS_ROOT, absPath)
      const meta: FileMeta = {
        absPath,
        relPath: relPath || '.',
        name: d.name,
        kind: classify(stats),
        size: stats.isFile() ? stats.size : null,
        isHidden: d.name.startsWith('.'),
        mtimeMs: stats.mtimeMs,
        ctimeMs: stats.ctimeMs,
        mode: stats.mode,
      }

      if (!includeHidden && meta.isHidden) {
        // skip hidden
      } else if (!filter || (await filter(meta))) {
        out.push(meta)
      }

      if (
        recursive &&
        meta.kind === 'dir' &&
        depth < maxDepth &&
        // avoid recursing into symlinked dirs when not following
        (followSymlinks || !d.isSymbolicLink())
      ) {
        await processDir(absPath, depth + 1)
      }
    }
  }

  if (includeSelf) {
    try {
      out.push(await getFileMeta(absDir))
    } catch {
      // ignore
    }
  }
  await processDir(absDir, 0)
  return { entries: out }
}

/**
 * Read a text file (utf8 by default).
 */
export async function readTextFile(
  p: string,
  encoding: BufferEncoding = 'utf8',
): Promise<string> {
  assertNodeEnv()
  const absPath = resolveSafePath(p)
  return fsp.readFile(absPath, { encoding })
}

/**
 * Read a file as Buffer.
 */
export async function readBuffer(p: string): Promise<Buffer> {
  assertNodeEnv()
  const absPath = resolveSafePath(p)
  return fsp.readFile(absPath)
}

/**
 * Read JSON file safely with generic typing.
 */
export async function readJsonFile<T = unknown>(p: string): Promise<T> {
  const raw = await readTextFile(p, 'utf8')
  return JSON.parse(raw) as T
}

/**
 * Check existence (resolves to boolean, no error).
 */
export async function pathExists(p: string): Promise<boolean> {
  assertNodeEnv()
  try {
    const abs = resolveSafePath(p)
    await fsp.access(abs)
    return true
  } catch {
    return false
  }
}

/**
 * Current working directory (root).
 */
export function getRoot(): string {
  return FS_ROOT
}

/**
 * Get the current working directory relative to FS_ROOT (always '.').
 * Included for API symmetry / future changes.
 */
export function getCwd(): string {
  return '.'
}

/**
 * Recursively walk and yield entries (async generator).
 */
export interface WalkOptions extends Omit<ListDirOptions, 'includeSelf'> {}
export async function* walk(
  dir: string = '.',
  options: WalkOptions = {},
): AsyncGenerator<FileMeta, void, unknown> {
  const { entries } = await listDirectory(dir, {
    ...options,
    includeSelf: false,
  })
  for (const e of entries) {
    yield e
  }
}

/**
 * Lightweight in-memory cache wrapper for metadata (optional usage).
 */
const metaCache = new Map<string, FileMeta>()
export async function getFileMetaCached(p: string): Promise<FileMeta> {
  const abs = resolveSafePath(p)
  const cached = metaCache.get(abs)
  if (cached) return cached
  const meta = await getFileMeta(abs)
  metaCache.set(abs, meta)
  return meta
}
