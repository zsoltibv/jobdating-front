import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import MenuHeader from "../../components/menuHeader";
import ReCAPTCHA from "react-google-recaptcha";
import { getAllJobs, getJobById, getMenuItemsByMenuName } from "../../lib/api";

const Job = ({ menuItems, job }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");

  console.log(job.id);

  const ADD_JOB_APPLICATION = gql`
    mutation MyMutation(
      $jobId: ID!
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: String!
      $resume: String!
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
    }
  );

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <div className="jobs-container p-8 mx-auto">
        <h1 className="text-3xl mb-6">{job.jobFields.name}</h1>
        <div className="flex">
          <p>{job.jobFields.description}</p>
        </div>

        <div className="apply mt-6">
          <hr />
          <h3 className="font-bold my-6">Apply to this Job</h3>
          <form
            className="w-1/3"
            onSubmit={(e) => {
              e.preventDefault();
              addJobApplication();
            }}
          >
            <div className="mb-4">
              <label htmlFor="firstName" className="text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-800"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-800"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-800"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="resume" className="text-gray-600">
                Resume
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
                      const base64String = (fileReader.result as string).split(
                        ","
                      )[1]; // Extract base64 part
                      setResume(base64String);
                    };
                    fileReader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div className="mb-4">
              <ReCAPTCHA
                sitekey="6LcR9XQpAAAAAIDIfJ36ZbGhHme95gzVIPwzbHvZ"
                onChange={handleRecaptchaChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-5 py-2 text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-blue-700"
              >
                Submit
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
          </form>
        </div>
      </div>
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

  return {
    props: { menuItems: allMenuItems, job },
    revalidate: 10,
  };
};
