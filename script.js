/*
  Programmer: Tobie Collins
  INST 377 Final Project
*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function injectHTML(list){
/* Empty innerHTML and then add the name as the target.
*/
  console.log('fired injectHTML')
  const target = document.getElementById('overflows_list');
  target.innerHTML = ' ';
  list.forEach((item) => {
    const str = `<ol>${item.overflow_type}, ${item.location}</ol>`;
    target.innerHTML += str;
  })
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);

  });
}

function initMap(){
  const carto = L.map('map').setView([39.15, -77.24], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(carto);
return carto;
}

function markerPlace(array, map){
  console.log('array for markers', array);
  array.forEach((item)=> {
    console.log("marker place", item);

    L.marker(item.latitude, item.longitude).addTo(map);
  })
}


async function mainEvent() {
  const search = document.getElementById('search');
  console.log('start');

  const filterButton = document.getElementById('.filter');

  const carto = initMap();

  search.addEventListener('click', async (event) => {
    event.preventDefault();

    const overflowTypeInput = document.getElementById('overflow_type');
    const overflowType = overflowTypeInput.value;

    const latitudeInput = document.getElementById('latitude');
    const latitude = latitudeInput;

    const longitudeInput = document.getElementById('longitude');
    const longitude = longitudeInput;

    const apiUrl = 'https://opendata.maryland.gov/resource/3rgd-zjxx.json';
    // const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?apikey=71ee4d5a7355024ab28189f5a294df55&format=json&q_track=${encodeURIComponent(songName)}&q_artist=${encodeURIComponent(artistName)}&quorum_factor=1`;
    console.log("url:",apiUrl );
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      injectHTML(data);
      console.log(data);

      markerPlace(data, carto);
      

      // Process the results and update the UI
      // ...

    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  });
}

filterButton.addEventListener('click', (event) => {
  console.log("clicked filter");

  const formData = new FormData(search);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);
  const newList = filterList(data, formProps.overflowType)
  injectHTML(newList);
})

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests