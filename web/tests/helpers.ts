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
    const req: any = target as any
    const headers = (await req.extraHTTPHeaders?.()) ?? {}
    await req.setExtraHTTPHeaders?.({
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
    // Page instance – when called before navigation, directly touching
    // localStorage on about:blank throws a SecurityError. To be robust,
    // inject an init script that will set localStorage on the next
    // navigation, and also attempt to set it immediately if we're
    // already on a real document.
    const page = target as Page
    await page.addInitScript((m) => {
      try {
        window.localStorage.setItem('model', m as string)
      } catch {
        // Ignore if storage isn't available yet; init script will run on navigation.
      }
    }, model)

    // Best effort immediate set if the page has already navigated.
    try {
      if (page.url() && !page.url().startsWith('about:')) {
        await page.evaluate((m) => {
          window.localStorage.setItem('model', m)
        }, model)
      }
    } catch {
      // Swallow any storage access issues pre-navigation.
    }
  } else {
    const req: any = target as any
    const headers = (await req.extraHTTPHeaders?.()) ?? {}
    await req.setExtraHTTPHeaders?.({ ...headers, 'x-model': model })
  }
}
