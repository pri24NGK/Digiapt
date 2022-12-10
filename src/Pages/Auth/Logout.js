import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { auth } from "./firebase.js";

export const Logout = withRouter((props) => {
  const { history } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    auth.signOut();
    history.push("/");
  }, [dispatch, history]);
  return <></>;
});
