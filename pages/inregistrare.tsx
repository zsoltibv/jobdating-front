import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useRef, useState } from "react";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";
import PageHeroSection from "../components/pageHeroSections";
import { title } from "process";
import FooterSection from "../components/footerSection";
import ReCAPTCHA from "react-google-recaptcha";

const Inregistrare = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Înregistrează-te în baza de date",
    description:
      "Inscrie-te baza noastră de date și colegii noștri te vor contacta pentru a vă ajuta să-l intalnesti locul de muncă potrivit pentru tine cât mai curând posibil.",
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [workFromDistance, setWorkFromDistance] = useState(false);
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [workTypes, setWorkTypes] = useState([]);
  const [resume, setResume] = useState<{
    data: string;
    type: string;
  }>(null);
  const [recaptcha, setRecaptchaValue] = useState("");
  const [message, setMessage] = useState("");
  const recaptchaRef = useRef(null);

  const ADD_CANDIDATE_SUBMISSION = gql`
    mutation MyMutation(
      $firstName: String!
      $lastName: String!
      $email: String!
      $phoneNumber: String!
      $city: String!
      $workFromDistance: Boolean!
      $socialMediaLink: String!
      $workType: [String!]!
      $resume: ResumeInput
      $recaptcha: String!
    ) {
      sendCandidateSubmissionCF(
        input: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          phoneNumber: $phoneNumber
          city: $city
          workFromDistance: $workFromDistance
          socialMediaLink: $socialMediaLink
          workType: $workType
          resume: $resume
          recaptcha: $recaptcha
        }
      ) {
        message
        errors
      }
    }
  `;

  const [addCandidateSubmissionCF, { data, loading, error }] = useMutation(
    ADD_CANDIDATE_SUBMISSION
  );

  const addCandidateSubmission = async () => {
    const result = await addCandidateSubmissionCF({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phone,
        city: city,
        workFromDistance: workFromDistance,
        socialMediaLink: socialMediaLink,
        workType: workTypes,
        resume: resume,
        recaptcha: recaptcha,
      },
      errorPolicy: "all",
    });

    if (result.data.sendCandidateSubmissionCF?.errors) {
      setMessage(result.data.sendCandidateSubmissionCF?.errors[0]);
    } else {
      setMessage(result.data.sendCandidateSubmissionCF?.message);
      recaptchaRef.current.reset();
    }
  };

  const handleWorkTypeChange = (event) => {
    const { value, checked } = event.target;
    let newWorkTypes = [...workTypes];
    if (checked && !newWorkTypes.includes(value)) {
      newWorkTypes.push(value);
    } else if (!checked && newWorkTypes.includes(value)) {
      newWorkTypes = newWorkTypes.filter((type) => type !== value);
    }
    setWorkTypes(newWorkTypes);
  };

  return (
    <div className="bg-gray-100">
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="despre-noi-container container w-full mx-auto px-4 pb-6 h-fit-content">
        <div className="font-medium font-inter text-gray-500 py-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCandidateSubmission();
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

              <div className="md:mb-4">
                <label htmlFor="city" className="text-gray-600">
                  Localitate*
                </label>
                <input
                  type="text"
                  name="city"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="md:mb-4 flex items-center">
                <label
                  htmlFor="workFromDistance"
                  className="text-gray-600 mr-2"
                >
                  Munca la distanta
                </label>
                <input
                  type="checkbox"
                  name="workFromDistance"
                  className="form-checkbox"
                  checked={workFromDistance}
                  onChange={(e) => setWorkFromDistance(e.target.checked)}
                />
              </div>

              {/* Social Media Link Input */}
              <div className="md:mb-4">
                <label htmlFor="socialMediaLink" className="text-gray-600">
                  Link Linkedin/Facebook
                </label>
                <input
                  type="url"
                  name="socialMediaLink"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none mt-2"
                  value={socialMediaLink}
                  onChange={(e) => setSocialMediaLink(e.target.value)}
                />
              </div>

              <div className="md:mb-4">
                <label className="text-gray-600">
                  Ce fel de loc de munca cauti
                </label>
                <div className="flex flex-col mt-2">
                  {/* Munca Necalificata */}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="workType"
                      value="Munca Necalificata"
                      onChange={handleWorkTypeChange}
                      checked={workTypes.includes("Munca Necalificata")}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Munca Necalificata</span>
                  </label>

                  {/* Munca Calificata */}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="workType"
                      value="Munca Calificata"
                      onChange={handleWorkTypeChange}
                      checked={workTypes.includes("Munca Calificata")}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Munca Calificata</span>
                  </label>

                  {/* Studii Superioare */}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="workType"
                      value="Studii Superioare"
                      onChange={handleWorkTypeChange}
                      checked={workTypes.includes("Studii Superioare")}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Studii Superioare</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="resume" className="text-gray-600 block mb-3">
                  Incarca CV (docx, doc, pdf)
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
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default Inregistrare;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
