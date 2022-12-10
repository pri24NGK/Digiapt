import React from "react";
import { NavLink } from "react-router-dom";
import Classes from "./NavigationLink.module.css";

export const NavigationLink = (props) => {
  const { userData, name, path, exact, mobile } = props;

  const checkName = (name, userData) => {
    let updatedName = name;
    if (userData !== null) {
      if (name === "Login") {
        updatedName = "Logout";
      }
    }
    return updatedName;
  };

  const checkPath = (path, name, userData) => {
    let updatedPath = path;
    if (userData !== null) {
      if (name === "Login") {
        updatedPath = "/logout";
      }
    }
    return updatedPath;
  };
  return (
    <NavLink
      to={checkPath(path, name, userData)}
      exact={exact}
      className={`${
        mobile
          ? Classes.mobile_nav__item__link
          : Classes.main_header__item__link
      } ${
        name === "Feed_App" && !mobile ? Classes.main_header_hightlight : ""
      }`}
      activeClassName={
        mobile
          ? Classes.mobile_nav__item__activelink
          : Classes.main_header__item__activelink
      }
      onClick={props.clickHandler}
    >
      {checkName(name, userData)}
    </NavLink>
  );
};
