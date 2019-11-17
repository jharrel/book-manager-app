import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/books">Books Manager</Link>
      <Link to="/books/new">New Book</Link>
    </h1>
  </header>
);

export default Header;