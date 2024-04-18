import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";

const DespreNoi = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Despre Noi",
    description: "Afla mai multe despre noi",
  };

  return (
    <div>
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div
        className="despre-noi-container container w-full mx-auto px-4 pb-6"
        style={{ minHeight: "70vh" }}
      >
        <div className="flex font-medium font-inter text-gray-500 py-16">
          Obiectivul nostru principal este de a aduce plus valoare în companiile
          clienților noștri și în același timp de a încadra candidații aflați în
          căutarea unui loc de muncă, pe posturi ce li se potrivesc cel mai
          bine. Prin echipa noastra de specialisiti cu experienta de peste 20 de
          ani pe piata fortei de munca, oferim servicii de cea mai înaltă
          calitate și o varietate de soluții care acoperă întreg ciclul de
          management a resurselor umane, precum leasing personal (muncă
          temporară), recrutare și selecție forță de muncă, administrare
          personal și consultanță in domeniul legislatiei muncii. Dispunem de o
          baza de date diversificata la nivel national, asigurand necesarul de
          personal adaptat nevoilor dvs. intr-un timp cat mai scurt. Oferim, de
          asemenea, garantie pentru serviciul nostru. Totodata ne adresăm
          persoanelor aflate în căutarea unui loc de munca, oferind posturi atât
          în tara, cât și în străinătate. în următoarele sectoare de activitate
          : construcții civile și industriale , industria auto, industria
          hotelieră, domeniul medical, logistica, gradinarit-peisagistica,
          comerț .
        </div>
      </div>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default DespreNoi;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
