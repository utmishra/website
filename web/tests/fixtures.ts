import { test as base, expect } from '@playwright/test'
import type { BrowserContext, Page } from '@playwright/test'

/**
 * Extend Playwright's base test with the ability to create and reuse
 * named user contexts. Each unique name receives its own browser
 * context and page which are automatically cleaned up after the test
 * finishes. This makes it easy to model multiple independent users in
 * a single test.
 */
type NamedUserFixtures = {
  /**
   * Returns a {@link Page} scoped to the provided user name. The page
   * is created on first use and subsequent calls with the same name
   * return the same instance.
   */
  namedPage: (name: string) => Promise<Page>
}

export const test = base.extend<NamedUserFixtures>({
  namedPage: async ({ browser }, use) => {
    const contexts: Record<string, BrowserContext> = {}
    const pages: Record<string, Page> = {}

    await use(async (name: string) => {
      if (!pages[name]) {
        const context = await browser.newContext()
        const page = await context.newPage()
        contexts[name] = context
        pages[name] = page
      }
      return pages[name]
    })

    await Promise.all(
      Object.values(contexts).map((context) => context.close()),
    )
  },
})

export { expect }

