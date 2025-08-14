import type { APIRequestContext, Page } from '@playwright/test'

/**
 * Adds a basic session cookie or header to the provided target. The
 * helper supports both {@link Page} and {@link APIRequestContext}
 * making it reusable across E2E and route tests.
 */
export async function setupSession(
  target: Page | APIRequestContext,
  sessionId = 'test-user',
) {
  if ('context' in target) {
    // Page instance – add a cookie to the underlying context.
    const cookie = {
      name: 'session',
      value: sessionId,
      domain: 'localhost',
      path: '/',
    }
    await target.context().addCookies([cookie])
  } else {
    // APIRequestContext – send the session via cookie header.
    const headers = await target.extraHTTPHeaders()
    await target.setExtraHTTPHeaders({
      ...headers,
      Cookie: `session=${sessionId}`,
    })
  }
}

/**
 * Select the model to use by either writing to local storage for UI
 * tests or setting a header for route tests.
 */
export async function selectModel(
  target: Page | APIRequestContext,
  model: string,
) {
  if ('evaluate' in target) {
    await target.evaluate(
      (m) => {
        window.localStorage.setItem('model', m)
      },
      model,
    )
  } else {
    const headers = await target.extraHTTPHeaders()
    await target.setExtraHTTPHeaders({ ...headers, 'x-model': model })
  }
}

