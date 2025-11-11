import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import { getAll } from "../services/animeService"; // ✅ добавили импорт
import "../components/AnimeList.css";

export default function AnimeListPage() {
    const [animeList, setAnimeList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false);

    const fetchAnime = async (query = "") => {
        setLoading(true);
        setError("");
        try {
            const list = await getAll(query);
            if (list.length > 0) {
                setAnimeList(list);
            } else {
                setAnimeList([]);
                setError("No results found.");
            }
        } catch (err) {
            setError("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnime();
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
        setIsFavoritesLoaded(true);
    }, []);

    useEffect(() => {
        if (isFavoritesLoaded) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites, isFavoritesLoaded]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchAnime(searchTerm);
    };

    const toggleFavorite = (anime) => {
        const exists = favorites.some((fav) => fav.mal_id === anime.mal_id);
        if (exists) {
            setFavorites(favorites.filter((fav) => fav.mal_id !== anime.mal_id));
        } else {
            setFavorites([...favorites, anime]);
        }
    };

    return (
        <div className="app">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                fetchAnime={fetchAnime} // ✅ передаём в SearchBar
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
