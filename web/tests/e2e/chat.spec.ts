import { test, expect } from '../fixtures';
import { setupSession, selectModel } from '../helpers';
import { ChatPage } from '../pages/ChatPage';
import { simpleAnswerText, simpleReasoning } from '../prompts/simple';

test.describe('chat flow', () => {
  test('navigates from home to chat', async ({ namedPage }) => {
    const page = await namedPage('user');
    await setupSession(page);
    await selectModel(page, 'openai/gpt-5-mini');

    const chatPage = new ChatPage(page);
    await page.goto('/');
    await page.getByRole('link', { name: 'Chat with me' }).click();
    await page.waitForURL('**/chat');
    await expect(chatPage.chatInput()).toBeVisible({ timeout: 15000 });
  });

  test('renders assistant message with reasoning and tool output', async ({
    namedPage,
  }) => {
    const page = await namedPage('user');
    await setupSession(page);
    await selectModel(page, 'openai/gpt-5-mini');

    const chatPage = new ChatPage(page);
    await chatPage.goto();
    await chatPage.sendMessage('Hello, world!');
    await expect(chatPage.messageBubble('Hello, world!')).toBeVisible();
    await expect(chatPage.messageBubble(simpleAnswerText)).toBeVisible();

    const reasoningToggle = page.getByText('Reasoning details');
    await reasoningToggle.click();
    await expect(
      page.getByText(`[Reasoning]: ${simpleReasoning}`),
    ).toBeVisible();
    await expect(page.getByText('[Tool called: braveWebSearch]')).toBeVisible();
    await expect(page.getByText('Web Search. (done)')).toBeVisible();
  });
});
