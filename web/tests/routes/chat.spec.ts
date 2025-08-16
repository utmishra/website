import { test, expect } from '../fixtures';
import { setupSession, selectModel } from '../helpers';
import { parseStream } from '../prompts/utils';
import { simpleStream, simpleAnswerText, simpleReasoning } from '../prompts/simple';

test.describe('/api/chat', () => {
  test('streams structured assistant response', async ({ request }) => {
    await setupSession(request);
    await selectModel(request, 'openai/gpt-5-mini');

    const response = await request.post('/api/chat', {
      data: {
        messages: [{ id: '1', role: 'user', content: 'Hello' }],
      },
    });

    expect(response.ok()).toBeTruthy();

    const chunks = parseStream(await response.text());
    expect(chunks).toEqual(simpleStream);

    const text = chunks
      .filter((c: any) => c.type === 'text')
      .map((c: any) => c.text)
      .join('');
    expect(text).toBe(simpleAnswerText);

    expect(
      chunks.some(
        (c: any) => c.type === 'reasoning' && c.text === simpleReasoning,
      ),
    ).toBeTruthy();

    expect(
      chunks.some(
        (c: any) =>
          c.type === 'tool-braveWebSearch' && c.state === 'output-available',
      ),
    ).toBeTruthy();
  });

  test('errors when messages are missing', async ({ request }) => {
    await setupSession(request);
    await selectModel(request, 'openai/gpt-5-mini');

    const response = await request.post('/api/chat', { data: {} });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});

