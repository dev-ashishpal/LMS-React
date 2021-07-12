import React from "react";
import classes from "./Card.module.css";
import img from "../../assets/images/user-300.png";
import { userAgent } from "../../util/userAgent";

const card = (props) => {
  const frontSideClass = [classes.CardSide, classes.CardSideFront];
  const backSideClass = [classes.CardSide, classes.CardSideBack];
  let localhost = "localhost";
  if (userAgent()) {
    localhost = "192.168.43.135";
  }
  return (
    <div className={classes.Card}>
      <div className={frontSideClass.join(" ")}>
        <div className={classes.CardPictureContainer}>
          <div
            style={
              props.img
                ? {
                    backgroundImage: `url("http://${localhost}:8080/${props.img.replaceAll(
                      "\\",
                      "/"
                    )}")`,
                  }
                : { backgroundImage: `url(${img})` }
            }
            className={classes.CardPicture}
          >
            &nbsp;
          </div>
          <div className={classes.CardPictureOverlay}>&nbsp;</div>
        </div>
        <h1 className={classes.CardHeading}>
          <span className={classes.CardHeadingSpan}>{props.name}</span>
        </h1>
        <div className={classes.CardPara}>
          <p className={classes.Roll}>Roll</p>
          <h2 className={classes.RollValue}>{props.roll}</h2>
        </div>
      </div>
      <div className={backSideClass.join(" ")}>
        <div className={classes.CardCta}>
          <div className={classes.CardPriceBox}>
            <div className={classes.CardDetail}>
              <ul>
                <li>
                  <a
                    className={
                      props.email
                        ? props.email.trim()
                          ? classes.ActiveColor
                          : classes.UnActiveColor
                        : classes.UnActiveColor
                    }
                    rel="noreferrer noopener"
                    href={"mailto:" + props.email}
                    target="_blank"
                  >
                    E-Mail
                  </a>
                </li>
                <li>
                  <a
                    className={
                      props.github
                        ? props.github.trim()
                          ? classes.ActiveColor
                          : classes.UnActiveColor
                        : classes.UnActiveColor
                    }
                    rel="noreferrer noopener"
                    href={props.github}
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    className={
                      props.linkedin
                        ? props.linkedin.trim()
                          ? classes.ActiveColor
                          : classes.UnActiveColor
                        : classes.UnActiveColor
                    }
                    rel="noreferrer noopener"
                    href={props.linkedin}
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className={
                      props.portfolio
                        ? props.portfolio.trim()
                          ? classes.ActiveColor
                          : classes.UnActiveColor
                        : classes.UnActiveColor
                    }
                    rel="noreferrer noopener"
                    href={props.portfolio}
                    target="_blank"
                  >
                    Personal Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default card;
