// lib/logging/context.ts
import { AsyncLocalStorage } from 'node:async_hooks'
type Ctx = {
  requestId: string
  streamId: string
  chatId?: string
  userId?: string
}
export const als = new AsyncLocalStorage<Ctx>()

export function withRequestContext<T>(ctx: Ctx, fn: () => Promise<T>) {
  return als.run(ctx, fn)
}
export function getCtx() {
  return als.getStore()
}
