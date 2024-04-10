import React, { useEffect, useState } from "react";
import Link from "next/link";
import { timeSince } from "../helpers/TimeHelper";
import { GetStaticProps } from "next";
import { getJobsByCategory } from "../lib/api";

const SimilarJobsSection = ({ jobCategories }) => {
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      const jobs = await getJobsByCategory(jobCategories);
      setSimilarJobs(jobs);
    };

    fetchSimilarJobs();
  }, [jobCategories]);

  return (
    <div className="container px-4 mx-auto mb-12">
      <h1 className="md:text-3xl text-2xl my-6">Joburi Similare:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {similarJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div key={job.id} className="bg-white border px-8 rounded-md">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold md:text-2xl text-xl py-6 text-gray-800">
                  {job.jobFields.name}
                </h2>
                <p className="text-cyan-400 font-semibold text-sm md:text-base">
                  VEZI JOB
                </p>
              </div>
              <hr />
              <div className="job-info pt-1.5 pb-4 flex justify-between text-gray-600 font-regular">
                <div className="left-job-info">
                  <div className="mt-2">
                    {job.jobCategories.nodes
                      .map((category) => category.name)
                      .join(", ")}
                  </div>
                </div>
                <div className="right-job-info flex gap-6">
                  <div className="mt-2">
                    {job.locations.nodes.map((obj) => obj.name).join(", ")}
                  </div>
                  <div className="mt-2 md:block hidden">
                    {job.workTypes.nodes.map((obj) => obj.name).join(", ")}
                  </div>
                  <div className="mt-2 md:block hidden">
                    {timeSince(job.date)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobsSection;
