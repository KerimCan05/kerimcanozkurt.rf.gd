const spotify = ["https://open.spotify.com/embed/track/5sHH5I3r7SrH0oukzV6Otz?utm_source=generator&theme=0","https://open.spotify.com/embed/track/7snQQk1zcKl8gZ92AnueZW?utm_source=generator","https://open.spotify.com/embed/track/20hQFBI3Fvene9YT75JUNM?utm_source=generator"]
const random = Math.floor(Math.random() * spotify.length);
document.getElementById("spotify").src = (random, spotify[random]);
