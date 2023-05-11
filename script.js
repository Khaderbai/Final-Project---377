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
  const target = document.querySelector('#overflows_list');
  target.innerHTML = ' ';
  list.forEach((item) => {
    const str = `<li>${item.overflow_type}, ${item.location}</li>`;
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

function cutList(list){
  console.log("fired cut list");
  const range = [...Array(30).keys()];
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  })
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

    coordinates = [item.latitude, item.longitude]
    L.marker(coordinates).addTo(map);
  })
}


async function mainEvent() {
  const mainForm = document.querySelector('.main_form');
  console.log('start');

  const loadDataButton = document.querySelector('.data_load_button');
  const generateButton = document.querySelector('.generate_button');
  const filterButton = document.querySelector('.filter_button');
  const textField = document.querySelector('#filter_text');

  let data = [];
  const carto = initMap();

  loadDataButton.addEventListener('click', async (submitEvent) => {
    console.log('Loading data.');
    // const overflowTypeInput = document.getElementById('overflow_type');
    // const overflowType = overflowTypeInput.value;

    // const latitudeInput = document.getElementById('latitude');
    // const latitude = latitudeInput;

    // const longitudeInput = document.getElementById('longitude');
    // const longitude = longitudeInput;

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

      

      // Process the results and update the UI
      // ...

    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  });

  filterButton.addEventListener('click', (event) => {
    console.log("clicked filter");
  
    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);
  
    console.log(formProps);
    const newList = filterList(data, formProps.filter_text)
    injectHTML(newList);
  })

  generateButton.addEventListener('click', (event) => {
    console.log(data);
    const overflows_list = cutList(data);
    console.log(overflows_list);
    injectHTML(overflows_list);
    markerPlace(data, carto);
  })

  textField.addEventListener('input', (event) => {
    console.log('input', event.target.value);
    const newList = filterList(data, event.target.value);
    console.log(newList);
    injectHTML(newList);
  })
}



/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests