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
import CerereDeOfertaFormular from "../components/cerereDeOfertaFormular";
import JobSectionGrid from "../components/jobSectionGrid";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import InregistrareFormular from "../components/inregistrareFormular";

const Index = ({
  menuItems,
  jobs,
  jobCategories,
  jobLocations,
  jobWorkTypes,
}) => {
  const image = "/img/job-header.webp";
  console.log(menuItems);

  return (
    <div style={{ minHeight: "100vh" }} className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <HeroSection image={image} />
      <ServiceSection></ServiceSection>
      <InfoSection></InfoSection>
      <ServiceImageSection></ServiceImageSection>
      <div className="container flex justify-center">
        <div className="bg-cyan-400 max-w-5xl rounded-lg  md:px-32 md:py-14 p-4">
          <h2 className="text-lg font-bold text-white mb-8">
            <p className="uppercase">Ești în căutarea unui loc de muncă?</p>
            <hr className="md:mb-4 md:mt-3 m-0" />
            <p className="flex">
              Te rugăm să ne trimiți datele tale și echipa noastră te va
              contacta în cel mai scurt timp.
            </p>
          </h2>

          <div className="bg-gray-100 max-w-5xl rounded-lg">
            <InregistrareFormular></InregistrareFormular>
          </div>
        </div>
      </div>
      <div className="container font-inter uppercase cyan-400 font-medium py-12">
        <div className="flex items-center pb-6">
          <div>
            <h2 className="text-lg md:text-md uppercase text-cyan-900 font-bold tracking-wider p-4">
              Ultimele Job-uri
            </h2>
          </div>
          <Link href="/jobs">
            <button className="bg-zinc-300 hover:bg-zinc-200 text-gray-900 font-medium font-inter py-1.5 md:px-6 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-cyan-900 mr-3"
              />
              Vezi toate
            </button>
          </Link>
        </div>
        <JobSectionGrid
          jobCategories={jobCategories}
          jobLocations={jobLocations}
          jobWorkTypes={jobWorkTypes}
        />
      </div>
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
