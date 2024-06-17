import { GetStaticPaths, GetStaticProps } from "next";
import { useRef, useState } from "react";
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
import { useRouter } from "next/router";

const Job = ({ menuItems, job, jobCategories }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<{
    data: string;
    type: string;
  }>(null);
  const [recaptcha, setRecaptchaValue] = useState("");
  const recaptchaRef = useRef(null);

  const ADD_JOB_APPLICATION = gql`
    mutation MyMutation(
      $jobId: ID!
      $jobName: String!
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: String!
      $resume: ResumeInput
      $recaptcha: String!
    ) {
      submitJobApplication(
        input: {
          jobId: $jobId
          jobName: $jobName
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          resume: $resume
          recaptcha: $recaptcha
        }
      ) {
        firstName
        lastName
        email
        phone
        resume
        message
        errors
      }
    }
  `;

  const [addJobApplicationCF, { data, loading, error }] =
    useMutation(ADD_JOB_APPLICATION);

  const addJobApplication = async () => {
    const result = await addJobApplicationCF({
      variables: {
        jobId: job.id,
        jobName: job.jobFields.name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        resume: resume,
        recaptcha: recaptcha,
      },
      errorPolicy: "all",
    });

    if (result.data.submitJobApplication?.errors) {
      setMessage(result.data.submitJobApplication?.errors[0]);
    } else {
      setMessage(result.data.submitJobApplication?.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setResume(null);
      setRecaptchaValue("");
      recaptchaRef.current.reset();
    }
  };

  const image = "/img/job-header.webp";

  const currentJobCategories = job.jobCategories.nodes.map(
    (category) => category.name
  );

  if (router.isFallback) {
    return <div>Se incarca...</div>;
  }

  return (
    <div style={{ height: "fit-content" }} className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <JobHeroSection image={image} job={job}></JobHeroSection>
      <div className="jobs-container container w-full mx-auto px-4 pb-6">
        <h1 className="md:text-3xl text-2xl my-6 font-open-sans">Descriere</h1>
        <div className="flex font-medium font-inter text-gray-500">
          <div
            dangerouslySetInnerHTML={{ __html: job.jobFields.description }}
          />
        </div>

        <div className="apply mt-6 font-open-sans">
          <div className="flex justify-left">
            <div className="bg-cyan-400 w-full rounded-lg md:px-20 md:py-14 p-6">
              <h2 className="text-lg uppercase font-bold text-white mb-8">
                Aplică pentru acest job
                <hr className="md:mb-12 md:mt-3 m-0" />
              </h2>
              <div className="bg-gray-100 w-full rounded-lg p-6">
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
                        pattern="(\+4)?07[0-9]{8}"
                        placeholder="07xxxxxxxx"
                        title="Format: 07xxxxxxxx"
                        maxLength={10}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="resume"
                        className="text-gray-600 block mb-3"
                      >
                        Încarcă CV
                      </label>
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf, .doc, .docx" // Add accepted file formats
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              // File exceeds 5MB
                              alert("Fisierul este prea mare. Maxim 5MB.");
                              e.target.value = null; // Clear input
                              return;
                            }

                            const allowedTypes = [
                              "application/pdf",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ];
                            if (!allowedTypes.includes(file.type)) {
                              // Invalid file type
                              alert("Tipul de fisier nu este acceptat.");
                              e.target.value = null; // Clear input
                              return;
                            }

                            const fileReader = new FileReader();
                            fileReader.onloadend = () => {
                              const base64String = (
                                fileReader.result as string
                              ).split(",")[1]; // Extract base64 part
                              setResume({
                                data: base64String,
                                type: file.type,
                              });
                            };
                            fileReader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={(value) => setRecaptchaValue(value)}
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
                  <p className="mt-4">
                    {loading && <p>Se incarca...</p>}
                    {message && <p>{message}</p>}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarJobsSection
        jobCategories={currentJobCategories}
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    console.log("Job ID is undefined or invalid in getStaticProps");
    return { notFound: true };
  }

  const job = await getJobById(params.id);
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, job, jobCategories },
    revalidate: 10,
  };
};
