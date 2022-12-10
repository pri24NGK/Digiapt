import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { Backdrop } from "../Backdrop/Backdrop";
import Classes from "./Header.module.css";
import { HeaderData } from "./HeaderData";
import { RiLoginBoxFill, RiLogoutBoxFill, RiMailAddLine } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { NavigationLink } from "../NavigationLink/NavigationLink";
import { Menu } from "../Menu/Menu";

export const Header = (props) => {
  const [click, setClick] = useState(false);
  const { userData } = props;

  const clickHandler = () => {
    setClick((click) => !click);
  };

  const mobileIcons = (name, userData) => {
    let Component = BsFillPeopleFill;
    if (name === "Feed_App") {
      Component = BsFillPeopleFill;
    } else if (name === "Login" && userData !== null) {
      Component = RiLogoutBoxFill;
    } else if (name === "Login") {
      Component = RiLoginBoxFill;
    } else if (name === "Add Feed") {
      Component = RiMailAddLine;
    } else if (name === "My Feeds") {
      Component = CgUserList;
    }
    return <Component className={Classes.mobile_icon} />;
  };
  return (
    <>
      {click && <Backdrop />}
      <header className={Classes.main_header}>
        <GiHamburgerMenu
          className={Classes.main_header__hamicon}
          onClick={clickHandler}
        />

        <nav className={Classes.main_header__nav}>
          <ul className={Classes.main_header__items}>
            {HeaderData["rest"].left.map((Header) => {
              return (
                <li className={Classes.main_header__item} key={Header.id}>
                  <NavigationLink
                    path={Header.path}
                    exact
                    name={Header.name}
                    userData={userData}
                    clickHandler={props.menuData.bind(this, "")}
                  />
                </li>
              );
            })}
          </ul>
          <ul className={Classes.main_header__items}>
            <li className={Classes.main_header__item} key={Header.id}>
              <Menu
                title="Menu"
                data={HeaderData["menu"].posts}
                chooseIcon={mobileIcons}
                userData={userData}
                clickHandler={props.menuData}
              />
            </li>
            {HeaderData["rest"].right.map((Header) => {
              return (
                <li className={Classes.main_header__item} key={Header.id}>
                  <NavigationLink
                    name={Header.name}
                    userData={userData}
                    path={Header.path}
                    exact
                    clickHandler={props.menuData.bind(this, "")}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {click && (
        <nav className={`${Classes.mobile_nav} ${Classes.open}`}>
          <MdClose
            onClick={clickHandler}
            className={Classes.main_header__topRighticon}
          />
          <ul className={Classes.mobile_nav__item_list}>
            {HeaderData["mobile"].data.map((Header) => {
              if (
                (Header.name === "Add Feed" || Header.name === "My Feeds") &&
                userData === null
              ) {
                return <></>;
              }
              return (
                <div className={Classes.mobile_nav__items}>
                  {mobileIcons(Header.name, userData)}
                  <li className={Classes.mobile_nav__item}>
                    <NavigationLink
                      name={Header.name}
                      path={Header.path}
                      mobile
                      userData={userData}
                      clickHandler={clickHandler}
                      menuData={props.menuData}
                    />
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
};
