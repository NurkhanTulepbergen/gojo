import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchItemById } from "../features/items/itemsSlice";
import "./AnimeDetails.css";

export default function AnimeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        selectedItem,
        loadingItem,
        errorItem
    } = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(fetchItemById(id));
    }, [dispatch, id]);

    if (loadingItem) return <p>Loading...</p>;
    if (errorItem) return <p>{errorItem}</p>;
    if (!selectedItem) return <p>Not found</p>;

    return (
        <div className="anime-details">
            <button onClick={() => navigate(-1)} className="back-btn">⬅ Back</button>
            <h2>{selectedItem.title}</h2>
            <img
                src={selectedItem.images.jpg.image_url}
                alt={selectedItem.title}
            />
            <p><strong>Type:</strong> {selectedItem.type}</p>
            <p><strong>Episodes:</strong> {selectedItem.episodes}</p>
            <p><strong>Rating:</strong> {selectedItem.score}</p>
            <p><strong>Year:</strong> {selectedItem.year}</p>
            <p><strong>Synopsis:</strong> {selectedItem.synopsis}</p>
        </div>
    );
}
