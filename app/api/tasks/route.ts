import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.UPSTASH_REDIS_REST_URL!;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redisGet(key: string) {
  const res = await fetch(`${BASE_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

async function redisSet(key: string, value: unknown) {
  await fetch(`${BASE_URL}/set/${key}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(JSON.stringify(value)),
  });
}

export async function GET() {
  const overrides = await redisGet("task-overrides") || {};
  return NextResponse.json(overrides);
}

export async function POST(req: NextRequest) {
  const { taskId, field, value } = await req.json();
  const overrides = await redisGet("task-overrides") || {};
  if (!overrides[taskId]) overrides[taskId] = {};
  overrides[taskId][field] = value;
  await redisSet("task-overrides", overrides);
  return NextResponse.json({ ok: true });
}
