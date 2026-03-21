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
  const notes = await redisGet("task-notes") || {};
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const { taskId, note } = await req.json();
  const notes = await redisGet("task-notes") || {};
  notes[taskId] = note;
  await redisSet("task-notes", notes);
  return NextResponse.json({ ok: true });
}
