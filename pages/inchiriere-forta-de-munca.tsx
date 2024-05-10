import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";
import ListWithIcons from "../components/listWithIcons";
import StepIndicator from "../components/stepIndicator";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";

const InchiriereFortaDeMunca = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Închiriere forţă de muncă - muncă temporară",
    description:
      "Serviciile de munca temporara asigura rapiditatea punerii la dispozitie de personal necesar, pentru a avea „omul potrivit la momentul potrivit“",
  };

  return (
    <div>
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
        <div className="flex font-medium font-inter text-gray-500 py-16">
          Leasingul de personal este o solutie flexibilă și eficientă pentru a
          acoperi nevoia de personal în perioade de vârf ale activității sau
          pentru înlocuirea temporară a unor angajați. Numit oficial muncă
          temporară acesta reprezintă activitatea prin care o companie de
          resurse umane pune la dispoziția unei firme , personalul , de care
          aceasta din urmă are nevoie pentru o anumită perioadă. Personalul care
          funcționează pe acest principiu nu este angajat direct al companiei
          pentru care presteaza servicii, ci al Agentului de munca temporara. Ce
          reprezintă un Agent de munca temporara ? Agentul de munca temporară
          este o companie, autorizată de Ministerul Muncii, care pune la
          dispoziţie Utilizatorului personal calificat sau necalificat pe care
          îl angajeazăşi salarizează în acest scop. Care este modalitatea de
          derulare a relaţiilor de muncă? Raportul juridic de muncă temporară
          este un raport "triunghiular" implicând, cu drepturi şi obligaţii,
          trei părţi: Salariatul Temporar, Utilizatorul şi Agentul de munca
          temporara. Avem de-a face cu alăturarea a două contracte: contractul
          individual de muncă dintre agentul de muncă temporară şi salariatul
          temporar şi contractul de punere la dispoziţie dintre agentul de munca
          temporară şi utilizator.
        </div>
        <hr />
        <h1 className="md:text-3xl text-2xl my-6 font-open-sans">
          Pentru asigurarea necesarului de personal privind:
        </h1>
        <div className="block md:flex gap-6 items-center justify-between">
          <div className="md:w-1/2 w-full">
            <ListWithIcons
              items={[
                {
                  description:
                    "Înlocuirea unor angajaţi aflaţi în absenţă indelungată (concedii maternitate, concedii medicale, etc.)",
                },
                {
                  description:
                    "Edităm și plasăm anunțurile de angajare pe propriul nostru pagina de web și pe principalele portaluri de locuri de muncă, easemena folosim campanii în rețelele sociale și comunicăm în mod regulat cu potențialii noștri candidați și grupuri de social media",
                },
                {
                  description:
                    "Prestarea unor activitati specializate sau ocazionale (promotii, evenimente, targuri si expozitii, translatori, etc.)",
                },
                {
                  description:
                    "Perioade de vârf ale sezonului, cum ar fi perioada dinaintea sărbătorilor",
                },
                {
                  description: "Locuri de munca imediate sau neasteptate",
                },
              ]}
            />
          </div>
          <div className="image-container md:w-1/2 w-full">
            <img src="/img/munca-temporara.png" alt="" className="min-h-96" />
          </div>
        </div>
        <h1 className="md:text-3xl text-2xl my-6 font-open-sans">
          Procesul nostru:
        </h1>
        <p className="md:mb-24 mb-0">
          Serviciile de munca temporara asigura rapiditatea punerii la
          dispozitie de personal necesar, pentru a avea „omul potrivit la
          momentul potrivit“.
        </p>
        <StepIndicator
          steps={[
            "Descriere profil",
            "Grup ţintă",
            "Campanie de recrutare",
            "Filtrare",
            "Interviu",
            "Test",
            "Interviu Client",
            "Angajare",
          ]}
        />
        <hr className="md:mt-36 mt-12" />
        <h1 className="md:text-3xl text-2xl my-6 font-open-sans">
          Avantajele inchirierii fortei de munca:
        </h1>
        <div className="space-y-8">
          <ListWithIcons
            items={[
              {
                description: "Asigură imediat necesarul de personal",
              },
              {
                description:
                  "Forța de muncă este deja calificată și pregatită pentru postul solicitat",
              },
              {
                description:
                  "Economie de timp, volum de muncă și documentație în ceea ce privește administrarea personalului",
              },
              {
                description:
                  "Ofera solutii rapide, flexibile si eficiente in perioadele de varf, cand au loc cresteri punctuale ale activitatii, in cazuri unor evenimente sau in perioadele sezoniere",
              },
              {
                description:
                  "Ajută la menținerea sau creșterea fluxului de activitate și a dezvoltării afacerii",
              },
              {
                description: "Reduce riscul operațional",
              },
            ]}
          />
          <CallToActionBanner
            title="Apelaţi cu încredere la forţă de muncă temporară!"
            subtitle="Noi ne ocupăm de toate formalităţile, de calitatea lor, de angajaţi!
            EI vor desfăşura activitatea solicitată de Dumneavoastră pe intreaga durată a contractului!"
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

export default InchiriereFortaDeMunca;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
