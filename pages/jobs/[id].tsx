import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import MenuHeader from "../../components/menuHeader";
import ReCAPTCHA from "react-google-recaptcha";
import {
  getAllJobCategories,
  getAllJobs,
  getJobById,
  getMenuItemsByMenuName,
} from "../../lib/api";
import JobHeroSection from "../../components/jobHeroSection";
import FooterSection from "../../components/footerSection";
import SimilarJobsSection from "../../components/similarJobsSection";

const Job = ({ menuItems, job, jobCategories }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<{
    data: string;
    type: string;
  }>(null);
  const [recaptcha, setRecaptchaValue] = useState("");

  const ADD_JOB_APPLICATION = gql`
    mutation MyMutation(
      $jobId: ID!
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: String!
      $resume: ResumeInput!
    ) {
      submitJobApplication(
        input: {
          jobId: $jobId
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          resume: $resume
        }
      ) {
        firstName
        lastName
        email
        phone
        resume
      }
    }
  `;

  const [addJobApplication, { data, loading, error }] = useMutation(
    ADD_JOB_APPLICATION,
    {
      variables: {
        jobId: job.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        resume: resume,
      },
      errorPolicy: "all",
    }
  );

  const image =
    "http://api.jobdating.ro/wp-content/uploads/2024/04/jobSectionBg-scaled.jpg";

  const currentJobCategories = job.jobCategories.nodes.map(
    (category) => category.name
  );

  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <JobHeroSection image={image} job={job}></JobHeroSection>
      <div className="jobs-container max-w-[1640px] w-full mx-auto px-4 pb-8">
        <h1 className="md:text-3xl text-2xl my-6 font-open-sans">Descriere</h1>
        <div className="flex font-medium font-inter text-gray-500">
          <div
            dangerouslySetInnerHTML={{ __html: job.jobFields.description }}
          />
        </div>

        <div className="apply mt-6 font-open-sans">
          <hr />
          <h1 className="md:text-3xl text-2xl my-6">Aplică</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addJobApplication();
            }}
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="md:mb-4">
                <label htmlFor="firstName" className="text-gray-600">
                  Nume*
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label htmlFor="lastName" className="text-gray-600">
                  Prenume*
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label htmlFor="email" className="text-gray-600">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label htmlFor="phone" className="text-gray-600">
                  Nr. de telefon*
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="resume" className="text-gray-600 block mb-3">
                  Incarca CV
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf, .doc, .docx" // Add accepted file formats
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fileReader = new FileReader();
                      fileReader.onloadend = () => {
                        const base64String = (
                          fileReader.result as string
                        ).split(",")[1]; // Extract base64 part
                        setResume({ data: base64String, type: file.type });
                      };
                      fileReader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <ReCAPTCHA
                sitekey="6LcR9XQpAAAAAIDIfJ36ZbGhHme95gzVIPwzbHvZ"
                onChange={(e) => setRecaptchaValue(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full md:w-fit px-24 rounded py-2 text-white bg-cyan-400 hover:bg-cyan-600 focus:outline-none"
              >
                Aplică
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
          </form>
        </div>
      </div>
      <SimilarJobsSection
        jobCategory={currentJobCategories}
      ></SimilarJobsSection>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default Job;

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of all job IDs
  const allJobs = await getAllJobs();

  // Generate paths with the job IDs
  const paths = allJobs.map((job) => ({
    params: { id: job.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const job = await getJobById(params.id);
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, job, jobCategories },
    revalidate: 10,
  };
};
