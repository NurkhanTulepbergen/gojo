import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/items/itemsSlice";

import AnimeList from "../components/AnimeList";
import "../components/AnimeList.css";

export default function Favorites() {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.items.favorites);

    return (
        <div className="favorites-page">
            <h1>❤️ Your Favorites</h1>

            {favorites.length > 0 ? (
                <AnimeList
                    animeList={favorites}
                    favorites={favorites}
                    toggleFavorite={(anime) => dispatch(toggleFavorite(anime))}
                />
            ) : (
                <p>No favorites yet!</p>
            )}
        </div>
    );
}
