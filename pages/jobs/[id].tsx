import { GetStaticProps } from "next";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import MenuHeader from "../../components/menuHeader";
import { getMenuItemsByMenuName } from "../../lib/api";

const Job = ({ menuItems, job }) => {
  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <div className="jobs-container p-8 mx-auto">
        <h1 className="text-3xl mb-6">Job Listings</h1>
        <div className="flex">
          <h1>{job.title}</h1>
          <p>{job.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Job;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();

  return {
    props: { menuItems: allMenuItems },
    revalidate: 10,
  };
};
