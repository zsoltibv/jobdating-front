import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";
import StepIndicator from "../components/stepIndicator";
import ListWithIcons from "../components/listWithIcons";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";

const RecrutareSiSelectiePersonal = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Recrutare si selectie personal",
    description:
      "Servicii de recrutare personal prin echipa noastra de specialisti, în concordantă cu nevoile dvs, într-un termen cat mai scurt si la preț accesibil.",
  };

  return (
    <div>
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
        <div className="flex font-medium font-inter text-gray-500 py-16">
          Scopul nostru este să vă găsim candidat motivat, care nu are doar
          competențele necesare, ci a cărui personalitate se încadrează perfect
          în colectivul dumneavoastră. Candidati care vor aduce valoare adaugata
          companiei . Oferim, de asemenea, garanție pentru serviciul nostru. Ce
          fel de avantaje asigura recrutarea de personal? Posibilități multiple
          de selecție Baza de date complexă și variată Economie de timp și
          costuri aferente acestui proces Va propunem candidati de la top
          management pana la entry level, de la productie pana la domeniul
          medical, oferim solutii pentru proiecte care acopera domenii in
          construcții , industria auto, industria hotelieră, agricultură,
          comerț, etc., atat in tara , cat si strainatate.
        </div>
        <StepIndicator
          steps={[
            "Anunt de angajare",
            "Selectia aplicatorilor primite",
            "Consultare baza de date",
            "Pre selectie conform cerintelor clientului",
            "Pregatirea candidatilor pentru interviul de angajare",
            "Prezentarea candidatilor catre Client",
          ]}
        />
        <hr className="md:mt-40" />
        <h1 className="md:text-3xl text-2xl my-6 font-open-sans">
          Metode folosite:
        </h1>
        <div className="space-y-8">
          <ListWithIcons
            items={[
              {
                title: "Consultare baza de date:",
                description:
                  "Baza noastră de date conține datele actualizate a aproape 10.000 de candidați la nivel național și precum acces și la bazele de date ale principalelor portaluri de locuri de muncă.",
              },
              {
                title: "Online:",
                description:
                  "Edităm și plasăm anunțurile de angajare pe propriul nostru pagina de web și pe principalele portaluri de locuri de muncă, easemena folosim campanii în rețelele sociale și comunicăm în mod regulat cu potențialii noștri candidați și grupuri de social media",
              },
              {
                title: "Offline:",
                description:
                  "Participăm la târguri / burse de locuri de muncă, evenimente de HR.",
              },
              {
                title: "Căutare directă:",
                description:
                  "Căutarea de potențiali candidați în domeniile specifice",
              },
            ]}
          />
          <CallToActionBanner
            title="Solicită ofertă acum!"
            subtitle="Trimite solicitarea, iar colegii noștri vă vor contacta în cel mai scurt timp!"
            buttonText="Solicită"
            onButtonClick={() => router.push("/cerere-de-oferta")}
          />
        </div>
      </div>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default RecrutareSiSelectiePersonal;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
