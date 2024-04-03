import Link from "next/link";

export default function JobHeroSection({ image, job }) {
  const jobLocationName = job.locations.nodes
    .map((location) => location.name)
    .join(", ");

  const jobWorkTypes = job.workTypes.nodes
    .map((workType) => workType.name)
    .join(", ");

  const jobCategories = job.jobCategories.nodes.map((category, index) => (
    <span
      key={index}
      className="bg-cyan-400 text-white text-sm font-semibold mr-2 px-10 py-1.5 rounded-2xl"
    >
      {category.name}
    </span>
  ));

  return (
    <div className="hero-section max-h-[450px] flex justify-center items-center overflow-hidden relative">
      <div>
        <img src={image} />
      </div>
      <div className="absolute inset-0 bg-zinc-700 bg-opacity-80 z-0"></div>
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className="max-w-[1640px] w-full mx-auto text-left px-4">
          <h1 className="text-white font-open-sans text-5xl font-regular mb-4">
            {job.jobFields.name}
          </h1>
          <p className="text-gray-300 font-medium font-inter text-xl">
            {jobLocationName} ({jobWorkTypes})
          </p>
          <div className="job-categories mt-8">{jobCategories}</div>
        </div>
      </div>
    </div>
  );
}
