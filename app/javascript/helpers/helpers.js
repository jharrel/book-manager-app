import { error } from './notifications';

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateBook = (book) => {
  const errors = {};

  if (book.book_type === '') {
    errors.book_type = 'You must enter the book genre';
  }

  if (!isValidDate(book.release_date)) {
    errors.release_date = 'You must enter a valid date';
  }

  if (book.title === '') {
    errors.title = 'You must enter the book title';
  }

  if (book.author === '') {
    errors.author = 'You must enter a author';
  }

  if (book.publisher === '') {
    errors.publisher = 'You must enter publisher';
  }

  if (book.book_image === '') {
    errors.book_image = 'You must enter a link to the books cover';
  }

  return errors;
};

export const formatDate = (d) => {
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);
  const YYYY = d.getFullYear();
  
    return `${MM}-${DD}-${YYYY}`;
};

export const handleAjaxError = (err) => {
    error('Something wen wrong');
    console.warn(err);
};