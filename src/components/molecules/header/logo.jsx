import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo flex">
      <Link to="/">
        <img src="./static/img/jif.gif"alt='logo de react'></img>
      </Link>
    </div>
  );
}

export default Logo;
