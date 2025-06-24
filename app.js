const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/download', (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).json({ error: 'No URL provided' });

  exec(`yt-dlp -g "${videoUrl}"`, (err, stdout) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch video' });

    const links = stdout.trim().split('\n');
    res.json({
      hd: links[0],
      sd: links[1] || links[0]
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
