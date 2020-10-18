import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ filter, onFilter }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onFilter}
        autoComplete="off"
        placeholder="Find contact by name"
        className={styles.input}
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func.isRequired,
};
