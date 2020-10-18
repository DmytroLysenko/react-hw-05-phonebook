import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./ContactDetails.module.css";

import contactDetailsAnimationLeft from "../../utils/animations/contactDetailsMoveLeft.module.css";
import contactDetailsAnimationRight from "../../utils/animations/contactDetailsMoveRight.module.css";

export default class ContactDetails extends React.Component {
  static propTypes = {
    contact: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
    onCloseContactDetails: PropTypes.func.isRequired,
    onChangeContactDetails: PropTypes.func.isRequired,
  };

  state = {
    isMoveToRight: false,
  };
  componentDidMount() {
    const modal = document.querySelector("#contactDetails");
    modal.addEventListener("click", this.handleClickModale);
  }

  componentWillUnmount() {
    const modal = document.querySelector("#contactDetails");
    modal.removeEventListener("click", this.handleClickModale);
  }

  handleClickModale = (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const action = e.target.dataset.action;
    switch (action) {
      case "close":
        this.props.onCloseContactDetails();
        return;
      case "next":
        this.setState({ isMoveToRight: true });
        this.props.onChangeContactDetails(+1);

        return;
      case "prev":
        this.setState({ isMoveToRight: false });
        this.props.onChangeContactDetails(-1);
        return;
      default:
        return;
    }
  };

  render() {
    const { contact } = this.props;
    const { isMoveToRight } = this.state;
    console.log(contact);
    return (
      <div className={styles.overlay}>
        <div className={styles.container} id="contactDetails">
          <TransitionGroup className={styles.containerInner}>
            <CSSTransition
              key={contact.id}
              timeout={250}
              classNames={
                isMoveToRight
                  ? contactDetailsAnimationRight
                  : contactDetailsAnimationLeft
              }
            >
              <div className={styles.contact}>
                <p className={styles.avatar}></p>
                <p className={styles.name}>{contact.name}</p>
                <p className={styles.number}>{contact.number}</p>
              </div>
            </CSSTransition>
          </TransitionGroup>
          <button
            className={styles.btnNext}
            data-action="next"
            type="button"
          ></button>
          <button
            className={styles.btnPrev}
            data-action="prev"
            type="button"
          ></button>
          <button
            className={styles.btnClose}
            data-action="close"
            type="button"
          ></button>
        </div>
      </div>
    );
  }
}
