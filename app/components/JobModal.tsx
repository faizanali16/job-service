// app/components/JobModal.tsx
import Image from "next/image";
import React, { useState } from "react";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    status: string;
    result: string | null;
  } | null;
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, job }) => {
  const [imageLoading, setImageLoading] = useState(true);

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold mb-4">Job ID: {job.id}</h3>

        <p className="text-gray-700 mb-4">
          Status:{" "}
          <span
            className={`font-semibold ${
              job.status === "resolved" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {job.status}
          </span>
        </p>

        {job.status === "resolved" && job.result ? (
          <div className="w-full h-auto relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="loader">Loading...</div>
              </div>
            )}
            <Image
              src={job.result}
              alt="Job Result"
              width={600}
              height={400}
              className="w-full h-auto rounded"
              onLoadingComplete={() => setImageLoading(false)}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Pending...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobModal;
