import React, { useEffect, useState } from "react";
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Search from './Search';
import Sort from './Sort';
import BookList from './BookList';

function App() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('author');

    useEffect(() => {
        fetch('http://localhost:3000/books')
            .then((response) => {
                if (!response.ok) {
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

    const sortBooks = (books, option) => {
        return books.sort((a, b) => {
            const firstValue = option === 'title' ? a.title : option === 'genre' ? a.genre : a.author;
            const secondValue = option === 'title' ? b.title : option === 'genre' ? b.genre : b.author;
            return firstValue.localeCompare(secondValue);
        });
    };

    return (
        <div className="container-fluid library">
            <h1 className="h1 p-4 d-flex justify-content-center library__title">Book Library</h1>

            <div className="row">
                <div className="col-12 col-md-12 mb-3">
                    <Search
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        setFilteredBooks={setFilteredBooks}
                        books={books}
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <Sort
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        setFilteredBooks={setFilteredBooks}
                        books={books}
                    />
                </div>
            </div>

            <BookList filteredBooks={filteredBooks} searchQuery={searchQuery} />
        </div>
    );
}

export default App;
