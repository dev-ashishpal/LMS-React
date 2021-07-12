import React from "react";
import { connect } from "react-redux";
import classes from "../StreamLecture.module.css";
import { NavLink } from "react-router-dom";

const streamSidebar = (props) => {
  const { sideLecData, videoData, streamLink, localhost } = props;
  return (
    <aside className={classes.StreamSidebar}>
      <header className={classes.StreamSidebarHeader}>
        <h1>Similar Lectures</h1>
      </header>
      <main className={classes.StreamSidebarContainer}>
        <ul className={classes.StreamSidebarContainerList}>
          {sideLecData.map((data) => (
            <li
              key={data._id}
              className={
                data._id === videoData._id
                  ? classes.StreamSidebarContainerItem
                  : null
              }
            >
              <NavLink
                to={streamLink + "watch?v=" + data._id}
                className={classes.StreamSidebarContainerLink}
                activeClassName={classes.Active}
              >
                <figure className={classes.StreamSidebarContainerImg}>
                  <img
                    src={`http://${localhost}:8080/` + data.image}
                    alt="lecture"
                  />
                </figure>
                <div className={classes.StreamSidebarBox}>
                  <h4>{data.title}</h4>
                  <span>{data.name}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </main>
    </aside>
  );
};

const mapStateToProps = (state) => {
  return {
    sideLecData: state.videoLec.data,
  };
};
export default connect(mapStateToProps)(streamSidebar);
