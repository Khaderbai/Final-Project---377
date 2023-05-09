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
  
    
  
  
  async function mainEvent() { // the async keyword means we can make API requests
    
    const form = document.getElementById('form');
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    const textField = document.getElementById("#list_selector");

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
  
    let trackInfo = []; // Empty array for track's info to populate
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    searchButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      
      console.log('loading data');
      loadAnimation.style.display = 'inline-block';

      const artistName = await fetch()
  
      const track = await fetch("https://api.musixmatch.com/ws/1.1/track.search?apikey=71ee4d5a7355024ab28189f5a294df55&format=json&q_track=&q_artist=MF%20DOOM&quorum_factor=1");
  
      trackInfo = await results.json();
  
      loadAnimation.style.display = 'none';
      console.table(trackInfo);
  

  
    });
  
  
    filterButton.addEventListener('click', (event) => {
      console.log('clicked filter button');
  
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
  
      injectHTML(newList);
      console.log(newList);
    })
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      const restaurantsList = cutRestaurantList(currentList);
    
      injectHTML(restaurantsList);
    })
  }
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests