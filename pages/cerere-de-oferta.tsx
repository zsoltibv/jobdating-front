import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useRef, useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";
import ReCAPTCHA from "react-google-recaptcha";
import { fi } from "date-fns/locale";

const CerereDeOferta = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Cerere de ofertă",
    description:
      "Completează formularul de mai jos și unul dintre colegii noștri te va contacta pentru a discuta despre nevoile tale de personal.",
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyHeadquarters, setCompanyHeadquarters] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [jobName, setJobName] = useState("");
  const [dateOfStart, setDateOfStart] = useState("");
  const [numberOfPersonnelNeeded, setNumberOfPersonnelNeeded] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");

  const [recaptcha, setRecaptchaValue] = useState("");
  const recaptchaRef = useRef(null);

  const ADD_RECRUITER_SUBMISSION = gql`
    mutation MyRecruiterMutation(
      $firstName: String!
      $lastName: String!
      $companyName: String!
      $companyHeadquarters: String!
      $email: String!
      $phoneNumber: String!
      $jobName: String!
      $dateOfStart: String!
      $nrOfPersonnelNeeded: Int!
      $jobDescription: String!
    ) {
      sendRecruiterSubmissionCF(
        input: {
          firstName: $firstName
          lastName: $lastName
          companyName: $companyName
          companyHeadquarters: $companyHeadquarters
          email: $email
          phoneNumber: $phoneNumber
          jobName: $jobName
          dateOfStart: $dateOfStart
          nrOfPersonnelNeeded: $nrOfPersonnelNeeded
          jobDescription: $jobDescription
        }
      ) {
        message
        errors
      }
    }
  `;

  const [addRecruiterSubmissionCF, { data, loading, error }] = useMutation(
    ADD_RECRUITER_SUBMISSION
  );

  const addRecruiterSubmission = async () => {
    const result = await addRecruiterSubmissionCF({
      variables: {
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        companyHeadquarters: companyHeadquarters,
        email: email,
        phoneNumber: phone,
        jobName: jobName,
        dateOfStart: dateOfStart,
        nrOfPersonnelNeeded: parseInt(numberOfPersonnelNeeded),
        jobDescription: jobDescription,
      },
      errorPolicy: "all",
    });

    if (result.data.sendRecruiterSubmissionCF?.errors) {
      setMessage(result.data.sendRecruiterSubmissionCF?.errors[0]);
    } else {
      setMessage(result.data.sendRecruiterSubmissionCF?.message);
      recaptchaRef.current.reset();
    }
  };

  return (
    <div className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
        <div className="flex font-medium font-inter text-gray-500 py-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addRecruiterSubmission();
            }}
            className="grid grid-cols-1 w-full"
          >
            <div className="grid md:grid-cols-2 gap-4">
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
                <label htmlFor="companyName" className="text-gray-600">
                  Nume Companie*
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label htmlFor="companyHeadquarters" className="text-gray-600">
                  Sediu Companie*
                </label>
                <input
                  type="text"
                  name="companyHeadquarters"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={companyHeadquarters}
                  onChange={(e) => setCompanyHeadquarters(e.target.value)}
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

              <div className="md:mb-4">
                <label htmlFor="jobName" className="text-gray-600">
                  Denumire Post*
                </label>
                <input
                  type="text"
                  name="jobName"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label htmlFor="dateOfStart" className="text-gray-600">
                  Data inceperii activitatii*
                </label>
                <input
                  type="date"
                  name="dateOfStart"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={dateOfStart}
                  onChange={(e) => setDateOfStart(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label htmlFor="jobDescription" className="text-gray-600">
                  Descriere Post*
                </label>
                <textarea
                  name="jobDescription"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={jobDescription}
                  rows={6}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label
                  htmlFor="numberOfPersonnelNeeded"
                  className="text-gray-600"
                >
                  Nr necesar personal*
                </label>
                <input
                  type="number"
                  name="numberOfPersonnelNeeded"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={numberOfPersonnelNeeded}
                  min={0}
                  max={100}
                  onChange={(e) => setNumberOfPersonnelNeeded(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full md:w-fit px-24 rounded py-2 text-white bg-cyan-400 hover:bg-cyan-600 focus:outline-none"
              >
                Trimite cererea
              </button>
              <p className="mt-4">
                {loading && <p>Se incarca...</p>}
                {message && <p>{message}</p>}
              </p>
            </div>
          </form>
        </div>
      </div>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
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
