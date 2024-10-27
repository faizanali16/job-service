// app/components/JobList.tsx
import Image from "next/image";
import React, { useState } from "react";
import JobModal from "./JobModal";

interface Job {
  id: string;
  status: string;
  result: string | null;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = async (jobId: string) => {
    const res = await fetch(`/api/jobs/${jobId}`);
    if (res.ok) {
      const jobData = await res.json();
      setSelectedJob(jobData);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg mx-auto place-items-center">
        {jobs.map((job) => (
          <li
            key={job.id}
            onClick={() => handleCardClick(job.id)}
            className="cursor-pointer w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            {job.result && (
              <Image
                className="h-[300px] w-full object-cover rounded-t-lg"
                src={job.result}
                alt="Job Result"
                width={300}
                height={250}
              />
            )}
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Job ID: {job.id}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <strong>Status:</strong> {job.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <JobModal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
    </>
  );
};

export default JobList;
