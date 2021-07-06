import React from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./MenuIcon.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuDropdown from "../../UI/MenuDropdown/MenuDropdown";
import Logout from "../../Logout/Logout";
import { positionMenuDropdown } from "../../../util/menuDropdown";

class MenuIcon extends React.Component {
  constructor(props) {
    super(props);
    this.menuDropdownRef = React.createRef();
  }
  state = {
    showMenu: false,
    showLogout: false,
  };

  showDropdownHandler = (e) => {
    this.setState({ showMenu: true });
    positionMenuDropdown(e, this.menuDropdownRef);
  };

  closeDropdownHandler = () => {
    this.menuDropdownRef.current.style.display = "none";
    this.setState({ showMenu: false });
  };

  showLogoutHandler = () => {
    this.closeDropdownHandler();
    this.setState({ showLogout: true });
  };

  closeLogoutHandler = () => {
    this.setState({ showLogout: false });
  };
  render() {
    let url;
    if (this.props.teacherToken) {
      url = "/teacher/setting";
    } else if (this.props.studentToken) {
      url = "/student/setting";
    }
    return (
      <React.Fragment>
        <div className={classes.MenuIcon} onClick={this.showDropdownHandler}>
          <svg>
            <use href={sprite + "#icon-dots-three-vertical"}></use>
          </svg>
        </div>
        <MenuDropdown
          clicked={this.closeDropdownHandler}
          menuDropdownRef={this.menuDropdownRef}
          showMenu={this.state.showMenu}
        >
          <ul className={classes.MenuList}>
            <li
              className={classes.MenuItem}
              onClick={this.closeDropdownHandler}
            >
              <Link to={url}>
                <svg className={classes.Svg}>
                  <use href={sprite + "#icon-cog"}></use>
                </svg>
                <span>Setting</span>
              </Link>
            </li>
            <li className={classes.MenuItem} onClick={this.showLogoutHandler}>
              <button>
                <svg className={classes.Svg}>
                  <use href={sprite + "#icon-logout"}></use>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </MenuDropdown>
        <Logout
          show={this.state.showLogout}
          clicked={this.closeLogoutHandler}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};
export default connect(mapStateToProps)(MenuIcon);
