/**
 * Gemini AI Provider for StuTool.
 * Uses gemini-2.5-flash (matching Android implementation).
 */

import { AIProvider, AIProviderError, AIErrorType } from "./types";
import { getAIConfig, CAREER_OBJECTIVE_PROMPT, PROVIDER_TIMEOUT_MS } from "./aiConfig";

export class GeminiProvider implements AIProvider {
  readonly name = "Gemini";

  async enhance(objective: string): Promise<string> {
    const { geminiApiKey } = getAIConfig();

    if (!geminiApiKey) {
      throw new AIProviderError(
        AIErrorType.INVALID_API_KEY,
        this.name,
        undefined,
        "Gemini API key not configured"
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: CAREER_OBJECTIVE_PROMPT + objective }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        throw new AIProviderError(AIErrorType.RATE_LIMIT, this.name, 429, "Rate limited");
      }
      if (response.status === 401 || response.status === 403) {
        throw new AIProviderError(AIErrorType.INVALID_API_KEY, this.name, response.status, "Invalid API key");
      }
      if (!response.ok) {
        throw new AIProviderError(AIErrorType.NETWORK_FAILURE, this.name, response.status, `HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text || typeof text !== "string" || !text.trim()) {
        throw new AIProviderError(AIErrorType.EMPTY_RESPONSE, this.name, undefined, "Empty response from Gemini");
      }

      return text.trim();
    } catch (error) {
      if (error instanceof AIProviderError) throw error;
      if ((error as Error).name === "AbortError") {
        throw new AIProviderError(AIErrorType.TIMEOUT, this.name, undefined, `Timed out after ${PROVIDER_TIMEOUT_MS}ms`);
      }
      throw new AIProviderError(
        AIErrorType.NETWORK_FAILURE,
        this.name,
        undefined,
        (error as Error).message
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}
