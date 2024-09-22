import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";
import InregistrareFormular from "../components/inregistrareFormular";
import MetaHead from "../components/MetaHead";

const Inregistrare = ({ menuItems, jobCategories }) => {
  const image = "/img/main-page-bg.webp";
  const page = {
    title: "Înregistrează-te în baza de date",
    description:
      "Înscrie-te în baza de date și echipa noastră te va ajuta să-ți întâlnești locul de muncă potrivit cât mai curând posibil.",
  };

  return (
    <>
      <MetaHead
        title=" Înregistrează-te | Job Dating"
        description="Înscrie-te în baza de date și echipa noastră te va ajuta să-ți întâlnești locul de muncă potrivit cât mai curând posibil."
        keywords="locuri de muncă, recrutare, selecție personal, joburi, job dating"
      />
      <div className="bg-gray-100">
        <MenuHeader menuItems={menuItems} />
        <PageHeroSection image={image} page={page}></PageHeroSection>
        <InregistrareFormular></InregistrareFormular>
        <FooterSection
          menuItems={menuItems}
          jobCategories={jobCategories}
        ></FooterSection>
      </div>
    </>
  );
};

export default Inregistrare;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
