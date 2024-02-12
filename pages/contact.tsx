import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { useState } from "react";
import { getMenuItemsByMenuName } from "../lib/api";
import { gql, useMutation } from "@apollo/client";

const Contact = ({ menuItems }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const ADD_CONTACT_ENTRY = gql`
    mutation MyMutation($phone: String!, $name: String!, $email: String!) {
      sendContactFormCF(input: { phone: $phone, name: $name, email: $email }) {
        email
        name
        phone
      }
    }
  `;

  const [addContactEntry, { data, loading, error }] = useMutation(
    ADD_CONTACT_ENTRY,
    {
      variables: {
        name: name,
        email: email,
        phone: phone,
      },
    }
  );

  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <h1>Contact</h1>
      <form
        className="w-1/2 mx-auto mt-8 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          addContactEntry();
        }}
      >
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
  );
};

export default Contact;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();

  return {
    props: { menuItems: allMenuItems },
    revalidate: 10,
  };
};
