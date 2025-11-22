import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import { fetchItems } from "../features/items/itemsSlice";

import "../components/AnimeList.css";

export default function AnimeListPage() {
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();

    const query = params.get("q") || "";

    const {
        list,
        loadingList,
        errorList,
        favorites
    } = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(fetchItems(query));
    }, [dispatch, query]);

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.search?.value || query;
        setParams({ q: value });
    };

    return (
        <div className="app">
            <SearchBar
                searchTerm={query}
                setSearchTerm={(v) => setParams({ q: v })}
                handleSearch={handleSearch}
            />

            {loadingList && <p>Loading...</p>}
            {errorList && <p className="error">{errorList}</p>}

            {!loadingList && !errorList && (
                <AnimeList
                    animeList={list}
                    favorites={favorites}
                />
            )}
        </div>
    );
}
