import React from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./NotificationIcon.module.css";
import MenuDropdown from "../../UI/MenuDropdown/MenuDropdown";
import { positionMenuDropdown } from "../../../util/menuDropdown";

class notificationIcon extends React.Component {
  constructor(props) {
    super(props);
    this.menuDropdownRef = React.createRef();
  }
  state = {
    showMenu: false,
  };

  showDropdownHandler = (e) => {
    this.setState({ showMenu: true });
    positionMenuDropdown(e, this.menuDropdownRef);
  };

  closeDropdownHandler = () => {
    this.menuDropdownRef.current.style.display = "none";
    this.setState({ showMenu: false });
  };
  render() {
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
            <li
              className={classes.MenuItem}
              onClick={this.closeDropdownHandler}
            >
              Mathematics: Video lecture of Chapter-3 is uploaded, go checkout.
            </li>
            <li
              className={classes.MenuItem}
              onClick={this.closeDropdownHandler}
            >
              notification 2
            </li>
          </ul>
        </MenuDropdown>
      </React.Fragment>
    );
  }
}

export default notificationIcon;
