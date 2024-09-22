import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getJobsByCategory,
  getAllJobCategories,
  getMenuItemsByMenuName,
} from "../../../lib/api";
import MenuHeader from "../../../components/menuHeader";
import FooterSection from "../../../components/footerSection";
import { GetStaticPaths, GetStaticProps } from "next";
import JobSectionGridCategories from "../../../components/jobSectionGridCategories";
import PageHeroSection from "../../../components/pageHeroSections";

const JobsByCategory = ({ initialJobs, jobCategories, menuItems }) => {
  const router = useRouter();
  const { categorySlug } = router.query;
  const [jobs, setJobs] = useState(initialJobs);
  const image = "/img/main-page-bg.webp";
  const page = {
    title: categorySlug,
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const newJobs = await getJobsByCategory([categorySlug]);
      setJobs(newJobs);
    };

    if (categorySlug) {
      fetchJobs();
    }
  }, [categorySlug]);

  return (
    <div className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="container mx-auto px-4 py-16 min-h-[40vh]">
        <JobSectionGridCategories jobs={jobs} />
      </div>
      <FooterSection menuItems={menuItems} jobCategories={jobCategories} />
    </div>
  );
};

export default JobsByCategory;

export const getStaticPaths: GetStaticPaths = async () => {
  const allJobCategories = await getAllJobCategories();

  const paths = allJobCategories.map((category) => ({
    params: { categorySlug: category.name },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categorySlug } = params;

  if (!categorySlug) {
    return { notFound: true };
  }

  const jobs = await getJobsByCategory([categorySlug]);
  const jobCategories = await getAllJobCategories();
  const menuItems = await getMenuItemsByMenuName();

  return {
    props: {
      jobs,
      jobCategories,
      menuItems,
    },
    revalidate: 10,
  };
};
