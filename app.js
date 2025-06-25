const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const response = await axios.get('https://yt-downloader13.p.rapidapi.com/yt/download', {
      params: { url },
      headers: {
        'X-RapidAPI-Key': '724d5be177msh828fd729dc94243p1400bdjsn515513776b76',
        'X-RapidAPI-Host': 'yt-downloader13.p.rapidapi.com'
      }
    });

    res.json({
      title: response.data.title,
      thumbnail: response.data.thumbnail,
      links: response.data.links
    });

  } catch (error) {
    console.error("❌ RapidAPI error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch video', details: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🚀 Server running on port', PORT));
