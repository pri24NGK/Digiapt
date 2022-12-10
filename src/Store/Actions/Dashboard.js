import axios from "axios";
import * as actionTypes from "../ActionTypes/Dashboard";
import { database } from "../../Pages/Auth/firebase";
import { ref, update, remove } from "firebase/database";

export const showLoader = () => {
  return {
    type: actionTypes.SHOW_LOADER,
  };
};

export const getFeedData = (payload) => {
  return {
    type: actionTypes.GET_FEEDS,
    payload,
  };
};

export const getFeeds = (data = null) => {
  return (dispatch, getState) => {
    dispatch(showLoader());
    axios
      .get("https://feed-de54f-default-rtdb.firebaseio.com/feeds.json")
      .then((res) => {
        let updatedData = [];

        if (res.data !== null) {
          if (data?.type === "user") {
            for (let key in res.data) {
              if (res.data[key]["userId"] === data.id) {
                updatedData.push({
                  key: key,
                  restData: res.data[key],
                });
              }
            }
          } else {
            for (let key in res.data) {
              updatedData.push({
                key: key,
                restData: res.data[key],
              });
            }
          }
        }
        let filters = [...updatedData];
        if (data?.type !== "user") {
          if (data?.type === "sortBy") {
            if (data.id === "Date") {
              filters = updatedData.sort(
                (a, b) =>
                  b.restData.date.split("At ")[1] -
                  a.restData.date.split("At ")[1]
              );
            } else if (data.id === "Title") {
              filters = updatedData.sort((a, b) => {
                let A = a.restData["feed"]["title"].toUpperCase();
                let B = b.restData["feed"]["title"].toUpperCase();
                if (A < B) {
                  return -1;
                }
                if (A > B) {
                  return 1;
                }
                return 0;
              });
            }
          } else if (data?.type === "filterBy") {
            if (data.id !== "Filter-By") {
              filters = updatedData.filter(
                (item) => item.restData["feed"]["category"] === data.id
              );
            }
          } else if (data?.type === "search") {
            filters = updatedData.filter((item) => {
              return item.restData["feed"]["title"].match(data.id);
            });
          }
        }
        dispatch(getFeedData(filters));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getSingleFeedData = (data) => {
  return {
    type: actionTypes.GET_FEED,
    data,
  };
};

export const updateTextData = (payload) => {
  return {
    type: actionTypes.UPDATE_TEXT_DATA,
    payload,
  };
};

export const clearSingleFeedData = () => {
  return {
    type: actionTypes.CLEAR_FEED,
  };
};

export const getSingleFeed = (id) => {
  return (dispatch, getState) => {
    dispatch(showLoader());
    axios
      .get("https://feed-de54f-default-rtdb.firebaseio.com/feeds.json/")
      .then((res) => {
        let result = {
          key: id,
          restData: res.data[id],
        };

        dispatch(getSingleFeedData(result));
      });
  };
};

export const errorMessageDashboard = (errors) => {
  return {
    type: actionTypes.ERROR_MESSAGE_DASHBOARD,
    errors,
  };
};

export const addFeedResponse = (data) => {
  return {
    type: actionTypes.ADD_FEED,
    data,
  };
};

export const addFeed = (data, close) => {
  return (dispatch, getState) => {
    axios
      .post("https://feed-de54f-default-rtdb.firebaseio.com/feeds.json", data)
      .then((res) => {
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteFeed = (id) => {
  return (dispatch, getState) => {
    remove(ref(database, "feeds/" + id), null)
      .then((res) => {
        // Data saved successfully!
        dispatch(getFeeds());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateFeed = (id, data, close) => {
  return (dispatch, getState) => {
    update(ref(database, "feeds/" + id), data)
      .then((res) => {
        // Data saved successfully!
        close();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const matchId = (payload) => {
  return {
    type: actionTypes.MATCH_ID,
    payload,
  };
};

export const sortBy = (payload) => {
  return (dispatch) => {};
};
