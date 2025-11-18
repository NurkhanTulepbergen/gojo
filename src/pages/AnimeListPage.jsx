import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import { getAll } from "../services/animeService";
import "../components/AnimeList.css";

export default function AnimeListPage() {
    const [params, setParams] = useSearchParams();
    const query = params.get("q") || "";

    const [animeList, setAnimeList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAnime = async (search = "") => {
        setLoading(true);
        setError("");

        try {
            const list = await getAll(search);
            setAnimeList(list);
        } catch (err) {
            setError("Error loading anime.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnime(query);
    }, [query]);

    // ⭐ загружаем избранное из localStorage
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    // ⭐ сохраняем избранное
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // ⭐ функция toggleFavorite (нельзя удалять)
    const toggleFavorite = (anime) => {
        const exists = favorites.some((fav) => fav.mal_id === anime.mal_id);

        if (exists) {
            setFavorites(favorites.filter((fav) => fav.mal_id !== anime.mal_id));
        } else {
            setFavorites([...favorites, anime]);
        }
    };

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
                fetchAnime={fetchAnime}
            />

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <AnimeList
                    animeList={animeList}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            )}
        </div>
    );
}
