import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState, useEffect } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";

const DespreNoi = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Despre Noi",
    description: "Afla mai multe despre noi",
  };

  const sliderImages = [
    "/img/slider-1.webp",
    "/img/slider-2.webp",
    "/img/slider-3.webp",
    "/img/slider-4.webp",
    "/img/slider-5.webp",
    "/img/slider-6.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div
        className="despre-noi-container container mx-auto px-4 pb-6"
        style={{ minHeight: "70vh" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between py-8">
          <div className="p-8 md:w-1/2 w-full relative z-10">
            <div className="flex flex-col font-inter text-gray-500 leading-loose">
              <p className="font-medium">
                <strong>Obiectivul nostru principal</strong> este de a aduce
                plus valoare în companiile clienților noștri și în același timp
                de a încadra candidații aflați în căutarea unui loc de muncă, pe
                posturi ce li se potrivesc cel mai bine.
              </p>
              <p className="py-2">
                Prin <strong>echipa noastră de specialiști</strong> cu
                experiență de peste 20 de ani pe piața forței de muncă, oferim{" "}
                <strong>servicii de cea mai înaltă calitate</strong> și o
                varietate de soluții care acoperă întreg ciclul de management al
                resurselor umane, precum leasing personal (muncă temporară),
                recrutare și selecție forță de muncă, administrare personal și
                consultanță în domeniul legislației muncii.
              </p>
              <p className="py-2">
                Dispunem de o{" "}
                <strong>bază de date diversificată la nivel național</strong>,
                asigurând necesarul de personal adaptat nevoilor dvs. într-un
                timp cât mai scurt. Oferim, de asemenea,{" "}
                <strong>garanție pentru serviciul nostru</strong>.
              </p>
              <p className="py-2">
                Ne adresăm persoanelor aflate în căutarea unui loc de muncă,
                oferind posturi atât în țară, cât și în străinătate, în
                următoarele sectoare de activitate: construcții civile și
                industriale, industria auto, industria hotelieră, domeniul
                medical, logistică, grădinărit-peisagistică, comerț etc.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 w-full mt-8 md:mt-0">
            <div className="slider-container relative w-full overflow-hidden">
              <div
                className="slider-content flex transition-transform duration-1000"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {sliderImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Slider image ${index + 1}`}
                    className="w-full flex-shrink-0 rounded-lg max-h-[600px] object-cover"
                  />
                ))}
              </div>
            </div>
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

export default DespreNoi;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
