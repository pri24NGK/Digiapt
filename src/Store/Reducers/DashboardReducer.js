import * as actionTypes from "../ActionTypes/Dashboard";

const initialState = {
  feed_record: [],
  single_feed_record: {},
  textdata: "Add",
  loading: false,
  errorsDashboard: {},
  matchId: false,
};

export const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEEDS: {
      return {
        ...state,
        loading: false,
        feed_record: action.payload,
      };
    }

    case actionTypes.UPDATE_TEXT_DATA: {
      return {
        ...state,
        textdata: action.payload,
      };
    }
    case actionTypes.GET_FEED: {
      return {
        ...state,
        single_feed_record: action.data,
        loading: false,
      };
    }
    case actionTypes.CLEAR_FEED: {
      return {
        ...state,
        textdata: "Add",
        single_feed_record: {},
      };
    }
    case actionTypes.SHOW_LOADER: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.MATCH_ID: {
      return {
        ...state,
        matchId: action.payload,
      };
    }
    default:
      return state;
  }
};
