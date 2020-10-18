import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import ContactDetails from "../ContactDetails/ContactDatails";
import ContactListItem from "../ContactListItem/ContactListItem";

import styles from "./ContactList.module.css";
import listItemAmimate from "../../utils/animations/listItem.module.css";

export default class ContactList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    removeItem: PropTypes.func.isRequired,
  };

  state = {
    contact: null,
  };

  handleOpenContactDetails = (contact, e) => {
    if (e.target.dataset.action === "remove") return;
    this.setState({ contact });
  };

  handleCloseContactDetails = () => {
    this.setState({ contact: null });
  };

  handleChangeContactDetails = (step) => {
    const { list } = this.props;
    const currentIdx = list.indexOf(this.state.contact);
    const nextIdx =
      Number(step) > 0
        ? currentIdx === list.length - 1
          ? 0
          : currentIdx + 1
        : currentIdx === 0
        ? list.length - 1
        : currentIdx - 1;
    this.setState({ contact: list[nextIdx] });
  };

  render() {
    const { list, removeItem } = this.props;
    const { contact } = this.state;
    return (
      <>
        {list.length === 0 ? (
          <p className={styles.noList}>There are no contacts</p>
        ) : (
          <TransitionGroup component="ul" className={styles.list}>
            {list.map((item) => {
              const { name, number } = item;
              return (
                <CSSTransition
                  timeout={250}
                  key={item.id}
                  classNames={listItemAmimate}
                  unmountOnExit
                >
                  <li
                    className={styles.item}
                    onClick={(e) => this.handleOpenContactDetails(item, e)}
                  >
                    <ContactListItem
                      id={item.id}
                      name={name}
                      number={number}
                      removeItem={removeItem}
                    />
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        )}
        {contact && (
          <ContactDetails
            contact={contact}
            onCloseContactDetails={this.handleCloseContactDetails}
            onChangeContactDetails={this.handleChangeContactDetails}
          />
        )}
      </>
    );
  }
}
