import React from 'react';
import className from './Modal.module.css';
import { MdCancel } from "react-icons/md";

export const Modal=(props)=>{
    return(
        <div className={className.Modal} style={props.style}>
            <div className={className.Icon}>
                  <MdCancel
                    onClick={props.clickHandler}
                    className={className.cancel}
                  />
                </div>
            {props.children}
        </div>
    )
}