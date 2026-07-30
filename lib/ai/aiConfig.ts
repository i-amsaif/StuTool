/**
 * AI configuration for StuTool.
 * Reads API keys from environment variables — never import this on the client.
 */

// ---------- Environment Validation ----------

export interface AIConfig {
  geminiApiKey: string;
  groqApiKey: string;
  openRouterApiKey: string;
}

let _validatedConfig: AIConfig | null = null;

export function getAIConfig(): AIConfig {
  if (_validatedConfig) return _validatedConfig;

  const geminiApiKey = process.env.GEMINI_API_KEY || "";
  const groqApiKey = process.env.GROQ_API_KEY || "";
  const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";

  const available = [
    geminiApiKey && "Gemini",
    groqApiKey && "Groq",
    openRouterApiKey && "OpenRouter",
  ].filter(Boolean);

  if (available.length === 0) {
    console.error(
      "[AI Config] ❌ No AI API keys configured. Set at least one of: GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY in .env.local"
    );
  } else {
    console.log(`[AI Config] ✅ Providers available: ${available.join(", ")}`);
  }

  _validatedConfig = { geminiApiKey, groqApiKey, openRouterApiKey };
  return _validatedConfig;
}

// ---------- Prompt Template (matches Android exactly) ----------

export const CAREER_OBJECTIVE_PROMPT = `You are a professional resume writer. Improve the following career objective to make it more impactful, professional, and concise.

Rules:
- Output ONLY the improved career objective text
- No headings, labels, or explanations
- No markdown formatting
- No bullet points
- Keep it to 2-3 concise, resume-ready sentences
- Maintain a professional tone suitable for a resume
- Preserve the original intent and field/domain

Career objective to improve:
`;

// ---------- Response Validation ----------

const MIN_RESPONSE_LENGTH = 20;
const MAX_RESPONSE_LENGTH = 500;

/**
 * Clean and validate an AI response before showing it to the user.
 * Matches Android cleanup behavior.
 */
export function cleanAndValidateResponse(raw: string): string | null {
  if (!raw) return null;

  let cleaned = raw
    // Remove markdown formatting
    .replace(/^#+\s*/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^[-•]\s*/gm, "")
    // Collapse repeated newlines into spaces
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    // Collapse multiple spaces
    .replace(/\s{2,}/g, " ")
    .trim();

  // Remove common AI prefixes
  const prefixes = [
    /^(here'?s?\s+(the\s+)?(improved|enhanced|revised)\s+(career\s+)?objective:?\s*)/i,
    /^(improved\s+career\s+objective:?\s*)/i,
    /^(career\s+objective:?\s*)/i,
  ];
  for (const prefix of prefixes) {
    cleaned = cleaned.replace(prefix, "");
  }

  cleaned = cleaned.trim();

  // Sanitize: strip any HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");

  // Validate length
  if (cleaned.length < MIN_RESPONSE_LENGTH) return null;
  if (cleaned.length > MAX_RESPONSE_LENGTH) {
    return null; // Reject and trigger fallback instead of silently truncating
  }

  return cleaned;
}

// ---------- Provider Timeout ----------

export const PROVIDER_TIMEOUT_MS = 15000;
