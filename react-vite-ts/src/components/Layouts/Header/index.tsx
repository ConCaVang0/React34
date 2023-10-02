import React from "react";
import style from "./Header.module.css";
import HeaderLogo from "../../HeaderLogo";
import NavigationBar from "../../NavigationBar";

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header_wrapper}>
            <HeaderLogo/>
            <NavigationBar/>
        </div>
      </div>
    </header>
  );
};

export default Header;
