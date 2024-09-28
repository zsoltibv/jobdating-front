// components/CookieNotice.js
import Link from "next/link";
import { useEffect, useState } from "react";

const CookieNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-cyan-600 text-white p-4 shadow-lg rounded-md w-80 z-20">
      <p>
        Această website folosește cookie-uri pentru a îmbunătăți experiența
        utilizatorului.
      </p>
      <div className="mt-2 flex justify-start items-center gap-4">
        <button
          onClick={handleAcceptCookies}
          className="bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded"
        >
          Acceptă
        </button>

        <button className="bg-transparent hover:underline text-white font-bold">
          <Link
            href={`/politica-de-confidentialitate`}
            className="flex items-center"
          >
            Citește mai multe
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
