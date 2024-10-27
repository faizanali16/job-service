// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import Queue from "bull";
import Redis from "ioredis";
import Pusher from "pusher";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const redis = new Redis();
const jobQueue = new Queue("jobQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
  fetch: nodeFetch as unknown as typeof fetch,
});

jobQueue.process(5, async () => {
  try {
    const response = await unsplash.photos.getRandom({ query: "food" });

    const result = Array.isArray(response.response)
      ? response.response[0]?.urls.regular
      : response.response?.urls.regular;

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 300000 + 5000)
    );

    return result;
  } catch (error) {
    console.error("Error processing job:", error);
    throw new Error("Job processing failed");
  }
});

jobQueue.on("completed", async (job, result) => {
  await redis.hset(`job:${job.id}`, "status", "resolved", "result", result);
  pusher.trigger("job-channel", "job-resolved", { id: job.id, result });
});

export async function POST() {
  const job = await jobQueue.add({ status: "pending" });
  await redis.hset(`job:${job.id}`, "status", "pending");
  return NextResponse.json({ id: job.id }, { status: 201 });
}

export async function GET() {
  const jobKeys = await redis.keys("job:*");
  const jobs = await Promise.all(
    jobKeys.map(async (key) => {
      const jobData = await redis.hgetall(key);
      return { id: key.split(":")[1], ...jobData };
    })
  );
  return NextResponse.json(jobs, { status: 200 });
}
