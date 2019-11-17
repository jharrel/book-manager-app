import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookNotFound from './BookNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

const Book = ({ book, onDelete }) => {
  if (!book) return <BookNotFound />;

  return (

<div className="container">
    <div class="row">
        <div class="col">
        <ul>
            <li>
                <div>
                    <h1> {book.title} </h1>
                </div>
            </li>

            <li>
                <h3><strong>Type:</strong> {book.book_type} </h3>
            </li>

            <li>
                <h3><strong>Date:</strong> {book.release_date} </h3>
                    {' '}
                    
            </li>

            <li>
                <h3><strong>Author:</strong> {book.author}</h3>
            </li>

            <li>
                <h3><strong>Publisher:</strong> {book.publisher}</h3>
            </li>

            <li>
                <h3><strong>Read:</strong> {book.read ? 'yes' : 'no'} </h3>
            </li>
        </ul>
        </div>

        <div class="col">
            <h3><strong>Cover Image</strong></h3>
            <img src={book.book_image} className="card-img-top" alt={`${book.book_image} image`} />
        </div>
    </div>
        <div>
        <Link class="btn btn-lg btn-dark" to={`/books/${book.id}/edit`}>Edit</Link>
            {' - '}
        <button className="delete" class="btn btn-lg btn-danger" type="button" onClick={() => onDelete(book.id)}>
            Delete
        </button>
        </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Book.defaultProps = {
  book: undefined,
};

export default Book;
