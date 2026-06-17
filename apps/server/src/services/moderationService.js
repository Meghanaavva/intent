import { ENV } from '../config/env.js';

const BLOCKED_WORDS = [
  'spam','scam','porn','nsfw','nude','kill','murder',
  'terrorist','drug','cocaine','suicide','bomb'
];

// Basic local check (runs always, fast)
function localCheck(text) {
  if (!text || typeof text !== 'string') return { safe: false, reason: 'invalid_input' };
  if (text.trim().length < 5)   return { safe: false, reason: 'too_short' };
  if (text.length > 160)        return { safe: false, reason: 'too_long' };
  const lower = text.toLowerCase();
  const found = BLOCKED_WORDS.find(w => lower.includes(w));
  if (found) return { safe: false, reason: 'content_policy' };
  return { safe: true };
}

// OpenAI moderation (runs if API key exists)
async function openAICheck(text) {
  try {
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ENV.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ input: text }),
    });
    const data = await res.json();
    const result = data.results?.[0];
    if (!result) return { safe: true };
    if (result.flagged) return { safe: false, reason: 'ai_moderation' };
    return { safe: true };
  } catch (err) {
    // If OpenAI fails, fall back to local check only
    console.warn('[Moderation] OpenAI check failed, using local only:', err.message);
    return { safe: true };
  }
}

export async function checkContent(text) {
  // Always run local check first (instant)
  const local = localCheck(text);
  if (!local.safe) return local;

  // Run OpenAI check only if API key is configured
  if (ENV.OPENAI_API_KEY && ENV.OPENAI_API_KEY.startsWith('sk-')) {
    return openAICheck(text);
  }

  return { safe: true };
}