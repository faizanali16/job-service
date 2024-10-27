// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const jobData = await redis.hgetall(`job:${id}`);
  if (Object.keys(jobData).length === 0) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }
  return NextResponse.json({ id, ...jobData }, { status: 200 });
}
