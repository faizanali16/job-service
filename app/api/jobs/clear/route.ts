// app/api/jobs/clear/route.ts

import { NextResponse } from "next/server";
import Queue from "bull";
import Redis from "ioredis";

const jobQueue = new Queue("jobQueue");
const redis = new Redis();

export async function DELETE() {
  try {
    await jobQueue.clean(0);

    const jobKeys = await redis.keys("job:*");
    if (jobKeys.length > 0) {
      await redis.del(jobKeys);
    }

    return NextResponse.json(
      { message: "All jobs cleared successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing jobs:", error);
    return NextResponse.json(
      { message: "Failed to clear jobs." },
      { status: 500 }
    );
  }
}
