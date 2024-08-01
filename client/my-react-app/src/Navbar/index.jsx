import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
// import aridp from './aridp.jpeg';
import "./styles.scss";

const data = [
  { label: "HOME", to: "/" },
  { label: "ADD-EDIT EXPENSES", to: "/home" },
  // { label: "SEE REPORT", to: "/analytics" },
  { label: "REVIEWS", to: "/review" },
  { label: "FEED", to: "/feed" },
  { label: "REGISTER", to: "/register" },
  { label: "LOGIN", to: "/login" },
  // { label: "CONTACT", to: "/contact" },
];

const Navbar = () => {
  const [toggleIcon, setToggleIcon] = useState(false);

  const handleToggleIcon = () => {
    setToggleIcon(!toggleIcon);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to={"/"} className="navbar__container__logo">
        <FaBars size={30}/>
        </Link>
        <div className="nav-icon" onClick={handleToggleIcon}>
          {toggleIcon ? <HiX size={30} /> : <FaBars size={30} />}
        </div>
        <ul className={`navbar__container__menu ${toggleIcon ? "active" : ""}`}>
          {data.map((item, key) => (
            <li key={key} className="navbar__container__menu__item">
              <Link
                className="navbar__container__menu__item__links"
                to={item.to}
                onClick={handleToggleIcon}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
