import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";
import StepIndicator from "../components/stepIndicator";
import ListWithIcons from "../components/listWithIcons";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";
import MetaHead from "../components/MetaHead";

const RecrutareSiSelectiePersonal = ({ menuItems, jobCategories }) => {
  const image = "/img/main-page-bg.webp";
  const page = {
    title: "Recrutare și selecție personal",
    description:
      "Servicii de recrutare personal prin echipa noastra de specialisti, în concordantă cu nevoile dvs, într-un termen cat mai scurt si la preț accesibil.",
  };

  return (
    <>
      <MetaHead
        title="Recrutare și selecție personal | Job Dating"
        description="Recrutare rapida, in toate domeniile de activitate, candidati cu experienta si motivati."
        keywords="locuri de muncă, recrutare, selecție personal, joburi, job dating"
      />
      <div>
        <MenuHeader menuItems={menuItems} />
        <PageHeroSection image={image} page={page}></PageHeroSection>
        <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
          <div className="flex flex-col items-center md:flex-row gap-6 justify-between py-16">
            <div className="flex flex-col font-medium font-inter text-gray-500 space-y-4 md:w-1/2">
              <p>
                Scopul nostru este să vă găsim candidați motivați, care nu au
                doar competențele necesare, ci ale căror personalitate se
                încadrează perfect în colectivul dumneavoastră, candidați care
                vor aduce plus valoare companiei. Oferim, de asemenea, garanție
                pentru serviciul nostru.
              </p>
              <h2 className="font-medium">
                Ce fel de avantaje asigură recrutarea de personal?
              </h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Posibilități multiple de selecție</li>
                <li>Baza de date complexă și variată</li>
                <li>Economie de timp și costuri aferente acestui proces</li>
              </ul>
              <p>
                Vă propunem candidați de la top management până la entry level,
                de la producție până la domeniul medical, oferim soluții pentru
                proiecte atât în țară, cât și în străinătate, care acoperă
                domenii în construcții, industria auto, industria hotelieră,
                agricultură, comerț, etc.
              </p>
            </div>
            <div className="image-container md:w-1/2">
              <img
                src="/img/recrutare-personal.png"
                alt="Recruitment team"
                className="md:min-h-96 rounded-md"
              />
            </div>
          </div>

          <StepIndicator
            steps={[
              "Anunț de angajare",
              "Selecția aplicațiilor primite",
              "Consultare baza de date",
              "Preselecție conform cerințelor clientului",
              "Pregătirea candidaților pentru interviul de angajare",
              "Prezentarea candidaților către Client",
            ]}
          />
          <hr className="md:mt-40 mt-12" />
          <h1 className="md:text-3xl text-2xl my-6 font-open-sans text-cyan-900">
            Metode folosite:
          </h1>
          <div className="space-y-8">
            <ListWithIcons
              items={[
                {
                  title: "Consultare baza de date:",
                  description:
                    "Baza noastră de date conține datele actualizate a aproape 10.000 de candidați la nivel național și acces la bazele de date ale principalelor portaluri de locuri de muncă.",
                },
                {
                  title: "Online:",
                  description:
                    "Edităm și plasăm anunțurile de angajare pe propria noastră pagină de web și pe principalele portaluri de locuri de muncă, folosim campanii în rețelele sociale și comunicăm în mod regulat cu potențialii noștri candidați și grupuri de social media.",
                },
                {
                  title: "Offline:",
                  description:
                    "Participăm la târguri/burse de locuri de muncă, evenimente de HR.",
                },
                {
                  title: "Căutare directă:",
                  description:
                    "Căutarea de potențiali candidați în domeniile specifice.",
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
