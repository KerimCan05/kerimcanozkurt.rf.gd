const myTimezone = "Europe/Istanbul";

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

setInterval(updateLocalTime, 1000);

window.addEventListener('load', () => {
    updateLocalTime();
});