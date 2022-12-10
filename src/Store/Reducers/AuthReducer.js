import * as actionTypes from "../ActionTypes/Auth";
const initialState = {
  token: null,
  userId: null,
  errors: {},
  checkLogin: false,
  isAuth: false,
  loaderAuth: false,
  userData: null,
  googleData: null,
  message: "",
  menu_data:""
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_SIGNIN_GOOGLE_DATA: {
      return {
        ...state,
        googleData: action.payload,
      };
    }
    case actionTypes.SIGNIN_FAILED: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case actionTypes.STORE_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case actionTypes.SHOW_LOADER_AUTH: {
      return {
        ...state,
        loaderAuth: true,
      };
    }
    case actionTypes.MENU_DATA:{
      return{
        ...state,
        menu_data:action.payload
      }
    }
    default:
      return state;
  }
};
