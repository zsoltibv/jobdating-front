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
import MetaHead from "../components/MetaHead";

const RecrutareSiSelectiePersonal = ({ menuItems, jobCategories }) => {
  const image = "/img/main-page-bg.webp";
  const page = {
    title: "Administrare personal",
    description:
      "Servicii de administrare personal prin echipa noastra de specialisti, în concordantă cu nevoile dvs, într-un termen cat mai scurt si la preț accesibil.",
  };

  return (
    <>
      <MetaHead
        title="Administrare personal | Job Dating"
        description="Intocmire dosare personal, gestionare angajati REVISAL, situatii, rapoarte, consultanta in domeniul legislatiei muncii."
        keywords="locuri de muncă, recrutare, selecție personal, joburi, job dating"
      />
      <div>
        <MenuHeader menuItems={menuItems} />
        <PageHeroSection image={image} page={page}></PageHeroSection>
        <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
          <div className="font-medium font-inter py-16">
            <h1 className="md:text-3xl text-2xl my-6 font-open-sans text-cyan-900">
              De ce să lucrati cu noi pentru administrarea pesonalului?
            </h1>
            <div className="block md:flex gap-6 items-center justify-between">
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
              <div className="image-container">
                <img
                  src="/img/admin-personal.png"
                  alt=""
                  className="md:min-h-96 rounded-md"
                />
              </div>
            </div>
            <h1 className="md:text-3xl text-2xl my-6 font-open-sans text-cyan-900">
              Serviciile pe care vi le punem la dispoziție:
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
                      "Întocmirea adeverinţelor solicitate de salariaţi; întocmirea programării concediilor de odihnă si evidență  acestora; întocmirea regulamentului de Ordine Interioară; etc.",
                  },
                  {
                    description:
                      "Realizarea diverselor situații, rapoarte privind structura personalului",
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
    </>
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
