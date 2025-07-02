const rssUrl = 'https://letterboxd.com/krmcn/rss/';
const corsProxy = 'https://cors.kerim-can05-ae1.workers.dev/?url=';
const fullUrl = corsProxy + rssUrl;

fetch(fullUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const movie = xmlDoc.querySelector('item');
        const description = movie.querySelector('description').textContent;
        const descriptionDoc = parser.parseFromString(description, 'text/html');

        const moviePoster = descriptionDoc.querySelector('img').getAttribute('src');
        const title = movie.querySelector('filmTitle').textContent;
        const titleLink = movie.querySelector('link').textContent;
        const year = movie.querySelector('filmYear').textContent;
        const ratingText = movie.querySelector( 'memberRating').textContent;
        let ratingMath = ratingText.replace(',', '.');
        const rating = ratingMath * 2;

        console.log(moviePoster);

        document.getElementById('letterboxd').style.backgroundImage = `url('${moviePoster}')`;
        document.getElementById('movieTitle').textContent = title;
        document.getElementById('movieTitle').href = titleLink;
        document.getElementById('movieYear').textContent = year;
        document.getElementById('movieRating').textContent = "Rating: " + rating + "/10";
    })
    .catch(error => console.error('Error fetching RSS feed:', error));
