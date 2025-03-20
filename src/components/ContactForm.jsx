import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { Component } from 'react';

class ContactForm extends Component{
  state = {
    name: '',
    number: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.formclass}>
        <label className={styles.labelclass}>
          Name
          <input
            className={styles.inputclass}
            type="text"
            name="name"
            pattern="^[a-zA-Z]+((['\-\s][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Mara, Stella Artois, Bill Gates"
            required
            value={name}
            onChange={this.handleChange}
            placeholder='Ex: Jack Sparrow'
            autoComplete='name'
          />
        </label>
        <label className={styles.labelclass}>
          Number
          <input
            className={styles.inputclass}
            type="tel"
            name="number"
            pattern="^(\+?\d{1,4}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?[\d\s-]{7,14}$"
            title="Phone number must be digits and can contain spaces, dashes or parentheses"
            required
            value={number}
            onChange={this.handleChange}
            placeholder='Ex: 123-44-56'
            autoComplete='tel'
/>
        </label>
        <button type="submit" className={styles.buttonclass}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired
}

export default ContactForm;