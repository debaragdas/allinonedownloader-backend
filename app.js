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
    const response = await axios.get('https://all-media-downloader4.p.rapidapi.com/yt/v2.1.3/video.php', {
      params: { url },
      headers: {
        'X-RapidAPI-Key': '724d5be177msh828fd729dc94243p1400bdjsn515513776b76',
        'X-RapidAPI-Host': 'all-media-downloader4.p.rapidapi.com'
      }
    });

    res.json(response.data); // returns everything from API directly

  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
