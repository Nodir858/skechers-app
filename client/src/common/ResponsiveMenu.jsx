import React from "react";

const ResponsiveMenu = (newText) => {
  const arr = ["Home", "About", "Services", "Contact"];
  return (
    <>
      <div className="dropDownItem">
        {arr.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
    </>
  );
};

export default ResponsiveMenu;
