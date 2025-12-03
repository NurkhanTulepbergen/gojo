import React from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchItems} from "../features/items/itemsSlice";


export default function SearchBar({ searchTerm, setSearchTerm, handleSearch, fetchAnime }) {
    const dispatch = useDispatch();
    const handleClear = () => {
        setSearchTerm("");
        dispatch(fetchItems(""))
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search for anime..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-button"
                        aria-label="Clear search"
                    >
                        ✖
                    </button>
                )}
                <button type="submit" className="search-button" aria-label="Search">
                    🔍
                </button>
            </div>
        </form>
    );
}
