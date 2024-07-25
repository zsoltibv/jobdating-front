import Link from "next/link";

export default function JobHeroSection({ image, job }) {
  // Destructure job properties with default empty arrays
  const jobLocations = job.locations?.nodes || [];
  const jobWorkTypes = job.workTypes?.nodes || [];
  const jobCategories = job.jobCategories?.nodes || [];

  const jobLocationName = jobLocations
    .map((location) => location.name)
    .join(", ");
  const jobWorkTypesString = jobWorkTypes
    .map((workType) => workType.name)
    .join(", ");
  const jobCategoriesElements = jobCategories.map((category, index) => (
    <span
      key={index}
      className="bg-cyan-400 text-white text-sm font-semibold mr-2 md:px-10 px-6 md:py-1.5 py-1 rounded-2xl"
    >
      {category.name}
    </span>
  ));

  return (
    <div className="hero-section max-h-[450px] flex justify-center items-center overflow-hidden relative">
      <div>
        <img src={image || "/default-image.png"} alt="Job Header" />
      </div>
      <div className="absolute inset-0 bg-zinc-700 bg-opacity-80 z-0"></div>
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className="container w-full mx-auto text-left px-4 pt-6">
          <h1 className="text-white font-open-sans md:text-5xl text-3xl font-regular md:mb-4 mb-2">
            {job.jobFields?.name || "N/A"}
          </h1>
          <p className="text-gray-300 font-medium font-inter md:text-xl text-base">
            {jobLocationName || ""}{" "}
            {jobWorkTypesString ? ` (${jobWorkTypesString})` : ""}
          </p>
          <div className="job-categories md:mt-8 mt-4">
            {jobCategoriesElements.length > 0
              ? jobCategoriesElements
              : "No categories available"}
          </div>
        </div>
      </div>
    </div>
  );
}
