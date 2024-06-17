import Link from "next/link";

const ConsentText = () => {
  return (
    <p className="text-gray-600 text-sm inline-block max-w-2xl">
      Prin trimiterea informațiilor dvs. personale, vă dați consimțământul ca
      JobDating să stocheze și să utilizeze informațiile personale pe care le
      trimiteți, în conformitate cu
      <Link
        href="/politica-de-confidentialitate"
        className="text-cyan-400 ml-1"
      >
        Politica noastră de confidențialitate.
      </Link>
    </p>
  );
};

export default ConsentText;
