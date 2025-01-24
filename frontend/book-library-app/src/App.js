import React, { useEffect, useState } from "react";
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App(){
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('author');

    useEffect(()=> {
        fetch('http://localhost:3000/books')
            .then((response) => {
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const sortedBooks = sortBooks(data, 'author');
                setBooks(sortedBooks);
                setFilteredBooks(sortedBooks);
            })
            .catch((error) => console.error('Error fetching books:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const highlightText = (text, query) => {
        if(!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} style={{fontWeight: 'bold', color: 'red'}}>
                        {part}
                    </span>
                ) : (
                    part
                )
            );
    };

    const handleSearch = () => {
        const lowercasedQuerry = searchQuery.toLowerCase();
        const filtered = books.filter(
            (books) =>
                books.title.toLowerCase().includes(lowercasedQuerry) ||
                books.author.toLowerCase().includes(lowercasedQuerry) ||
                books.genre.toLowerCase().includes(lowercasedQuerry)
        );
        setFilteredBooks(filtered);
    };

    const handleSortChange = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        const sortedBooks = sortBooks(books, selectedSortOption);
        setFilteredBooks(sortedBooks);
    };

    const sortBooks = (books, option) => {
        return books.sort((a,b) => {
            const firstValue = option ==='title' ? a.title : option === 'genre' ? a.genre : a.author;
            const secondValue = option ==='title' ? b.title : option === 'genre' ? b.genre : b.author;
            return firstValue.localeCompare(secondValue);
        });
    };

    return (
        <div className="container-fluid library">
            <h1 className="h1 p-4 d-flex justify-content-center library__title">Book Library</h1>

            <div className="row">
                <div className="col-12 col-md-12 mb-3">
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
                </div>

                <div className="col-12 col-md-6 mb-3">
                    <div className="sort">
                        <label htmlFor="sort-select" className="sort__label">Sort By: </label>
                        <select
                            id="sort-select"
                            value={sortOption}
                            onChange={handleSortChange}
                            className="sort__select form-select"
                        >
                            <option value="author">Author (Alphabetical)</option>
                            <option value="title">Title (Alphabetical)</option>
                            <option value="genre">Genre (Alphabetical)</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredBooks.length === 0 ? (
                <p className="library__no-results">No results found</p>
            ) : (
                <ul className="library__books list-group">
                    {filteredBooks.map((book) => (
                        <li key={book.id} className="book list-group-item">
                            <div className="book__title">{highlightText(book.title, searchQuery)}</div>
                            <div className="book__author">Author: {highlightText(book.author, searchQuery)}</div>
                            <div className="book__genre">Genre: {highlightText(book.genre, searchQuery)}</div>
                            <div className="book__rating">Rating: {highlightText(book.rating, searchQuery)}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;


