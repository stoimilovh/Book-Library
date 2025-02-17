import React from 'react';

function BookItem({ book, searchQuery }) {
    const highlightText = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} style={{ fontWeight: 'bold', color: 'red' }}>
          {part}
        </span>
                ) : (
                    part
                )
        );
    };

    return (
        <li className="book list-group-item">
            <div className="book__title">{highlightText(book.title, searchQuery)}</div>
            <div className="book__author">Author: {highlightText(book.author, searchQuery)}</div>
            <div className="book__genre">Genre: {highlightText(book.genre, searchQuery)}</div>
            <div className="book__rating">Rating: {highlightText(book.rating, searchQuery)}</div>
        </li>
    );
}

export default BookItem;
