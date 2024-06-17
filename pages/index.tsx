import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import {
  getAllJobCategories,
  getAllJobLocations,
  getAllJobWorkTypes,
  getAllJobs,
  getMenuItemsByMenuName,
} from "../lib/api";
import JobSection from "../components/jobSections";
import FooterSection from "../components/footerSection";
import HeroSection from "../components/heroSection";
import InfoSection from "../components/infoSection";
import ServiceSection from "../components/serviceSection";
import ServicesSection from "../components/serviceSection";
import ServiceImageSection from "../components/serviceImageSection";

const Index = ({
  menuItems,
  jobs,
  jobCategories,
  jobLocations,
  jobWorkTypes,
}) => {
  const image = "/img/job-header.webp";

  return (
    <div style={{ minHeight: "100vh" }} className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <HeroSection image={image} />
      <ServiceSection></ServiceSection>
      <InfoSection></InfoSection>
      <ServiceImageSection></ServiceImageSection>
      {/* <JobSection
        jobs={jobs}
        jobCategories={jobCategories}
        jobLocations={jobLocations}
        jobWorkTypes={jobWorkTypes}
      /> */}
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default Index;

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
