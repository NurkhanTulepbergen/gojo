import React from "react";
import "./AnimeCard.css";

export default function AnimeCard({ anime, isFavorite, toggleFavorite }) {
    return (
        <div className="anime-card">
            <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="anime-image"
            />

            <div className="anime-info">
                <h3>{anime.title}</h3>
                <p>⭐ Score: {anime.score || "N/A"}</p>
            </div>

            <div className="card-footer">
                <a
                    href={anime.url}
                    target="_blank"
                    rel="noreferrer"
                    className="more-info"
                >
                    More info
                </a>

                <button
                    className={`like-button ${isFavorite ? "liked" : ""}`}
                    onClick={() => toggleFavorite(anime)}
                    aria-label="Add to favorites"
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>
        </div>
    );
}
