import React from "react";

const Input = ({ containerClass, inputClass, children, ...rest }) => {
  return (
    <>
      <div className={containerClass}>
        <input className={inputClass} {...rest} />
        {children}
      </div>
    </>
  );
};

export default Input;
