import React from 'react';
import './Search.css';

function Search({ searchQuery, setSearchQuery, setFilteredBooks, books }) {
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = books.filter(
            (book) =>
                book.title.toLowerCase().includes(lowercasedQuery) ||
                book.author.toLowerCase().includes(lowercasedQuery) ||
                book.genre.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredBooks(filtered);
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search__input form-control"
            />
            <button onClick={handleSearch} className="search__button btn btn-primary mt-md-0 mt-2">
                Search
            </button>
        </div>
    );
}

export default Search;
