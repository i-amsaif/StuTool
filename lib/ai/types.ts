/**
 * AI Provider types for StuTool.
 * Shared across all providers and the manager.
 */

// ---------- Error Classification ----------

export enum AIErrorType {
  TIMEOUT = "TIMEOUT",
  RATE_LIMIT = "RATE_LIMIT",
  INVALID_API_KEY = "INVALID_API_KEY",
  NETWORK_FAILURE = "NETWORK_FAILURE",
  EMPTY_RESPONSE = "EMPTY_RESPONSE",
  PARSE_ERROR = "PARSE_ERROR",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  UNKNOWN = "UNKNOWN",
}

export class AIProviderError extends Error {
  constructor(
    public readonly type: AIErrorType,
    public readonly providerName: string,
    public readonly statusCode?: number,
    message?: string
  ) {
    super(message || `${providerName}: ${type}`);
    this.name = "AIProviderError";
  }
}

// ---------- Provider Interface ----------

export interface AIProvider {
  readonly name: string;
  enhance(objective: string): Promise<string>;
}

// ---------- API Route Types ----------

export interface EnhanceRequest {
  objective: string;
}

export interface EnhanceResponse {
  enhanced: string;
  provider: string;
  cached: boolean;
  duration: number;
}

export interface EnhanceErrorResponse {
  error: string;
}
