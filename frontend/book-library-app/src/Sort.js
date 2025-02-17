import React from 'react';
import './Sort.css';

function Sort({ sortOption, setSortOption, setFilteredBooks, books }) {
    const handleSortChange = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        const sortedBooks = books.sort((a, b) => {
            const firstValue =
                selectedSortOption === 'title' ? a.title : selectedSortOption === 'genre' ? a.genre : a.author;
            const secondValue =
                selectedSortOption === 'title' ? b.title : selectedSortOption === 'genre' ? b.genre : b.author;
            return firstValue.localeCompare(secondValue);
        });

        setFilteredBooks(sortedBooks);
    };

    return (
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
    );
}

export default Sort;
