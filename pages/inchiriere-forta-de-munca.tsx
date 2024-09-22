import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";
import ListWithIcons from "../components/listWithIcons";
import StepIndicator from "../components/stepIndicator";
import CallToActionBanner from "../components/callToActionBanner";
import router from "next/router";
import MetaHead from "../components/MetaHead";

const InchiriereFortaDeMunca = ({ menuItems, jobCategories }) => {
  const image = "/img/main-page-bg.webp";
  const page = {
    title: "Închiriere forţă de muncă - muncă temporară",
    description:
      "Serviciile de munca temporara asigura rapiditatea punerii la dispozitie de personal necesar, pentru a avea „omul potrivit la momentul potrivit“",
  };

  return (
    <>
      <MetaHead
        title="Muncă temporară | Job Dating"
        description="Leasing-ul de personal este o solutie flexibila si eficienta pentru a acoperi nevoia de personal in perioade de varf ale activitatii sau pentru inlocuirea temporara a unor salariati."
        keywords="locuri de muncă, recrutare, selecție personal, joburi, job dating"
      />
      <div>
        <MenuHeader menuItems={menuItems} />
        <PageHeroSection image={image} page={page}></PageHeroSection>
        <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
          <div className="flex flex-col font-medium font-inter text-gray-500 py-16 space-y-4">
            <p>
              <strong>Munca temporară</strong> este o solutie flexibilă și
              eficientă pentru a acoperi nevoia de personal în perioade de vârf
              ale activității sau pentru înlocuirea temporară a unor angajați.
              Numit oficial muncă temporară, acesta reprezintă activitatea prin
              care o companie de resurse umane pune la dispoziția unei firme
              personalul de care aceasta din urmă are nevoie pentru o anumită
              perioadă. Personalul care funcționează pe acest principiu nu este
              angajat direct al companiei pentru care prestează servicii, ci al
              Agentului de muncă temporară.
            </p>
            <h2 className="font-medium">
              Ce reprezintă un Agent de muncă temporară?
            </h2>
            <p>
              Agentul de muncă temporară este o companie, autorizată de
              Ministerul Muncii, care pune la dispoziție Utilizatorului personal
              calificat sau necalificat pe care îl angajează și salarizează în
              acest scop.
            </p>
            <h2 className="font-medium">
              Care este modalitatea de derulare a relațiilor de muncă?
            </h2>
            <p>
              Raportul juridic de muncă temporară este un raport "triunghiular"
              implicând, cu drepturi și obligații, trei părți:{" "}
              <strong>Salariatul Temporar</strong>,{" "}
              <strong>Utilizatorul</strong> și{" "}
              <strong>Agentul de muncă temporară</strong>. Avem de-a face cu
              alăturarea a două contracte: contractul individual de muncă dintre
              agentul de muncă temporară și salariatul temporar și contractul de
              punere la dispoziție dintre agentul de muncă temporară și
              utilizator.
            </p>
          </div>
          <hr />
          <h1 className="md:text-3xl text-2xl my-6 font-open-sans text-cyan-900">
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
              <img
                src="/img/munca-temporara.png"
                alt=""
                className="min-h-96 rounded-md"
              />
            </div>
          </div>
          <h1 className="md:text-3xl text-2xl my-6 font-open-sans text-cyan-900">
            Procesul nostru:
          </h1>
          <p className="md:mb-24 mb-0">
            Serviciile de munca temporara asigura rapiditatea punerii la
            dispoziție de personal necesar, pentru a avea „omul potrivit la
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
          <h1 className="md:text-3xl text-2xl my-6 font-open-sans text-cyan-900">
            Avantajele închirierii forței de muncă:
          </h1>
          <div className="space-y-8">
            <ListWithIcons
              items={[
                {
                  description: "Asigură imediat necesarul de personal",
                },
                {
                  description:
                    "Forța de muncă este deja calificată și pregătită pentru postul solicitat",
                },
                {
                  description:
                    "Economie de timp, volum de muncă și documentație în ceea ce privește administrarea personalului",
                },
                {
                  description:
                    "Oferă soluții rapide, flexibile și eficiente în perioadele de vârf, când au loc creșteri punctuale ale activității, în cazuri unor evenimente sau în perioadele sezoniere",
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
              subtitle="Noi ne ocupăm de toate formalitățile și de gestionarea angajaților. Aceștia vor desfășura activitatea solicitată de dumneavoastră pe întreaga durată a contractului."
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

export default InchiriereFortaDeMunca;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
