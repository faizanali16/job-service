# Calo Job Service Application

This project is a job management service built with Next.js, Tailwind CSS, Redis, Bull, and Pusher. The service allows users to create jobs, check their status, and view job results in real-time. Jobs are processed to fetch random Unsplash images, with variable delays to simulate asynchronous processing.

This is a brief description of the project.

![Project Demo](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExemZqZXJsdjE0cmx1czh1M3l1Z2VmcjZkZWVlcHUyNmd3MmwzcG1pcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AbakdJ0GgUYTYeNwqN/giphy.gif)

## Features

- **Create Job**: Submit a job that fetches a random Unsplash image.
- **View Job List**: Real-time view of jobs, showing status and results when available.
- **Job Status and Result Modal**: Click on a job to view its detailed status and result in a modal.
- **Clear Jobs**: Clear all jobs from the queue and database.

## Technologies Used

- **Next.js**: Frontend and API endpoints.
- **Tailwind CSS**: UI styling.
- **Bull**: Background job queue management.
- **Redis**: Persistent data storage for job states.
- **Pusher**: Real-time notifications of job status updates.

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure Node.js is installed.
2. **Redis**: Install and run Redis locally or via Docker.

   ```bash
   docker run -d --name redis -p 6379:6379 redis
   ```

# Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/faizanali16/job-service.git
cd job-service
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

- Create a **.env.local** file in the root directory:

```bash
PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=your-pusher-cluster
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

### Step 5: Run the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

# Usage

- Create a Job: Click "Create Job" to submit a new job.
- View Job List: Jobs display in real-time; resolved jobs show an image.
- Clear Jobs: Click "Clear Jobs" to delete all jobs.

# Time Report

This section details the time spent on each phase, from planning to testing.

| Section                       | Time Spent | Details                                                                                                                                                                                      |
| ----------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Initial Setup**          | 1 hour     | Set up project with Next.js, Tailwind CSS, Redis, and Pusher configuration.                                                                                                                  |
| **2. Backend Development**    | 3 hours    | Created API endpoints for job creation, retrieval, and deletion. Configured Bull queue and Redis persistence. Implemented job processing with Unsplash integration and Pusher notifications. |
| **3. Frontend Development**   | 3 hours    | Built UI for job list, job creation, and job clearing using Next.js and Tailwind. Integrated real-time updates with Pusher.                                                                  |
| **4. Modal & Image Handling** | 2 hours    | Implemented job details modal with loading indicators for image display. Ensured responsive layout and handled image load delays.                                                            |
| **5. Error Handling**         | 1 hour     | Added error handling for network issues and retry logic in job processing. Configured Bull for concurrency and retry attempts.                                                               |
| **6. Testing & Debugging**    | 2 hours    | Tested all endpoints, job flow, and modal display. Debugged Redis job clearing and ensured reliability under various scenarios.                                                              |
| **7. Documentation**          | 1 hour     | Prepared README with setup, usage, and time report.                                                                                                                                          |

### Total Time: 13 hours
