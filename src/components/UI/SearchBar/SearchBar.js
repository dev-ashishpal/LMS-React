import React from "react";
import classes from "./SearchBar.module.css";
import sprite from "../../../assets/svg/sprite.svg";
import PropTypes from "prop-types";

const searchBar = (props) => (
  <section className={classes.SearchBar}>
    <header className={classes.HiddenElement}>
      <h1>Search Bar</h1>
    </header>
    <form>
      <label htmlFor="lecture--search-bar" hidden>
        Search Bar for lectures
      </label>
      <input
        onChange={props.onChange}
        type="text"
        id="lecture--search-bar"
        placeholder="Search By Title"
        className={classes.SearchBarInput}
      />
      <button type="submit">
        <svg>
          <use href={sprite + "#icon-search"}></use>
        </svg>
      </button>
    </form>
  </section>
);

searchBar.propTypes = {
  onChange: PropTypes.func,
};

export default searchBar;
