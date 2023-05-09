/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/* A quick filter that will return something based on a matching input */

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function injectHTML(list){
/* Empty innerHTML and then add the name as the target.
*/
  console.log('fired injectHTML')
  const target = document.querySelector('#artist_list');
  target.innerHTML = ' ';
  list.forEach((item) => {
    const str = `<li>${item.song}</li>`;
    target.innerHTML += str
  })
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);

  });
}

  


async function mainEvent() {
  const search = document.getElementById('search');
  console.log('start');

  search.addEventListener('click', async (event) => {
    event.preventDefault();

    const artistNameInput = document.getElementById('artist_name');
    const artistName = artistNameInput.value;

    const songNameInput = document.getElementById('song_name');
    const songName = songNameInput.value;

    const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?apikey=71ee4d5a7355024ab28189f5a294df55&format=json&q_track=${encodeURIComponent(songName)}&q_artist=${encodeURIComponent(artistName)}&quorum_factor=1`;
    console.log("url:",apiUrl );
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Process the results and update the UI
      // ...

    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  });
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests