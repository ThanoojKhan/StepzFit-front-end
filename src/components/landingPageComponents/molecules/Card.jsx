import React from "react";

const Card = ({ className, children, ...rest }) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default Card;
