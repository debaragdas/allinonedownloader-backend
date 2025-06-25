FROM node:18-slim

RUN apt update && apt install -y curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod +x /usr/local/bin/yt-dlp

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]
