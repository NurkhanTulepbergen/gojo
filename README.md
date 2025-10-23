# 🎌 Anime Finder

**Anime Finder** — это современное React-приложение для поиска и просмотра аниме.  
Позволяет искать тайтлы, добавлять любимые в избранное ❤️ и возвращаться к ним позже.  
Данные берутся с [Jikan API](https://docs.api.jikan.moe/) — неофициального API MyAnimeList.

---

## 🚀 Возможности

- 🔍 Поиск аниме по названию  
- 🌟 Загрузка списка топ-аниме при запуске  
- ❌ Кнопка очистки ✖, которая возвращает все аниме  
- ❤️ Добавление и удаление тайтлов в избранное  
- 🔄 Переключение между *All Anime* и *Favorites*  
- 💾 Сохранение избранного в `localStorage`  
- 🎨 Современный адаптивный дизайн с hover-эффектами  

---

## 🧩 Технологии

- ⚛️ **React 18**
- 💅 **CSS3 (кастомный адаптивный дизайн)**
- 🌐 **Fetch API** — для запросов к [Jikan API](https://api.jikan.moe/v4)
- 🧠 **React Hooks:** `useState`, `useEffect`
- 💾 **LocalStorage** — для сохранения избранного

---

## 🗂️ Структура проекта

src/
├── App.jsx
├── App.css
├── components/
│ ├── AnimeList.jsx
│ ├── AnimeList.css
│ ├── AnimeCard.jsx
│ ├── AnimeCard.css
│ ├── SearchBar.jsx
│ └── SearchBar.css


---

## ⚙️ Установка и запуск

### 1️⃣ Клонировать репозиторий
```bash
git clone https://github.com/yourusername/anime-finder.git
cd anime-finder

2️⃣ Установить зависимости
npm install

3️⃣ Запустить проект
Если используешь Vite:
npm run dev
Если проект создан через create-react-app
npm start

после запуска в браузере
http://localhost:5173

💡 Основная логика
🔍 Получение аниме с API
const fetchAnime = async (query = "") => {
  const url = query
    ? `https://api.jikan.moe/v4/anime?q=${query}`
    : `https://api.jikan.moe/v4/top/anime`;
  const response = await fetch(url);
  const data = await response.json();
  setAnimeList(data.data);
};


#Добавление и удаление избранного
const toggleFavorite = (anime) => {
  const exists = favorites.some((fav) => fav.mal_id === anime.mal_id);
  if (exists) {
    setFavorites(favorites.filter((fav) => fav.mal_id !== anime.mal_id));
  } else {
    setFavorites([...favorites, anime]);
  }
};

💾 Сохранение избранного
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

🖼️ Интерфейс
🔹 Поиск и фильтрация аниме по названию
🔹 Кнопка ✖ очищает поиск и показывает топ-аниме
🔹 Кнопка ❤️ сохраняет тайтл в избранное
🔹 Переключатель между All Anime и Favorites
🔹 Ровные карточки в сетке с выравниванием по высоте

