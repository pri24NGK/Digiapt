import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Constants from "../../../Utils/Constants/Constants";
import ClassName from "./Update_Feed.module.css";
import { FormControl } from "../../../Components/FormControl/FormControl";
import { Button } from "../../../Components/Button/Button";
import { Backdrop } from "../../../Components/Backdrop/Backdrop";
import { Modal } from "../../../Components/Modal/Modal";
import * as actions from "../../../Store/Index/Dashboard";
import { Validators } from "../../../Utils/Validators";
import { Spinner } from "../../../Components/Spinner/Spinner";
import * as AuthActions from "../../../Store/Index/Auth";

export const UpdateFeed = (props) => {
  const [feedData, setFeedData] = useState(Constants.Feed_Data);
  const single_feed_record = useSelector(
    (state) => state.Dashboard.single_feed_record
  );
  const errorsDashboard = useSelector(
    (state) => state.Dashboard.errorsDashboard
  );
  const textdata = useSelector((state) => state.Dashboard.textdata);
  const loading = useSelector((state) => state.Dashboard.loading);
  const userData = useSelector((state) => state.Auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    setFeedData(Constants.Feed_Data);
  }, [props.click]);

  const changeHandler = (type, resource) => {
    setFeedData((data) => {
      const updatedData = { ...data };
      if (type === "Image") {
        if (resource.target.files && resource.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            updatedData[type] = {
              ...updatedData[type],
              value: resource.target.value,
              fileURL: e.target.result,
            };
          };
          reader.readAsDataURL(resource.target.files[0]);
        }
      } else {
        updatedData[type] = {
          ...updatedData[type],
          value: resource.target.value,
        };
      }

      return updatedData;
    });
  };
  const blurHandler = (type, validate, event) => {
    if (type !== "Image") {
      const isValid = Validators(type, event.target.value, validate);
      setFeedData((prev) => {
        let updatedData = { ...prev };
        updatedData = {
          ...updatedData,
          [type]: {
            ...updatedData[type],
            isValid: isValid === null ? false : isValid,
          },
        };
        return updatedData;
      });
    }
  };

  const updateHandler = () => {
    if (userData !== null) {
      if (feedData?.Title.value !== "" && feedData?.Content.value !== "") {
        let data = {
          name: userData?.displayName,
          profile: userData?.photoURL,
          userId: userData?.uid,
          feed: {
            title: feedData.Title.value,
            category: feedData.Category.value,
            content: feedData.Content.value,
          },
        };
        if (textdata === "Add") {
          data = {
            ...data,
            date: "Created At " + new Date().getTime(),
          };
          dispatch(actions.addFeed(data, props.close));
        } else {
          data = {
            ...data,
            date: "Edited At " + new Date().getTime(),
          };
          dispatch(
            actions.updateFeed(single_feed_record?.key, data, props.close)
          );
        }
      }
    } else {
      dispatch(
        AuthActions.signInFailed("Please Login, before editing the feed!")
      );
    }
  };

  let EmployeeForm = [];
  for (let element in feedData) {
    EmployeeForm.push({
      formElements: feedData[element],
    });
  }

  return (
    <div>
      {props.click && (
        <Backdrop>
          <Modal clickHandler={props.close}>
            {loading ? (
              <Spinner />
            ) : (
              <div className={ClassName.Update_Employee_Boundary}>
                <h2>{textdata} FEED</h2>
                {EmployeeForm?.map((element) => {
                  return (
                    <div
                      className={ClassName.Employee_Data_Field}
                      key={element.formElements.name}
                    >
                      <label
                        htmlFor={element.formElements.name}
                        className={ClassName.LabelText}
                      >
                        {element.formElements.name}:
                        {element.formElements.name === "Title" && (
                          <span className={ClassName.warn}>
                            (Max length: 50)
                          </span>
                        )}
                        {element.formElements.name === "Content" && (
                          <span className={ClassName.warn}>
                            (Max length: 300)
                          </span>
                        )}
                      </label>
                      <FormControl
                        type={element.formElements.type}
                        fieldType={element.formElements.fieldType}
                        name={element.formElements.name}
                        addedStyle={true}
                        changeHandler={changeHandler.bind(
                          this,
                          element.formElements.name
                        )}
                        blurHandler={blurHandler.bind(
                          this,
                          element.formElements.name,
                          element.formElements.validate
                        )}
                        errorClass={
                          !element.formElements.isValid ||
                          errorsDashboard[element.formElements.name]
                        }
                        value={element.formElements.value}
                        elementConfig={element.formElements.elementConfig}
                      />
                      {element.formElements.name === "Image" &&
                        element.formElements.fileURL !== "" && (
                          <div className={ClassName.image_container}>
                            <img
                              className={ClassName.image_preview}
                              src={element.formElements.fileURL}
                              alt={element.formElements.name}
                            />
                          </div>
                        )}
                      {(!element.formElements.isValid ||
                        errorsDashboard[element.formElements.name]) && (
                        <p className={ClassName.ErrorText}>
                          Please Enter a valid {element.formElements.name}
                        </p>
                      )}
                    </div>
                  );
                })}
                <div className={ClassName.Buttons}>
                  <Button design="updatefeed" onClick={updateHandler}>
                    {textdata}
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        </Backdrop>
      )}
    </div>
  );
};
