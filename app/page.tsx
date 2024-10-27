// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import Button from "./components/Button";
import Pusher from "pusher-js";
import Image from "next/image";

interface Job {
  id: string;
  status: string;
  result: string | null;
}

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data.sort((a: Job, b: Job) => a.id.localeCompare(b.id)));
  };

  const createJob = async () => {
    setLoading(true);
    const res = await fetch("/api/jobs", { method: "POST" });
    if (res.ok) {
      fetchJobs();
    }
    setLoading(false);
  };

  const clearJobs = async () => {
    try {
      const res = await fetch("/api/jobs/clear", {
        method: "DELETE",
      });

      if (res.ok) {
        alert("All jobs cleared successfully.");
        setJobs([]);
      } else {
        const errorData = await res.json();
        alert(`Failed to clear jobs: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during clear jobs fetch:", error);
      alert("An unexpected error occurred while clearing jobs.");
    }
  };

  useEffect(() => {
    fetchJobs();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("job-channel");
    channel.bind("job-resolved", (data: { id: string; result: string }) => {
      setJobs((prevJobs) =>
        [...prevJobs]
          .map((job) =>
            job.id === data.id
              ? { ...job, status: "resolved", result: data.result }
              : job
          )
          .sort((a, b) => a.id.localeCompare(b.id))
      );
    });

    return () => {
      pusher.unsubscribe("job-channel");
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-4 bg-[#94a3b8]">
      <Image src="/assets/job.png" alt="Job Image" width={300} height={300} />
      <h1 className="text-4xl font-extrabold text-center mb-4">Job Service</h1>
      <div className="flex space-x-4">
        <Button
          handleClick={createJob}
          loading={loading}
          text="Create Job"
          type="success"
        />
        <Button
          handleClick={clearJobs}
          loading={loading}
          text="Clear Jobs"
          type="danger"
        />
      </div>
      <h2 className="italic text-6xl text-bold text-center my-8 border border-primary border-[#d4d4d4] border-2 border-black rounded p-4 shadow-2xl">
        Job List View
      </h2>
      <JobList jobs={jobs} />
    </div>
  );
};

export default Home;
