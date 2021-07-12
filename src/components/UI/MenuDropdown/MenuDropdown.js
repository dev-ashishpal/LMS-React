import React, {Fragment} from "react";
import classes from "./MenuDropdown.module.css";

const menuDropdown = (props) => {
  return (
    <Fragment>
      {props.showMenu ? (
        <div onClick={props.clicked} className={classes.Backdrop}></div>
      ) : null}
      <div
        style={{
          position: "fixed",
          left: "unset",
          display: "none",
          width: `${props.width}`,
        }}
        className={classes.MenuDropdown}
        ref={props.menuDropdownRef}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default menuDropdown;
