import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const ua = (request.headers.get("user-agent") || "unknown").slice(0, 500);
  const referer = request.headers.get("referer") || "";

  let body: { page?: string; referrer?: string } = {};
  try {
    body = await request.json();
  } catch {
    // body is optional
  }

  const record = {
    ip,
    ua,
    page: body.page || "",
    referrer: body.referrer || referer,
    visitedAt: new Date().toISOString(),
  };

  try {
    const key = `visit:${Date.now()}:${ip.slice(0, 8)}`;
    await kv.set(key, record);
  } catch (err) {
    console.error("KV visit write error:", err);
  }

  return NextResponse.json({ ok: true });
}
