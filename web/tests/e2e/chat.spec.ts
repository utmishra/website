import { test, expect } from '@playwright/test';
import { ChatPage } from '../pages/ChatPage';

test.describe('chat flow', () => {
  test('navigates from home to chat', async ({ page }) => {
    const chatPage = new ChatPage(page);
    await page.goto('/');
    await page.getByRole('link', { name: 'Chat with me' }).click();
    await page.waitForURL('**/chat');
    await expect(chatPage.chatInput()).toBeVisible({ timeout: 15000 });
  });

  test('renders user message', async ({ page }) => {
    const chatPage = new ChatPage(page);
    await chatPage.goto();
    await chatPage.sendMessage('Hello, world!');
    await expect(chatPage.messageBubble('Hello, world!')).toBeVisible();
  });
});
