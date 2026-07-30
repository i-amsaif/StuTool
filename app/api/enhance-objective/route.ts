/**
 * API Route: POST /api/enhance-objective
 *
 * Secure server-side proxy for AI career objective enhancement.
 * API keys never leave the server. The frontend only knows about this endpoint.
 */

import { NextRequest, NextResponse } from "next/server";
import { enhanceObjective } from "@/lib/ai/providerManager";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { objective } = body;

    // Validate input
    if (!objective || typeof objective !== "string" || !objective.trim()) {
      return NextResponse.json(
        { error: "Please enter a career objective first." },
        { status: 400 }
      );
    }

    const trimmed = objective.trim();

    if (trimmed.length < 10) {
      return NextResponse.json(
        { error: "Career objective is too short. Please write at least a sentence." },
        { status: 400 }
      );
    }

    // Call provider manager
    const startTime = Date.now();
    const result = await enhanceObjective(trimmed);
    const duration = Date.now() - startTime;

    return NextResponse.json({
      enhanced: result.text,
      provider: result.provider,
      cached: false,
      duration,
    });
  } catch (error) {
    console.error("[API /enhance-objective]", (error as Error).message);

    return NextResponse.json(
      { error: "AI is currently busy. Please try again shortly." },
      { status: 503 }
    );
  }
}
