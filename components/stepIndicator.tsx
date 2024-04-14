import React from "react";

const StepIndicator = ({ steps }) => {
  return (
    <div className="md:flex md:items-center md:justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center justify-center mb-4 md:mb-0 md:flex-row md:relative">
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white bg-cyan-200 mb-2`}
            >
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-full text-white bg-cyan-300`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white bg-cyan-400`}
                >
                  {index + 1}
                </div>
              </div>
            </div>
            <span className="text-cyan-700 text-center md:absolute top-16">
              {step}
            </span>
            {index < steps.length - 1 && (
              // Horizontal line on desktop
              <div className="hidden md:flex w-8 h-0.5 bg-cyan-400 absolute top-1/2 transform -translate-y-1/2 right-0 md:left-14"></div>
            )}
            {index < steps.length - 1 && (
              // Vertical line on mobile
              <div className="w-0.5 bg-cyan-400 h-6 md:hidden"></div>
            )}
          </div>
          {index < steps.length - 1 && (
            // Full-length horizontal line on desktop
            <div className="hidden md:flex flex-auto border-t-2 transition duration-500 ease-in-out border-cyan-400"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;

// Example usage:
// <StepIndicator steps={['Anunt de angajare', 'Selectia aplicatorilor primite', ...]} />
