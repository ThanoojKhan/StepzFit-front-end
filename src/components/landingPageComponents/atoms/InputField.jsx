import React from "react";

const InputField = ({ className, children }) => {
  return (
    <>
      <div className={className}>
        {children}
      </div>
    </>
  );
};

export default InputField;
