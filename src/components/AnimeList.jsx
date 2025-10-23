import React from "react";
import AnimeCard from "./AnimeCard";
import "./AnimeList.css";

export default function AnimeList({ animeList, favorites, toggleFavorite }) {
    return (
        <div className="anime-list-container">
            <ul className="anime-list">
                {animeList.map((anime) => (
                    <AnimeCard
                        key={anime.mal_id}
                        anime={anime}
                        isFavorite={favorites.some((fav) => fav.mal_id === anime.mal_id)}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </ul>
        </div>
    );
}

