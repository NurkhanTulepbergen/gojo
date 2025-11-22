
const BASE_URL = "https://api.jikan.moe/v4";


export async function getAll(query = "") {
    try {
        const url = query
            ? `${BASE_URL}/anime?q=${encodeURIComponent(query)}`
            : `${BASE_URL}/top/anime`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();

        return data.data || [];
    } catch (err) {
        console.error("animeService.getAll error:", err);
        throw err;
    }
}


export async function getAnimeById(id) {
    try {
        const response = await fetch(`${BASE_URL}/anime/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error("animeService.getById error:", err);
        throw err;
    }
}
