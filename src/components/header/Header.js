import React from "react";
import Navigation from "../navigation/Navigation";
import css from "./Header.Module.css";
const Header = () => {
  return (
    <header className={css.header}>
      <Navigation />
    </header>
  );
};

export default Header;
