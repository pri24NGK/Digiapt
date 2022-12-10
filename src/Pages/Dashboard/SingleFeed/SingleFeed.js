import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../Store/Index/Dashboard";
import { Backdrop } from "../../../Components/Backdrop/Backdrop";
import { Modal } from "../../../Components/Modal/Modal";
import Classes from "./SingleFeed.module.css";
import { Spinner } from "../../../Components/Spinner/Spinner";

export const SingleFeed = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const single_feed_record = useSelector(
    (state) => state.Dashboard.single_feed_record
  );
  const loading = useSelector((state) => state.Dashboard.loading);

  useEffect(() => {
    if (id) {
      dispatch(actions.getSingleFeed(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  }
  if (single_feed_record?.restData) {
    return (
      <>
        <Backdrop>
          <Modal clickHandler={() => props.history.push("/")}>
            <h4 className={Classes.user_title}>User and TimeStamp Details:</h4>
            <div className={Classes.wrapper}>
              <div className={`${Classes.wrapper_flex_container}`}>
                <p className={`${Classes.user_title} ${Classes.side_spacing}`}>
                  Created By: {single_feed_record.restData.name}
                </p>
                <h6 className={`${Classes.user_title} ${Classes.side_spacing}`}>
                  {single_feed_record.restData.date.split("At ")[0] + " At "}
                  {new Date(
                    parseInt(single_feed_record.restData.date.split("At ")[1])
                  ).toUTCString()}
                </h6>
              </div>
            </div>

            <h4 className={Classes.user_title}>Feed Details:</h4>
            <div className={Classes.wrapper}>
              <div
                className={`${Classes.wrapper_container} ${Classes.side_spacing}`}
              >
                <label htmlFor={"Title"} className={Classes.label_text}>
                  Title:
                </label>
                <h5 className={Classes.feed_title}>
                  {single_feed_record.restData.feed.title}
                </h5>
              </div>
              <div
                className={`${Classes.wrapper_container} ${Classes.side_spacing}`}
              >
                <label htmlFor={"Category"} className={Classes.label_text}>
                  Category:
                </label>
                <h5 className={Classes.feed_title}>
                  {single_feed_record.restData.feed.category}
                </h5>
              </div>
              <div
                className={`${Classes.wrapper_container} ${Classes.side_spacing}`}
              >
                <label
                  htmlFor={"Content"}
                  className={`${Classes.label_text} ${Classes.content_text}`}
                >
                  Content:
                </label>
              </div>

              <p className={`${Classes.content} `}>
                {single_feed_record.restData.feed.content}
              </p>
            </div>
          </Modal>
        </Backdrop>
      </>
    );
  }
  return <></>;
};
