import React from "react";

const List = ({ className, children, ...rest }) => {
  return (
    <li className={className} {...rest}>
      {children}
    </li>
  );
};

export default List;
