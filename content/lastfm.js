// Replace with your Last.fm API key and username
const apiKey = '12018a50625c2c11a218c90597d65bf0'; // Your API key
const username = 'necobey_'; // Your Last.fm username

// API endpoint for recent tracks
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

// Function to calculate time difference
function getTimeAgo(timestamp) {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const secondsAgo = now - parseInt(timestamp, 10);
    const minutes = Math.floor(secondsAgo / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    return `${days} day${days === 1 ? '' : 's'} ago`;
}

// Fetch the data
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        const track = data.recenttracks.track[0];
        const trackName = track.name;
        const trackUrl = track.url;
        const artistName = track.artist['#text'];
        const albumName = track.album['#text'];
        const albumArt = track.image[3]['#text'];
        const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

        let displayText;
        if (isNowPlaying) {
            displayText = `Currently listening:`;
        } else {
            const timestamp = track.date.uts; // Unix timestamp in seconds
            const timeAgo = getTimeAgo(timestamp);
            displayText = `Last played:`;
            let playTime = timeAgo;
            document.getElementById('playedTime').textContent = playTime;
        }

        // Update the paragraph
        document.getElementById('scrobbleInfo').textContent = displayText;
        document.getElementById('songName').textContent = trackName;
        document.getElementById('songName').href = trackUrl;
        document.getElementById('artistName').textContent = artistName;
        document.getElementById('albumName').textContent = albumName;
        document.getElementById('lastfm').style.backgroundImage = `url(${albumArt})`;
    })
    .catch(error => {
        console.error('Error fetching scrobble data:', error);
        document.getElementById('playedTime').textContent = 'Failed to load scrobble data.';
    });