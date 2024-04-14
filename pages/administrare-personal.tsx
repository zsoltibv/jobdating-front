import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";
import ListWithIcons from "../components/listWithIcons";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";

const RecrutareSiSelectiePersonal = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Administrare personal",
    description:
      "Servicii de administrare personal prin echipa noastra de specialisti, în concordantă cu nevoile dvs, într-un termen cat mai scurt si la preț accesibil.",
  };

  return (
    <div>
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
        <div className="font-medium font-inter py-16">
          <h1 className="md:text-3xl text-2xl my-6 font-open-sans">
            De ce să lucrati cu noi pentru administrarea pesonalului?
          </h1>
          <ListWithIcons
            items={[
              {
                description: "Reduceti costurile cu personalul HR",
              },
              {
                description:
                  "Economisiti sumele investite in cursurile de calificare și specializare a personalului HR",
              },
              {
                description:
                  "Se evit erori privind aplicarea prevederilor legale,  avand la dispozitie o echipă cu experiență vastă în domeniu",
              },
            ]}
          />
          <h1 className="md:text-3xl text-2xl my-6 font-open-sans">
            Activitatile pe care vi le punem la dispoziție:
          </h1>
          <div className="space-y-8">
            <ListWithIcons
              items={[
                {
                  description:
                    "Redactarea și adaptarea contractelor individuale de muncă în funcție de solicitările clienților.",
                },
                {
                  description:
                    "Întocmire/actualizare dosare personal: contracte individuale de muncă, fişe de post, acte adiţionale privind  modificarea ontractului  dividual de muncă, intocmirea deciziilor de încetare / suspendare a contractului individual de muncă",
                },
                {
                  description:
                    "Intocmirea adeverinţelor solicitate de salariaţi; intocmirea programarii concediilor de odihna si evidenta  acestora; intocmirea egulamentului de Ordine Interioară; etc.",
                },
                {
                  description:
                    "Realizarea diverselor situatii, rapoarte privind structura personalului",
                },
                {
                  description:
                    "Oferirea de consultanță în domeniul legislației muncii.",
                },
                {
                  description:
                    "Suport în cazul controalelor efectuate de organele abilitate ale statului.",
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
