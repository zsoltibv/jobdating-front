import React, { useEffect, useState } from "react";
import Link from "next/link";
import { timeSince } from "../helpers/TimeHelper";

const JobSection = ({ jobs, jobCategories, jobLocations, jobWorkTypes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Filter directly only for workTypeFilter changes
    filterJobs();
  }, [workTypeFilter, currentPage]);

  const filterJobs = () => {
    let filtered = jobs.filter(
      (job) =>
        job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "" ||
          job.jobCategories.nodes.some(
            (category) => category.name === categoryFilter
          )) &&
        (locationFilter === "" ||
          job.locations.nodes.some(
            (location) => location.name === locationFilter
          )) &&
        (workTypeFilter === "" ||
          job.workTypes.nodes.some(
            (workType) => workType.name === workTypeFilter
          ))
    );

    // Implement pagination within filtered results
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    filtered = filtered.slice(indexOfFirstJob, indexOfLastJob);

    setFilteredJobs(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 to show results from the beginning
    filterJobs();
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const pageCount = Math.ceil(
    jobs.filter(
      (job) =>
        job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "" ||
          job.jobCategories.nodes.some(
            (category) => category.name === categoryFilter
          )) &&
        (locationFilter === "" ||
          job.locations.nodes.some(
            (location) => location.name === locationFilter
          )) &&
        (workTypeFilter === "" ||
          job.workTypes.nodes.some(
            (workType) => workType.name === workTypeFilter
          ))
    ).length / jobsPerPage
  );

  return (
    <div className="jobs-container container w-full mx-auto px-4 font-open-sans pb-8">
      {/* Job Search Grid */}
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Nume job sau cuvinte cheie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded focus:outline-none"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded"
        >
          <option value="">Toate categoriile</option>
          {jobCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded"
        >
          <option value="">Toate locațiile</option>
          {jobLocations.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-cyan-400 hover:bg-cyan-600 text-white font-inter py-2 px-12 rounded hover:bg-opacity-90 transition duration-300 ease-in-out"
        >
          <p className="text-base font-regular font-open-sans">Căutare</p>
        </button>
      </div>
      {/* Job Work Type */}
      <div className="job-work-type pb-6">
        <div className="flex gap-6 text-md font-semibold">
          <p
            onClick={() => setWorkTypeFilter("")}
            className={`cursor-pointer ${
              workTypeFilter === "" ? "text-cyan-400" : "text-gray-400"
            }`}
          >
            Toate joburile
          </p>
          {jobWorkTypes.map((workType) => (
            <p
              key={workType.name}
              onClick={() => setWorkTypeFilter(workType.name)}
              className={`cursor-pointer ${
                workTypeFilter === workType.name
                  ? "text-cyan-400"
                  : "text-gray-400"
              }`}
            >
              {workType.name}
            </p>
          ))}
        </div>
      </div>
      <div className="grid gap-4 font-open-sans">
        {filteredJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div
              key={job.id}
              className="bg-white border px-8 rounded-md hover:shadow-lg hover:bg-gray-100 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold md:text-2xl text-xl py-6 text-gray-800">
                  {job.jobFields.name}
                </h2>
                <p className="text-cyan-400 font-semibold text-sm md:text-base md:flex hidden">
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls flex justify-center space-x-4 mt-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`py-2 px-4 rounded ${
              currentPage === number ? "bg-cyan-400 text-white" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobSection;
