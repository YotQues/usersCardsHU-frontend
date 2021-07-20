import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
  const { className, to, pathname } = props;
  let isActive = pathname === to ? ' active' : '';
  return (
    <Link to={to} className={className + isActive}>
      {props.children}
    </Link>
  );
};

export default NavLink;