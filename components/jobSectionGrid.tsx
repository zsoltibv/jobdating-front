import React, { useEffect, useState } from "react";
import Link from "next/link";
import { timeSince } from "../helpers/TimeHelper";
import { getLatestJobs } from "../lib/api";

const JobSectionGrid = ({ jobCategories, jobLocations, jobWorkTypes }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const latestJobs = await getLatestJobs(9);
      setJobs(latestJobs);
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [currentPage, jobs]);

  const filterJobs = () => {
    let filtered = jobs.filter((job) =>
      job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    filtered = filtered.slice(indexOfFirstJob, indexOfLastJob);

    setFilteredJobs(filtered);
  };

  const pageCount = Math.ceil(
    jobs.filter((job) =>
      job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / jobsPerPage
  );

  return (
    <div className="jobs-container container w-full mx-auto px-4 font-open-sans pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-open-sans">
        {filteredJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div
              key={job.id}
              className="bg-white border px-8 rounded-md hover:shadow-lg hover:bg-gray-100 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold md:text-xl text-lg py-6 text-gray-800">
                  {job.jobFields.name}
                </h2>
                <p className="text-cyan-400 font-semibold text-sm md:text-base md:flex hidden">
                  VEZI JOB
                </p>
              </div>
              <hr />
              <div className="job-info pt-1.5 pb-4 flex justify-between text-gray-600 font-regular text-sm">
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobSectionGrid;
