import React from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./NotificationIcon.module.css";
import MenuDropdown from "../../UI/MenuDropdown/MenuDropdown";
import { connect } from "react-redux";
import { positionMenuDropdown } from "../../../util/menuDropdown";
import NotificationItem from "./NotificationItem/NotificationItem";

class notificationIcon extends React.Component {
  constructor(props) {
    super(props);
    this.menuDropdownRef = React.createRef();
  }
  state = {
    showMenu: false,
    notification: [],
    // notification: this.props.notification,
  };

  componentDidMount() {}

  showDropdownHandler = (e) => {
    this.setState({ showMenu: true });
    positionMenuDropdown(e, this.menuDropdownRef);
  };

  closeDropdownHandler = () => {
    this.menuDropdownRef.current.style.display = "none";
    this.setState({ showMenu: false });
  };
  render() {
    // console.log(this.state.notification);
    let item;
    if (this.props.studentToken) {
      item = this.state.notification.map((notif, idx) => {
        return (
          <NotificationItem
            key={idx}
            className={classes.MenuItem}
            closeDropdownHandler={this.closeDropdownHandler}
          >
            {notif}
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
