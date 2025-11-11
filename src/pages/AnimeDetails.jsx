import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeById } from "../services/animeService";
import "./AnimeDetails.css";


export default function AnimeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAnimeById(id);
                setAnime(data);
            } catch (err) {
                setError("Failed to load anime details.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!anime) return <p>Not found</p>;

    return (
        <div className="anime-details">
            <button onClick={() => navigate(-1)} className="back-btn">⬅ Back</button>
            <h2>{anime.title}</h2>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <p><strong>Type:</strong> {anime.type}</p>
            <p><strong>Episodes:</strong> {anime.episodes}</p>
            <p><strong>Rating:</strong> {anime.score}</p>
            <p><strong>Year:</strong> {anime.year}</p>
            <p><strong>Synopsis:</strong> {anime.synopsis}</p>
        </div>
    );
}
