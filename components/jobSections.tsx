import React, { useEffect, useState } from "react";
import Link from "next/link";

const JobSection = ({ jobs, jobCategories, jobLocations, jobWorkTypes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    filterJobs();
  }, [workTypeFilter]); // Depend only on workTypeFilter for direct filtering

  const filterJobs = () => {
    const filtered = jobs.filter(
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
    setFilteredJobs(filtered);
  };

  // Call filterJobs for other filters using a button click instead of direct filtering
  const handleSearch = () => {
    filterJobs();
  };

  return (
    <div className="jobs-container max-w-[1640px] w-full mx-auto px-4 font-open-sans">
      {/* Job Search Grid */}
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Nume job sau cuvinte cheie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded"
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
          className="bg-cyan-400 text-white font-inter py-2 px-4 rounded hover:bg-opacity-90 transition duration-300 ease-in-out w-full"
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
            <div key={job.id} className="bg-white border px-8 rounded-md">
              <h2 className="font-semibold text-3xl py-6 text-gray-800">
                {job.jobFields.name}
              </h2>
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
                  <div className="mt-2">
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

export default JobSection;
