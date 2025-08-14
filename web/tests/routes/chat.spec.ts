import { test, expect } from '../fixtures';
import { setupSession, selectModel } from '../helpers';
import { genericSystemPrompt } from '../../src/app/api/chat/prompts/generic-system-prompt';
import { systemPrompt } from '../../src/app/api/chat/prompts/file-system-prompt';

test.describe('/api/chat', () => {
  test('streams generic system prompt', async ({ request }) => {
    test.skip(!process.env.OPENAI_API_KEY, 'OPENAI_API_KEY not set');

    await setupSession(request);
    await selectModel(request, 'openai/gpt-5-mini');

    const response = await request.post('/api/chat', {
      data: {
        messages: [{ id: '1', role: 'user', content: 'Hello' }],
      },
    });

    expect(response.ok()).toBeTruthy();

    const raw = await response.text();
    const dataLines = raw
      .split('\n')
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.replace(/^data:\s*/, ''))
      .filter((line) => line !== '[DONE]');

    type ContentPart = { text?: string };
    const first = JSON.parse(dataLines[0]);
    const content = Array.isArray(first.content)
      ? first.content.map((p: ContentPart) => p.text ?? '').join('')
      : first.content;

    const SYSTEM_PROMPT_SLICE_LENGTH = 50;
    expect(content).toBe(genericSystemPrompt);
    expect(content).not.toContain(
      systemPrompt.slice(0, SYSTEM_PROMPT_SLICE_LENGTH),
    );
  });

  test('errors when messages are missing', async ({ request }) => {
    await setupSession(request);
    await selectModel(request, 'openai/gpt-5-mini');

    const response = await request.post('/api/chat', { data: {} });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});

