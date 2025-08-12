// lib/logging/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  redact: {
    paths: ['req.body', 'args.path', 'args.segments', '*.encoding'],
    remove: true,
  },
  base: { service: 'fs-assistant' },
  timestamp: pino.stdTimeFunctions.isoTime,
})
