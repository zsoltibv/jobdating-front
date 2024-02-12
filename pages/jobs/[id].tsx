import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import MenuHeader from "../../components/menuHeader";
import { getAllJobs, getJobById, getMenuItemsByMenuName } from "../../lib/api";

const Job = ({ menuItems, job }) => {
  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <div className="jobs-container p-8 mx-auto">
        <h1 className="text-3xl mb-6">{job.jobFields.name}</h1>
        <div className="flex">
          <p>{job.jobFields.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Job;

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of all job IDs
  const allJobs = await getAllJobs();

  // Generate paths with the job IDs
  const paths = allJobs.map((job) => ({
    params: { id: job.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const job = await getJobById(params.id);

  return {
    props: { menuItems: allMenuItems, job },
    revalidate: 10,
  };
};
