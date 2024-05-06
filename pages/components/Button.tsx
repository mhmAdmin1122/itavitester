import Link from "next/link";
import React from "react";

const Button = ({ url, btnText, btnText2, boldtext, showHide }: any) => {
  return (
    <Link
      href={`${url}`}
      className={`bg-[#ca8a04] w-fit text-[#000] px-6 py-2 text-lg hover:bg-[#000] hover:text-[#ca8a04] ${showHide}`}
    >
      <p className="btn-txt-desctop">
        <b>{boldtext} </b>
        {btnText}
      </p>
      <p className="btn-txt-mob">{btnText2}</p>
    </Link>
  );
};

export default Button;
