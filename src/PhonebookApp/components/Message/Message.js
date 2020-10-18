import React from "react";
import PropTypes from "prop-types";

import styles from "./Message.module.css";

const Message = ({ message, onHideMessage }) => {
  onHideMessage();

  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.string,
  onHideMessage: PropTypes.func.isRequired,
};
