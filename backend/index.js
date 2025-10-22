import express from "express";
import fetch from "node-fetch"; // npm i node-fetch
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "*", // or your frontend URL
}));
app.use(express.json());

// ✅ Serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// 🔹 OMDb Movie Search
app.get("/api/movies", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(
        q
      )}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// 🔹 OMDb Movie Details
app.get("/api/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=short`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// 🔹 MyAnimeList Search (Anime)
const MAL_CLIENT_ID = "8ebab248516b51f0d617a1ba85bccf64"; // replace with your MAL app client id
app.get("/api/anime", async (req, res) => {
  const { q, limit = 10 } = req.query;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await fetch(
      `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(
        q
      )}&limit=${limit}`,
      {
        headers: { "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch anime" });
  }
});

// 🔹 MyAnimeList Search (Manga)
app.get("/api/manga", async (req, res) => {
  const { q, limit = 10 } = req.query;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await fetch(
      `https://api.myanimelist.net/v2/manga?q=${encodeURIComponent(
        q
      )}&limit=${limit}`,
      {
        headers: { "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch manga" });
  }
});

// 🔹 Google Books API Search
app.get("/api/books", async (req, res) => {
  const { q, maxResults = 10 } = req.query;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        q
      )}&maxResults=${maxResults}`
    );

    const data = await response.json();
     res.json(data || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 🔹 RAWG API Search

app.get("/api/games", async (req, res) => {
  const { q, limit = 10 } = req.query;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(q)}&page_size=${limit}`
    );
    const data = await response.json();
    // map to your required fields:
    res.json(data.results || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
