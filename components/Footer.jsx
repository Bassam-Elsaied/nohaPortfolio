import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-black text-gray-300 py-2 text-center">
      <p>
        Created With 🩵 by{" "}
        <Link
          href="https://my-portfolio-snowy-nu-82.vercel.app/"
          className="hover:text-white transition-all duration-300"
        >
          Bassam
        </Link>
      </p>
    </div>
  );
}

export default Footer;
