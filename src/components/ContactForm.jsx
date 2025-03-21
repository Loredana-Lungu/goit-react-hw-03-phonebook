import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    error: '',
  };

  componentDidMount() {
    const savedName = localStorage.getItem('name');

    console.log(
      'DidMount *** Contact form - Content from local storage: ',
      savedName
    );

    if (savedName) {
      this.setState({ name: JSON.parse(savedName) });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.name !== prevState.name) {
      localStorage.setItem('name', JSON.stringify(this.state.name));
      console.log(
        'DidUpdate *** Contact form - Content from local storage: ',
        localStorage.contacts
      );
    }
  }

  componentWillUnmount() {
    console.log('WillUnmount - Contact form - Saving name to local storage');
    localStorage.setItem('name', JSON.stringify(this.state.name));
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;

    const nameRegex = /^[a-zA-Z]+((['\-\s][a-zA-Z ])?[a-zA-Z]*)*$/;
    const phoneRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;


    if (!nameRegex.test(name)) {
      this.setState({ error: 'The name may only contain letters, apostrophe, dash and spaces.' });
      return;
    }

    if (!phoneRegex.test(number)) {
      this.setState({ error: 'The phone number is not in the right format.' });
      return;
    }

    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '', error: '' });
  };

  render() {
    const { name, number, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.formclass}>
        <label className={styles.labelclass}>
          Name
          <input
            className={styles.inputclass}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Mara, Stella Artois, Bill Gates"
            required
            value={name}
            onChange={this.handleChange}
            placeholder="Ex: Jack Sparrow"
            autoComplete="name"
          />
        </label>
        <label className={styles.labelclass}>
          Number
          <input
            className={styles.inputclass}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes or parentheses."
            required
            value={number}
            onChange={this.handleChange}
            placeholder="Ex: 123-44-56"
            autoComplete="tel"
          />
        </label>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.buttonclass}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;
