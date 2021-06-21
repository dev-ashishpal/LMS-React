import React from "react";
import classes from "./SearchBar.module.css";
import sprite from "../../../assets/svg/sprite.svg";

const searchBar = (props) => (
  <section className={classes.SearchBar}>
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

export default searchBar;
