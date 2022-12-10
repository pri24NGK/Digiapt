import React, { useEffect, useMemo } from "react";
import { auth, provider } from "./firebase.js";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Index/Auth";

export const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useMemo(() => props.history, [props.history]);
  
  useEffect(() => {
    dispatch(actions.signInWithGoogle(auth, provider, history));
  }, [dispatch, history]);

  return <></>;
};
