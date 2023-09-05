import React from "react";

const Text = ({ className, children, as }) => {
  const Component = as || 'div';
  return <Component className={className}>{children}</Component>;
};

export default Text;
