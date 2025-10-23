import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import AnimeList from "./components/AnimeList";
import "./App.css";

export default function App() {
    const [animeList, setAnimeList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false);

    const fetchAnime = async (query = "") => {
        setLoading(true);
        setError("");
        try {
            const url = query
                ? `https://api.jikan.moe/v4/anime?q=${query}`
                : `https://api.jikan.moe/v4/top/anime`;
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data.data) && data.data.length > 0) {
                setAnimeList(data.data);
            } else {
                setAnimeList([]);
                setError("No results found.");
            }
        } catch (err) {
            console.error("Error fetching anime:", err);
            setError("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnime();
    }, []);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("favorites");
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (err) {
            console.warn("Failed to load favorites:", err);
        } finally {
            setIsFavoritesLoaded(true);
        }
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

    const displayedList = showFavorites ? favorites : animeList;

    return (
        <div className="app">
            <h1>🎌 Anime Finder</h1>

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                fetchAnime={fetchAnime}
            />

            <div className="view-buttons">
                <button
                    onClick={() => setShowFavorites(false)}
                    className={!showFavorites ? "active" : ""}
                >
                    🌟 All Anime
                </button>
                <button
                    onClick={() => setShowFavorites(true)}
                    className={showFavorites ? "active" : ""}
                >
                    ❤️ Favorites ({favorites.length})
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <AnimeList
                    animeList={displayedList}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            )}
        </div>
    );
}
