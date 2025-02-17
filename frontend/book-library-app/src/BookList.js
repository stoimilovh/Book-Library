import React from 'react';
import BookItem from './BookItem';
import './BookList.css';

function BookList({ filteredBooks, searchQuery }) {
    return (
        <div>
            {filteredBooks.length === 0 ? (
                <p className="library__no-results">No results found</p>
            ) : (
                <ul className="library__books list-group">
                    {filteredBooks.map((book) => (
                        <BookItem key={book.id} book={book} searchQuery={searchQuery} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookList;
