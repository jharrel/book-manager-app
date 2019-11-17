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

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
    const { activeId, books } = this.props;
    const filteredBooks = books
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

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








          <h2>
            Books 
          </h2>
          
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