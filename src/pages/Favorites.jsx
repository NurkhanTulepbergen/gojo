import React, { useState, useEffect } from "react";
import AnimeList from "../components/AnimeList";
import "../components/AnimeList.css";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    // функция удаления / добавления (работает как toggle)
    const toggleFavorite = (anime) => {
        const exists = favorites.some((fav) => fav.mal_id === anime.mal_id);
        let updated;
        if (exists) {
            updated = favorites.filter((fav) => fav.mal_id !== anime.mal_id);
        } else {
            updated = [...favorites, anime];
        }
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    return (
        <div className="favorites-page">
            <h1>❤️ Your Favorites</h1>
            {favorites.length > 0 ? (
                <AnimeList
                    animeList={favorites}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite} // ✅ теперь можно убирать лайк
                />
            ) : (
                <p>No favorites yet!</p>
            )}
        </div>
    );
}
