import { GetStaticProps } from "next";
import { getMenuItemsByMenuName } from "../lib/api";
import MenuHeader from "../components/menuHeader";

const Contact = ({ menuItems }) => {
  return (
    <div style={{ height: "100vh" }}>
      <MenuHeader menuItems={menuItems} />
      <h1>Contact</h1>
      <form
        action=""
        className="w-1/2 mx-auto mt-8 p-6"
        style={{
          border: "none",
          background: "transparent",
          margin: "auto",
          textAlign: "left",
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
