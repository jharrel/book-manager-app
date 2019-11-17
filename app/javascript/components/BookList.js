/* eslint-disable camelcase */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';



class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, title, author, publisher, published, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;

    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderBooks() {
    const { books } = this.props;
    const filteredBooks = books
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.title) - new Date(a.title));

    return filteredBooks.map(book => (
      

    <div class="card">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src={book.book_image}
            class="card-img-top"
            alt={`${book.book_image} image`}
          />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h1 class="card-title">Title:{book.title}</h1>
        <h4 class="card-title">Author: {book.author}</h4>
      </div>
      <div>
      <Link to={`/books/${book.id}`} type="button" class="btn btn-lg btn-info font-weight-bold text-light" >
        View Book
        </Link>
      </div>
    </div>
  </div>
</div>

      
      
    ));
  }

  render() {
    return (
    <section className="bookList">

    <div className="container py-5">
      <h1 className="display-4">Books for every occasion</h1>
        <p className="lead text-muted">
          We’ve pulled together our most popular books, our latest
          additions, and our editor’s picks, so there’s sure to be something
          tempting for you to read.
        </p>
    </div>          
        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />
          <div>
            <Link class="btn btn-lg btn-info text-light font-weight-bold" to="/books/new">New Book</Link>
          </div>
        <ul>{this.renderBooks()}</ul>
        </section>
      
    );
  }
}

BookList.propTypes = {
  activeId: PropTypes.number,
  books: PropTypes.arrayOf(PropTypes.object),
};

BookList.defaultProps = {
  activeId: undefined,
  books: [],
};

export default BookList;