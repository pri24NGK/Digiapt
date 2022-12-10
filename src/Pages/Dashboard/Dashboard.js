import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Components/Button/Button";
import * as actions from "../../Store/Index/Dashboard";
import ClassName from "./Dashboard.module.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { UpdateFeed } from "./Feed/Update_Feed";
import { Spinner } from "../../Components/Spinner/Spinner";
import * as AuthActions from "../../Store/Index/Auth";
import { FormControl } from "../../Components/FormControl/FormControl";
import { Filters } from "../../Utils/Constants/Constants";
import { Pagination } from "../../Components/Pagination/Pagination";
let PageSize = 5;

export const Dashboard = (props) => {
  const dispatch = useDispatch();

  const feed_record = useSelector((state) => state.Dashboard.feed_record);
  const loading = useSelector((state) => state.Dashboard.loading);
  const userData = useSelector((state) => state.Auth.userData);
  const matchId = useSelector((state) => state.Dashboard.matchId);
  const textData = useSelector((state) => state.Dashboard.textdata);
  const menu_data = useSelector((state) => state.Auth.menu_data);

  const [click, setClick] = useState(false);
  const [sortByData, setSortByData] = useState(Filters.sortBy);
  const [search, setSearch] = useState(Filters.search);
  const [category, setCategory] = useState(Filters.Category);
  const [currentPage, setCurrentPage] = useState(1);

  const currentFeedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return feed_record.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, feed_record]);

  useEffect(() => {
    if (menu_data === "Add Feed") {
      setClick(true);
    } else if (menu_data === "My Feeds") {
      dispatch(actions.getFeeds({ type: "user", id: userData.uid }));
      setCurrentPage(1);
    }
  }, [menu_data, dispatch, userData]);

  useEffect(() => {
    dispatch(actions.getFeeds());
  }, [dispatch]);

  useEffect(() => {
    if (search?.value === "") {
      dispatch(actions.getFeeds());
    }
  }, [search, dispatch]);

  const modalClickHandler = () => {
    dispatch(actions.updateTextData("Add"));
    if (userData !== null) {
      dispatch(actions.matchId(false));
      dispatch(actions.clearSingleFeedData());
      setClick(true);
    } else {
      dispatch(
        AuthActions.signInFailed("Please login before  accessing any feed!")
      );
    }
  };
  const closeHandler = (closeBtnClick = false) => {
    dispatch(AuthActions.menuData(""));
    setClick(false);
    if (!closeBtnClick) {
      dispatch(actions.getFeeds());
    }
  };
  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n) + "..." : str;
  };

  const showDataHandler = (data) => {
    if (userData !== null) {
      props.history.push("/feed/" + data.key);
    } else {
      dispatch(
        AuthActions.signInFailed("Please login before  accessing any feed!")
      );
    }
  };
  const helperUpdateData = (data, event) => {
    const updatedData = { ...data };
    updatedData["value"] = event.target.value;
    return updatedData;
  };

  const changeHandler = (name, event) => {
    if (name === "sort") {
      setSortByData((data) => {
        return helperUpdateData(data, event);
      });
      dispatch(actions.getFeeds({ type: "sortBy", id: event.target.value }));
    } else if (name === "search") {
      setSearch((data) => {
        return helperUpdateData(data, event);
      });
    } else if (name === "category") {
      setCategory((data) => {
        return helperUpdateData(data, event);
      });
      dispatch(actions.getFeeds({ type: "filterBy", id: event.target.value }));
    }
  };

  return (
    <React.Fragment>
      {((userData !== null && !matchId) ||
        (userData !== null && textData === "Add")) && (
        <UpdateFeed click={click} close={closeHandler} />
      )}

      <div className={ClassName.Dashboard_boundary}>
        <h1>Dashboard data</h1>
        <Button design="add" onClick={modalClickHandler}>
          <AiOutlinePlus /> &nbsp; Add Feed
        </Button>
        {loading ? (
          <Spinner />
        ) : (
          <div className={ClassName.Dashboard}>
            <div className={ClassName.filters}>
              <FormControl
                type={sortByData.type}
                elementConfig={sortByData.elementConfig}
                value={sortByData.value}
                changeHandler={changeHandler.bind(this, "sort")}
                override
              />
              <div className={ClassName.search_container}>
                <FormControl
                  name={search.name + " to search"}
                  type={search.type}
                  elementConfig={search.elementConfig}
                  value={search.value}
                  override
                  changeHandler={changeHandler.bind(this, "search")}
                />
                <div
                  className={ClassName.icon_container}
                  onClick={() => {
                    if (search.value !== "") {
                      dispatch(
                        actions.getFeeds({ type: "search", id: search.value })
                      );
                    }
                  }}
                >
                  <FaSearch className={ClassName.icon} />
                </div>
              </div>
              <FormControl
                type={category.type}
                elementConfig={category.elementConfig}
                value={category.value}
                changeHandler={changeHandler.bind(this, "category")}
                override
              />
            </div>

            {currentFeedData &&
              currentFeedData.map((data) => {
                return (
                  <div
                    className={ClassName.Employee}
                    key={data.key}
                    onClick={showDataHandler.bind(this, data)}
                  >
                    <div>
                      <h4 className={ClassName.first_header}>
                        {data.restData.name} -{" "}
                        {data.restData.date.split("At ")[0] + " At "}
                        {new Date(
                          parseInt(data.restData.date.split("At ")[1])
                        ).toUTCString()}
                      </h4>
                    </div>
                    <div className={ClassName.first_row_data}>
                      <h4 className={ClassName.first_header}>
                        Title: {data.restData.feed.title}
                      </h4>
                    </div>
                    <div className={ClassName.first_row_data}>
                      <h4 className={ClassName.first_header}>
                        Category: {data.restData.feed.category}
                      </h4>
                    </div>
                    <div className={ClassName.first_row_data}>
                      <p className={ClassName.first_header}>
                        {truncate(data.restData.feed.content, 50)}
                      </p>
                      {data.restData.feed.image && (
                        <img
                          className={ClassName.image_data}
                          src={data.restData.feed.image}
                          alt={data.restData.feed.title + data.key}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            {!currentFeedData?.length > 0 && (
              <h2 className={ClassName.no_record}>No Records Found!</h2>
            )}
            {currentFeedData?.length > 0 && (
              <Pagination
                className={ClassName.pagination_bar}
                currentPage={currentPage}
                totalCount={feed_record.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
