// Set your local timezone
const myTimezone = "Europe/Istanbul";

// Function to update your local time
function updateLocalTime() {
    const now = new Date();
    const options = {
        timeZone: myTimezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('timeZone').textContent = `${myTimezone}`;
    document.getElementById('timeDisplay').textContent = `${timeString}`;
}

// Update time every second
setInterval(updateLocalTime, 1000);

// Initialize
window.addEventListener('load', () => {
    updateLocalTime();
});