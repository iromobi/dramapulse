import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Rate limiter: simple in-memory Map (shared across warm instances on Vercel)
const rateMap = new Map<string, number[]>();

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000;
  const max = 3;

  const timestamps = rateMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < window);

  if (recent.length >= max) return false;

  recent.push(now);
  rateMap.set(ip, recent);
  return true;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    const keys = await kv.keys("subscriber:*");
    const records = [];
    for (const key of keys) {
      const data = await kv.get(key);
      if (data) records.push(data);
    }
    records.sort(
      (a, b) =>
        new Date((b as Record<string, string>).subscribedAt).getTime() -
        new Date((a as Record<string, string>).subscribedAt).getTime()
    );
    return NextResponse.json({ total: records.length, subscribers: records });
  } catch (err) {
    console.error("KV read error:", err);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const ua = (request.headers.get("user-agent") || "unknown").slice(0, 500);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, source = "unknown" } = body;

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const record = {
    email,
    source,
    ip,
    ua,
    subscribedAt: new Date().toISOString(),
  };

  try {
    // Use Vercel KV: list of subscribers stored under key "subscribers"
    const key = `subscriber:${Date.now()}:${email}`;
    await kv.set(key, record);

    // Also add email to a set for dedup
    await kv.sadd("subscriber_emails", email);
  } catch (err) {
    console.error("KV write error:", err);
    return NextResponse.json(
      { error: "Storage error. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Thank you for subscribing! You'll get drama updates in your inbox.",
  });
}
