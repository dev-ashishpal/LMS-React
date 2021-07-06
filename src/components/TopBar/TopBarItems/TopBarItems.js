import React from "react";
import TopBarItem from "./TopBarItem/TopBarItem";
import Logo from "../../Logo/Logo";
import Avatar from "../../Avatar/Avatar";
import MenuIcon from "../../Icons/MenuIcon/MenuIcon";

const topBarItems = () => {
  return (
    <React.Fragment>
      <TopBarItem>
        <Logo />
      </TopBarItem>
      <TopBarItem>
        {/* <NotificationIcon /> */}
      </TopBarItem>
      <TopBarItem>
        <Avatar />
      </TopBarItem>
      <TopBarItem>
        <MenuIcon />
      </TopBarItem>
    </React.Fragment>
  );
};
export default topBarItems;
