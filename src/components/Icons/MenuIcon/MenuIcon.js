import React from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./MenuIcon.module.css";
import { Link } from "react-router-dom";
import MenuDropdown from "../../UI/MenuDropdown/MenuDropdown";
import Logout from "../../Logout/Logout";
import {positionMenuDropdown} from "../../../util/menuDropdown";

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
              <Link to="/teacher/setting">Setting</Link>
            </li>
            <li className={classes.MenuItem} onClick={this.showLogoutHandler}>
              <button>Logout</button>
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

export default MenuIcon;
