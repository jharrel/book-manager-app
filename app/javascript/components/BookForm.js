import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { Link } from 'react-router-dom';
import { formatDate, isEmptyObject, validateBook } from '../helpers/helpers';
import BookNotFound from './BookNotFound';
import 'pikaday/css/pikaday.css';

class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        book: props.book,
        errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateBook('release_date', formattedDate);
        },
    });
  }

  componentWillReceiveProps({ book }) {
    this.setState({ book });
  }

  updateBook(key, value) {
    this.setState(prevState => ({
      book: {
        ...prevState.book,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { book } = this.state;
    const errors = validateBook(book);

    if (!this.isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
        const { onSubmit } = this.props;
        onSubmit(book)
      console.log(book);
    }
  }

  validateBook(book) {
    const errors = {};

    if (book.book_type === '') {
      errors.book_type = 'You must enter the books genre';
    }

    if (book.release_date === '') {
      errors.release_date = 'You must enter a valid date';
    }

    if (book.title === '') {
      errors.title = 'You must enter a title';
    }

    if (book.author === '') {
      errors.author = 'You must enter at least one author';
    }

    if (book.publisher === '') {
      errors.publisher = 'You must enter at least one publisher';
    }

    console.log(book);
    return errors;
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  handleInputChange(book) {
    const { target } = book;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateBook(name, value);

    this.setState(prevState => ({
      book: {
        ...prevState.book,
        [name]: value,
      },
    }));
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the book from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { book } = this.state;
    const { path } = this.props;

    if (!book.id && path === '/books/:id/edit') return <BookNotFound />

    const cancelURL = book.id ? `/books/${book.id}` : '/books';
    const title = book.id ? `${book.release_date} - ${book.book_type}` : 'New Book';

    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="bookForm" onSubmit={this.handleSubmit}>
        <div>
            <label htmlFor="book_type">
              <strong>Genre:</strong>
              <input
                type="text"
                id="book_type"
                name="book_type"
                onChange={this.handleInputChange}
                value={book.book_type}
              />
            </label>
          </div>
          <div>
            <label htmlFor="release_date">
              <strong>Release Date:</strong>
              <input
                type="date"
                id="release_date"
                name="release_date"
                ref={this.dateImput}
                autoComplete="off"
                value={book.release_date}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <textarea
                cols="30"
                rows="3"
                id="title"
                name="title"
                onChange={this.handleInputChange}
                value={book.title}
              />
            </label>
          </div>
          <div>
            <label htmlFor="author">
              <strong>Author:</strong>
              <input type="text"
                id="author"
                name="author"
                onChange={this.handleInputChange}
                value={book.author}
              />
            </label>
          </div>
          <div>
            <label htmlFor="publisher">
              <strong>Publisher:</strong>
              <input type="text"
                id="publisher"
                name="publisher"
                onChange={this.handleInputChange}
                value={book.publisher}
                />
            </label>
          </div>
          <div>
            <label htmlFor="book_image">
              <strong>Book Image:</strong>
              <input type="text"
                id="book_image"
                name="book_image"
                onChange={this.handleInputChange}
                value={book.book_image}
              />
            </label>
          </div>
          
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

BookForm.propTypes = {
    book: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
};

BookForm.propTypes = {
    book: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
  };
  
  BookForm.defaultProps = {
    book: {
      book_type: '',
      release_date: '',
      title: '',
      author: '',
      publisher: '',
      book_image: '',
      read: false,
    },
  };

export default BookForm;
