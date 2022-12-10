import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

export const Button = (props) =>
  !props.link ? (
    <button
      className={["button", `button--${props.design}`].join(" ")}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  ) : (
    <Link className={["button"].join(" ")} to={props.link}>
      {props.children}
    </Link>
  );
