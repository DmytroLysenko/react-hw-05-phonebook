import React from "react";
import PropTypes from "prop-types";

import styles from "./ContactListItem.module.css";

const ContactListItem = ({id, name, number, removeItem }) => (
  <>
    <span className={styles.name}>
      {name.length < 10 ? name : `${name.substring(0, 9)}...`}
    </span>
    <span className={styles.number}>
      {number.length < 14 ? number : `${number.substring(0, 13)}...`}
    </span>
    <span
      data-action="remove"
      className={styles.close}
      onClick={() => removeItem(id)}
    ></span>
  </>
);

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};
