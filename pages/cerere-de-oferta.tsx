import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";
import CerereDeOfertaFormular from "../components/cerereDeOfertaFormular";
import MetaHead from "../components/MetaHead";

const CerereDeOferta = ({ menuItems, jobCategories }) => {
  const image = "/img/main-page-bg.webp";
  const page = {
    title: "Găsește următorul tău angajat",
    description:
      "Completează formularul de mai jos și unul dintre colegii noștri te va contacta pentru a discuta despre nevoile tale de personal.",
  };

  return (
    <>
      <MetaHead
        title="Găsește următorul tău angajat | Job Dating"
        description="Completează formularul de mai jos și unul dintre colegii noștri te va contacta pentru a discuta despre nevoile tale de personal."
        keywords="locuri de muncă, recrutare, selecție personal, joburi, job dating"
      />
      <div className="bg-gray-100">
        <MenuHeader menuItems={menuItems} />
        <PageHeroSection image={image} page={page}></PageHeroSection>
        <CerereDeOfertaFormular></CerereDeOfertaFormular>
        <FooterSection
          menuItems={menuItems}
          jobCategories={jobCategories}
        ></FooterSection>
      </div>
    </>
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
