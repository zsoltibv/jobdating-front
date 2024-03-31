import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getAllJobs, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import HeroSlider from "../components/heroSlider";

const Index = ({ menuItems, jobs }) => {
  const imageUrls = [
    "http://api.jobdating.ro/wp-content/uploads/2024/03/1-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/2-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/3.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/4-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/5-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/6.jpg",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }} className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <HeroSlider images={imageUrls} />
      <div className="jobs-container max-w-[1640px] w-full mx-auto px-4">
        <div className="mb-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nume job sau cuvinte cheie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Categorie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Locatie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded"
          />
          <button className="bg-cyan-400 text-white font-inter py-2 px-4 rounded hover:bg-opacity-90 transition duration-300 ease-in-out w-full">
            <p className="text-base font-regular font-open-sans">Căutare</p>
          </button>
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
    </div>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const allJobs = await getAllJobs();

  return {
    props: { menuItems: allMenuItems, jobs: allJobs },
    revalidate: 10,
  };
};
