import React from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./NotificationIcon.module.css";
import MenuDropdown from "../../UI/MenuDropdown/MenuDropdown";
import { connect } from "react-redux";
import { positionMenuDropdown } from "../../../util/menuDropdown";
import NotificationItem from "./NotificationItem/NotificationItem";
import openSocket from "socket.io-client";

class notificationIcon extends React.Component {
  constructor(props) {
    super(props);
    this.menuDropdownRef = React.createRef();
  }
  state = {
    showMenu: false,
    userData: {},
    // notification: this.props.notification,
  };

  componentDidMount() {
    const userData = { ...this.props.userData };
    // console.log('notification',userData);

    // const socket = openSocket("http://localhost:8080");
    // this.notif();
    // socket.on("notification", (data) => {
    //   console.log(data.notification);
    //   // console.log("outside");
    //   if (data.action === branch) {
    //     console.log(data.notification);
    //     // console.log("inside");
    //   }
    // });
  }

  notif = () => {
    // console.log(this.props.branch);
  }

  showDropdownHandler = (e) => {
    this.setState({ showMenu: true });
    positionMenuDropdown(e, this.menuDropdownRef);
  };

  closeDropdownHandler = () => {
    this.menuDropdownRef.current.style.display = "none";
    this.setState({ showMenu: false });
  };
  render() {
    const userData = { ...this.props.userData };
    // this.setState({userData});
    // console.log(this.props.notification.concat([{_id: 123213, message: 'piece of shit', branch: "IT Sem 4"}]));
    // console.log("render", branch);
    // const notification = this.state.notification;
    // console.log(notification);
    // console.log('notif',this.props.studentToken);
    let item;
    if (this.props.studentToken) {
      item = this.props.notification.map((notif) => {
        // console.log(notif);
        return (
          <NotificationItem
            key={notif._id}
            className={classes.MenuItem}
            closeDropdownHandler={this.closeDropdownHandler}
          >
            {notif.message}
          </NotificationItem>
        );
      });
    }

    return (
      <React.Fragment>
        <div
          className={classes.NotificationIcon}
          onClick={this.showDropdownHandler}
        >
          <svg>
            <use href={sprite + "#icon-notification"}></use>
          </svg>
        </div>
        <MenuDropdown
          clicked={this.closeDropdownHandler}
          menuDropdownRef={this.menuDropdownRef}
          showMenu={this.state.showMenu}
        >
          <ul className={classes.MenuList}>
            {item}
            {/* {this.props.studentToken ? notification.map(notif => (
              <NotificationItem
              className={classes.MenuItem}
              closeDropdownHandler={this.closeDropdownHandler}
            >
              this is notif.
            </NotificationItem>
            )) : null}
             */}
          </ul>
        </MenuDropdown>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentToken: state.auth.studentToken,
    notification: state.dashboard.notificationData,
    userData: state.profile.data,
  };
};

export default connect(mapStateToProps)(notificationIcon);
