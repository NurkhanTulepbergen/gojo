import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, getAnimeById } from "../../services/animeService";

// 🔹 Загрузка списка аниме
export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async (query, thunkAPI) => {
        try {
            return await getAll(query);
        } catch (e) {
            return thunkAPI.rejectWithValue("Error loading anime list");
        }
    }
);

// 🔹 Загрузка одного аниме по id
export const fetchItemById = createAsyncThunk(
    "items/fetchItemById",
    async (id, thunkAPI) => {
        try {
            return await getAnimeById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue("Error loading anime details");
        }
    }
);

// ⭐ загрузка избранного из localStorage
const loadFavorites = () => {
    try {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const initialState = {
    list: [],
    selectedItem: null,

    loadingList: false,
    loadingItem: false,

    errorList: null,
    errorItem: null,

    query: "",

    // ⭐ favorites теперь в Redux
    favorites: loadFavorites()
};

const itemsSlice = createSlice({
    name: "items",
    initialState,

    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },

        // ⭐ toggleFavorite в Redux
        toggleFavorite(state, action) {
            const anime = action.payload;

            const exists = state.favorites.some(
                (fav) => fav.mal_id === anime.mal_id
            );

            if (exists) {
                state.favorites = state.favorites.filter(
                    (fav) => fav.mal_id !== anime.mal_id
                );
            } else {
                state.favorites.push(anime);
            }

            // 💾 сразу сохраняем в localStorage
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        }
    },

    extraReducers: (builder) => {
        builder
            // 📥 список
            .addCase(fetchItems.pending, (state) => {
                state.loadingList = true;
                state.errorList = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loadingList = false;
                state.list = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload;
            })

            // 📥 элемент
            .addCase(fetchItemById.pending, (state) => {
                state.loadingItem = true;
                state.errorItem = null;
                state.selectedItem = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loadingItem = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loadingItem = false;
                state.errorItem = action.payload;
            });
    },
});

export const { setQuery, toggleFavorite } = itemsSlice.actions;
export default itemsSlice.reducer;
