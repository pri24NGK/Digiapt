import React from "react";
import { Route, Switch,withRouter } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Signup } from "./Pages/Auth/Signup";
import { useSelector, useDispatch } from "react-redux";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import * as actions from "./Store/Actions/Auth";
import { Logout } from "./Pages/Auth/Logout";
import { auth } from "./Pages/Auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Modal } from "./Components/Modal/Modal";
import { Backdrop } from "./Components/Backdrop/Backdrop";
import { SingleFeed } from "./Pages/Dashboard/SingleFeed/SingleFeed";

export const App = withRouter((props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Auth.userData);
  const errorMessage = useSelector((state) => state.Auth.message);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(actions.storeUserData(user));
    } else {
      dispatch(actions.storeUserData(null));
    }
  });

  const clickHandler = () => {
    dispatch(actions.signInFailed(""));
  };

  const menuDataHandler = (data) => {
    props.history.push("/")
    dispatch(actions.menuData(data));
  };

  return (
    <React.Fragment>
      <Header userData={userData} menuData={menuDataHandler} />
      {errorMessage && (
        <Backdrop>
          <Modal clickHandler={clickHandler}>{errorMessage}</Modal>
        </Backdrop>
      )}
      <Switch>
        <Route path="/feed/:id" exact component={SingleFeed} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
      <Route path="/auth" exact component={Signup} />
      <Route path="/" exact component={Dashboard} />
    </React.Fragment>
  );
});
