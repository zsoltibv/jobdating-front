import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getJobs, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";

const Jobs = ({ menuItems, jobs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <div className="jobs-container p-8 mx-auto">
        <h1 className="text-3xl mb-6">Job Listings</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-200 p-4">
              <h2 className="text-xl font-bold">{job.jobFields.name}</h2>
              <p>{job.jobFields.description}</p>
              <div className="mt-2">
                <strong>Locations:</strong>{" "}
                {job.locations.nodes.map((obj) => obj.name).join(", ")}
              </div>
              <div className="mt-2">
                <strong>Work Types:</strong>{" "}
                {job.workTypes.nodes.map((obj) => obj.name).join(", ")}
              </div>
              <div className="mt-2">
                <strong>Categories:</strong>{" "}
                {job.categories.nodes
                  .map((category) => category.name)
                  .join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const allJobs = await getJobs();

  return {
    props: { menuItems: allMenuItems, jobs: allJobs },
    revalidate: 10,
  };
};
