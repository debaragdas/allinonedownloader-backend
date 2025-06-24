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
    const videoId = getVideoId(url);
    if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

    const response = await axios.get('https://youtube-media-downloader.p.rapidapi.com/v2/video/details', {
      params: { videoId },
      headers: {
        'X-RapidAPI-Key': '724d5be177msh828fd729dc94243p1400bdjsn515513776b76',
        'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
      }
    });

    const data = response.data;
    res.json({
      title: data.title,
      thumbnail: data.thumbnail,
      hd: data.video.url
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

function getVideoId(url) {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:&|$)/);
  return match ? match[1] : '';
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running...');
});
