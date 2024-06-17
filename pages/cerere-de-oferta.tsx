import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useRef, useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";
import ReCAPTCHA from "react-google-recaptcha";
import { fi } from "date-fns/locale";
import CerereDeOfertaFormular from "../components/cerereDeOfertaFormular";

const CerereDeOferta = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Găsește următorul tău angajat",
    description:
      "Completează formularul de mai jos și unul dintre colegii noștri te va contacta pentru a discuta despre nevoile tale de personal.",
  };

  return (
    <div className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <CerereDeOfertaFormular></CerereDeOfertaFormular>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default CerereDeOferta;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
