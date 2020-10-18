import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./PhonebookApp.module.css";
import titleAppAnimate from "./utils/animations/titleApp.module.css";
import filterAnimate from "./utils/animations/filter.module.css";
import messageAnimate from "./utils/animations/message.module.css";

import LOGS from "./utils/LOGS";
import LocalStorage from "./utils/localStorageAPI";

import ContactAddForm from "./components/ContactAddForm/ContactAddForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import Message from "./components/Message/Message";

const CONTACTS = "contacts";

export default class PhonebookApp extends React.Component {
  state = {
    contacts: [],
    filter: "",
    message: null,
  };

  componentDidMount() {
    this.setState({
      contacts: LocalStorage.get(CONTACTS),
    });
  }

  componentDidUpdate() {
    const oldContacts = JSON.stringify(LocalStorage.get(CONTACTS));
    const newContacts = JSON.stringify(this.state.contacts);

    if (oldContacts !== newContacts) {
      LocalStorage.set(CONTACTS, newContacts);
    }
  }

  addContact = (contact) => {
    if (!contact.name || !contact.number) {
      this.showMessage(LOGS.emptyData);
      return;
    }
    if (this.isPresent(contact)) {
      this.showMessage(contact.name + " " + LOGS.isPresent);
      return;
    }
    this.setState((state) => {
      return { contacts: [...state.contacts, contact] };
    });
  };

  showMessage = (message) =>
    this.setState((state) => (state.message ? null : { message }));

  hideMessage = () => setTimeout(() => this.setState({ message: null }), 1500);

  isPresent = (contact) => {
    const callback = (item) =>
      item.name.toLowerCase().includes(contact.name.toLowerCase());
    return this.state.contacts.some(callback);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  makeFilterList = () => {
    const totalList = this.state.contacts;
    const filter = this.state.filter;

    return totalList.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleRemoveListItem = (id) => {
    this.setState((state) => {
      return { contacts: state.contacts.filter((item) => item.id !== id) };
    });
  };

  render() {
    const { contacts, filter, message } = this.state;

    return (
      <div className={styles.container}>
        <CSSTransition
          in={!!message}
          timeout={250}
          classNames={messageAnimate}
          unmountOnExit
        >
          <Message message={message} onHideMessage={this.hideMessage} />
        </CSSTransition>

        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={titleAppAnimate}
        >
          <h1 className={styles["title-app"]}>Phonebook</h1>
        </CSSTransition>
        <ContactAddForm onSubmit={this.addContact} />

        <h2 className={styles.title}>Contacts</h2>
        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={filterAnimate}
          unmountOnExit
        >
          <Filter onFilter={this.handleChange} value={filter} />
        </CSSTransition>

        <ContactList
          list={this.makeFilterList()}
          removeItem={this.handleRemoveListItem}
          onContactDetails={this.handleContactDetails}
        />
      </div>
    );
  }
}
