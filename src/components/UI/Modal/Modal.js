import React, {Fragment} from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
  render() {
    return this.props.show ? (
      <Fragment>
        <Backdrop clicked={this.props.clicked} show={this.props.show} />
        <div className={classes.Modal}>{this.props.children}</div>
      </Fragment>
    ) : null;
  }
}

export default Modal;
