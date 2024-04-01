import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import {
  getAllJobCategories,
  getAllJobLocations,
  getAllJobWorkTypes,
  getAllJobs,
  getMenuItemsByMenuName,
} from "../lib/api";
import HeroSlider from "../components/heroSlider";
import JobSection from "../components/jobSections";
import FooterSection from "../components/footerSection";

const Index = ({
  menuItems,
  jobs,
  jobCategories,
  jobLocations,
  jobWorkTypes,
}) => {
  const imageUrls = [
    "http://api.jobdating.ro/wp-content/uploads/2024/03/1-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/2-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/3.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/4-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/5-scaled.jpg",
    "http://api.jobdating.ro/wp-content/uploads/2024/03/6.jpg",
  ];

  return (
    <div style={{ minHeight: "100vh" }} className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <HeroSlider images={imageUrls} />
      <JobSection
        jobs={jobs}
        jobCategories={jobCategories}
        jobLocations={jobLocations}
        jobWorkTypes={jobWorkTypes}
      />
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
