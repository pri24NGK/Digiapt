import React, { useState } from "react";
import Classes from "./Menu.module.css";

export const Menu = (props) => {
  const [open, setOpen] = useState(false);

  if (props.userData !== null) {
    return (
      <div className={Classes.menu}>
        <span
          className={Classes.menu_title}
          onClick={() => {
            setOpen((open) => !open);
            props.clickHandler("");
          }}
        >
          {props.title}
        </span>
        {open && (
          <div className={Classes.menu_container}>
            {props.data?.length > 0 &&
              props.data.map((item) => {
                return (
                  <div
                    className={Classes.menu_item_container}
                    onClick={() => {
                      setOpen((open) => !open);
                      props.clickHandler(item.name);
                    }}
                  >
                    {props.chooseIcon(item.name, props.userData)}
                    <p className={Classes.menu_item} key={item.id}>
                      {item.name}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
  return <></>;
};
