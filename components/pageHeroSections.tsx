import Link from "next/link";

export default function PageHeroSection({ image, page }) {
  return (
    <div className="hero-section md:max-h-[300px] max-h-[200px] flex justify-center items-center overflow-hidden relative">
      <div className="bg-zinc-800 bg-opacity-65 backdrop-blur-sm">
        <img src={image} alt="Hero Background" />
      </div>
      <div className="absolute inset-0 bg-zinc-700 bg-opacity-65 z-0"></div>
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className="container w-full mx-auto text-left px-4 pt-6">
          <div className="bg-cyan-500 bg-opacity-80 md:p-8 p-4 rounded">
            <h1 className="text-white font-open-sans md:text-5xl text-2xl font-regular md:mb-4 mb-2">
              {page.title}
            </h1>
            <p className="text-white font-medium font-inter md:text-xl text-base md:flex hidden">
              {page.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
