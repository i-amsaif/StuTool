/**
 * Groq AI Provider for StuTool.
 * Uses mixtral-8x7b-32768 (matching Android implementation).
 */

import { AIProvider, AIProviderError, AIErrorType } from "./types";
import { getAIConfig, CAREER_OBJECTIVE_PROMPT, PROVIDER_TIMEOUT_MS } from "./aiConfig";

export class GroqProvider implements AIProvider {
  readonly name = "Groq";

  async enhance(objective: string): Promise<string> {
    const { groqApiKey } = getAIConfig();

    if (!groqApiKey) {
      throw new AIProviderError(
        AIErrorType.INVALID_API_KEY,
        this.name,
        undefined,
        "Groq API key not configured"
      );
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "user", content: CAREER_OBJECTIVE_PROMPT + objective },
          ],
          temperature: 0.7,
          max_tokens: 1024,
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
      const text = data?.choices?.[0]?.message?.content;

      if (!text || typeof text !== "string" || !text.trim()) {
        throw new AIProviderError(AIErrorType.EMPTY_RESPONSE, this.name, undefined, "Empty response from Groq");
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
