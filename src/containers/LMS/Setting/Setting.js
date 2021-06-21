import React from "react";
import classes from "./Setting.module.css";
import whiteTheme from "../../../assets/images/theme-white.png";
import blackTheme from "../../../assets/images/theme-black.png";
import greenTheme from "../../../assets/images/theme-green.png";
import blueTheme from "../../../assets/images/theme-blue.png";

const setting = () => {
  localStorage.setItem('URL',window.location.pathname);
  const changeThemeHandler = (theme) => {
    switch (theme) {
      case "white":
        console.log("white mode");
        document.body.classList.add("whiteMode");

        document.body.classList.remove("greenMode");
        document.body.classList.remove("blueMode");
        document.body.classList.remove("blackMode");

        localStorage.setItem("theme", "whiteMode");
        break;
      case "black":
        console.log("black mode");
        document.body.classList.add("blackMode");

        document.body.classList.remove("greenMode");
        document.body.classList.remove("blueMode");
        document.body.classList.remove("whiteMode");

        localStorage.setItem("theme", "blackMode");
        break;
      case "green":
        console.log("green mode");
        document.body.classList.add("greenMode");

        document.body.classList.remove("blackMode");
        document.body.classList.remove("blueMode");
        document.body.classList.remove("whiteMode");

        localStorage.setItem("theme", "greenMode");
        break;
      case "blue":
        console.log("blue mode");
        document.body.classList.add("blueMode");

        document.body.classList.remove("greenMode");
        document.body.classList.remove("blackMode");
        document.body.classList.remove("whiteMode");

        localStorage.setItem("theme", "blueMode");
        break;
      default:
        document.body.classList.add("whiteMode");
    }
  };
  return (
    <div className={classes.Setting}>
      <div className={classes.SettingBox}>
        <h1 className={classes.Heading}>customization</h1>
        <h3 className={classes.HeadingSub}>Theme</h3>
        <p className={classes.Paragraph}>
          Pick a theme and it will be saved even when you visit next time.
        </p>
        <div className={classes.ThemeContainer}>
          {/********  WHITE MODE ********/}
          <div className={classes.ThemeContainerBox}>
            <button
              onClick={() => {
                changeThemeHandler("white");
              }}
            >
              <img src={whiteTheme} alt="white-theme" />
            </button>
            <p>White Theme</p>
          </div>

          {/********  BLACK MODE ********/}
          <div className={classes.ThemeContainerBox}>
            <button
              onClick={() => {
                changeThemeHandler("black");
              }}
            >
              <img src={blackTheme} alt="white-theme" />
            </button>
            <p>Black Theme</p>
          </div>

          {/********  GREEN MODE ********/}
          <div className={classes.ThemeContainerBox}>
            <button
              onClick={() => {
                changeThemeHandler("green");
              }}
            >
              <img src={greenTheme} alt="white-theme" />
            </button>
            <p>Green Theme</p>
          </div>

          {/********  BLUE MODE ********/}
          <div className={classes.ThemeContainerBox}>
            <button
              onClick={() => {
                changeThemeHandler("blue");
              }}
            >
              <img src={blueTheme} alt="white-theme" />
            </button>
            <p>Blue Theme</p>
          </div>
        </div>
        <h1 className={classes.Heading}>Notification</h1>
        <div className={classes.NotificationContainer}>
          this is notification
        </div>
        <h1 className={classes.Heading}>Delete account</h1>
        <p className={classes.Paragraph}>
          By deleting your account all the data like messages, lectures and
          other information will be lost. Click on the Delete button if you want
          to completely remove your account
        </p>
        <div className={classes.DeleteBtn}>
          <button>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default setting;
