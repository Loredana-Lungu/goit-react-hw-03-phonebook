import {Component} from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './ContactForm.module.css';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Billy Raw', number: '567-11-00' },
      { id: 'id-2', name: 'Mara Too', number: '746-92-10' },
      { id: 'id-3', name: 'Gaga Style', number: '654-02-45' },
      { id: 'id-4', name: 'Michael Freakson', number: '321-09-65' },
    ],
    filter: '',
  };

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const lowerContactName = name.toLowerCase();

    if (
      contacts.some(contact => contact.name.toLowerCase() === lowerContactName)
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(ante => ({
        contacts: [...ante.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = (id) => {
    this.setState(ante => ({
      contacts: ante.contacts.filter(contact => contact.id !== id)
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterLower = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLower)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;
