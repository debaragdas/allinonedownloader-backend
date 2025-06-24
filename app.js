const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  let apiUrl = '', host = '';
  if (url.includes('youtu')) {
    apiUrl = 'https://youtube-video-playlist-downloader.p.rapidapi.com/video';
    host = 'youtube-video-playlist-downloader.p.rapidapi.com';
  } else {
    apiUrl = 'https://socialscrapper.p.rapidapi.com/instagram-reels';
    host = 'socialscrapper.p.rapidapi.com';
  }

  try {
    const resp = await axios.get(apiUrl, {
      params: { url },
      headers: {
        'X-RapidAPI-Key': '724d5be177msh828fd729dc94243p1400bdjsn515513776b76',
        'X-RapidAPI-Host': host
      }
    });
    const data = resp.data;

    if (url.includes('youtu')) {
      return res.json({
        title: data.title,
        thumbnail: data.thumbnail,
        formats: data.formats // array of {quality, url}
      });
    } else {
      // Instagram response contains video link
      return res.json({
        title: data.owner.username,
        thumbnail: data.thumbnail,
        hd: data.video_hd,
        sd: data.video_sd || data.video_hd
      });
    }
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: 'Failed to fetch video' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));
