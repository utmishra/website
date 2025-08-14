import { Page, Locator } from '@playwright/test';

export class ChatPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/chat');
  }

  chatInput(): Locator {
    return this.page.locator('textarea[name="chatInput"]');
  }

  async sendMessage(message: string) {
    await this.chatInput().fill(message);
    await this.chatInput().press('Enter');
  }

  messageBubble(text: string): Locator {
    return this.page.getByText(text);
  }
}
