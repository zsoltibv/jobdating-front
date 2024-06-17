import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import {
  getAllJobCategories,
  getAllJobLocations,
  getAllJobWorkTypes,
  getAllJobs,
  getMenuItemsByMenuName,
} from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import JobSection from "../components/jobSections";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";

const image = "/img/job-header.webp";
const page = {
  title: "Locuri de muncă",
  description: "Alege din job-urile noastre și aplică ușor.",
};

const Jobs = ({
  menuItems,
  jobs,
  jobCategories,
  jobLocations,
  jobWorkTypes,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.jobFields.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: "fit-content" }} className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <JobSection
        jobs={filteredJobs}
        jobCategories={jobCategories}
        jobLocations={jobLocations}
        jobWorkTypes={jobWorkTypes}
      />
      <div className="container py-6">
        <CallToActionBanner
          title="Nu găsești ceea ce cauți?"
          subtitle="Trimite solicitarea, iar colegii noștri vă vor contacta în cel mai scurt timp!"
          buttonText="Înregistrare"
          onButtonClick={() => router.push("/inregistrare")}
        />
      </div>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default Jobs;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const allJobs = await getAllJobs();
  const allJobCategories = await getAllJobCategories();
  const allJobLocations = await getAllJobLocations();
  const allJobWorkTypes = await getAllJobWorkTypes();

  return {
    props: {
      menuItems: allMenuItems,
      jobs: allJobs,
      jobCategories: allJobCategories,
      jobLocations: allJobLocations,
      jobWorkTypes: allJobWorkTypes,
    },
    revalidate: 10,
  };
};
