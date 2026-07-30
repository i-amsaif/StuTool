/**
 * AI Provider Manager for StuTool.
 *
 * Tries providers in registration order (Gemini → Groq → OpenRouter).
 * On failure, logs the error server-side and falls through to the next.
 * Applies response cleanup and validation before returning.
 */

import { AIProvider, AIProviderError, AIErrorType } from "./types";
import { cleanAndValidateResponse } from "./aiConfig";
import { GeminiProvider } from "./geminiProvider";
import { GroqProvider } from "./groqProvider";
import { OpenRouterProvider } from "./openRouterProvider";

// ---------- Configurable Provider Registration ----------

const providers: AIProvider[] = [
  new GeminiProvider(),
  new GroqProvider(),
  new OpenRouterProvider(),
];

export interface EnhanceResult {
  text: string;
  provider: string;
}

/**
 * Try each registered provider in order.
 * Returns the first successful, validated result.
 * Throws if all providers fail.
 */
export async function enhanceObjective(objective: string): Promise<EnhanceResult> {
  const errors: { provider: string; type: string; message: string; status?: number }[] = [];

  for (const provider of providers) {
    try {
      console.log(`[AI Manager] Trying ${provider.name}...`);
      const startTime = Date.now();

      const rawText = await provider.enhance(objective);

      const elapsed = Date.now() - startTime;
      console.log(`[AI Manager] ${provider.name} responded in ${elapsed}ms`);

      // Clean and validate
      const cleaned = cleanAndValidateResponse(rawText);

      if (!cleaned) {
        console.warn(`[AI Manager] ${provider.name}: response failed validation after cleanup`);
        errors.push({
          provider: provider.name,
          type: AIErrorType.VALIDATION_FAILED,
          message: "Response failed validation after cleanup",
        });
        continue;
      }

      console.log(`[AI Manager] ✅ Success via ${provider.name} (${elapsed}ms)`);
      return { text: cleaned, provider: provider.name };
    } catch (error) {
      const aiError =
        error instanceof AIProviderError
          ? error
          : new AIProviderError(AIErrorType.UNKNOWN, provider.name, undefined, (error as Error).message);

      console.warn(
        `[AI Manager] ❌ ${provider.name} failed | Type: ${aiError.type} | Status: ${aiError.statusCode || "N/A"} | ${aiError.message}`
      );

      errors.push({
        provider: aiError.providerName,
        type: aiError.type,
        message: aiError.message,
        status: aiError.statusCode,
      });

      // Continue to next provider
    }
  }

  // All providers exhausted
  console.error("[AI Manager] All providers failed:", JSON.stringify(errors, null, 2));
  throw new Error("All AI providers failed. Please try again shortly.");
}
