import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
    render() {
        return (
            this.props.show ?
            <React.Fragment>
            <Backdrop clicked={this.props.clicked} show={this.props.show} />
            <div className={classes.Modal}>
                {this.props.children}
            </div>
            </React.Fragment> : null
        );
    }
}

export default Modal;


