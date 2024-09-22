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
import JobSection from "../components/jobSections";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";
import MetaHead from "../components/MetaHead";

const image = "/img/main-page-bg.webp";
const page = {
  title: "Date your job !",
  description: "Alege din job-urile noastre și aplică rapid.",
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
    <>
      <MetaHead
        title="Locuri de muncă | Job Dating"
        description="Află diverse joburi si aplica rapid  pentru a întâlni noul loc de muncă."
        keywords="locuri de muncă, recrutare, selecție personal, joburi, job dating"
      />
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
            subtitle="Trimite-ne solicitarea ta, iar colegii noștri te vor contacta în cel mai scurt timp."
            buttonText="Înregistrare"
            onButtonClick={() => router.push("/inregistrare")}
          />
        </div>
        <FooterSection
          menuItems={menuItems}
          jobCategories={jobCategories}
        ></FooterSection>
      </div>
    </>
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
