import React from "react";

const CallToActionBanner = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="bg-cyan-400 flex md:flex-row flex-col items-start md:justify-between md:items-center px-6 py-8 rounded-md text-white">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button
        onClick={onButtonClick}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded md:mt-0 mt-4"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CallToActionBanner;
