// !-- Info from eail:
/* 
  Assessment: Please create a single HTML5 web page that has one button that allows the user to get the weather prediction for his current location. 
  The important information would be the temperature and a description of the current weather. Please make use of openweathermap API, a key will be provided to allow access to the API.

  Scoring: The following will detail at a high level how we will assess the practical.
  Use any technology that you are comfortable with. Bonus points for PHP or JavaScript

  1. Time - How quickly was the assessment completed?
  2. Basic programming - best practises and principles applied?
  3. Is the solution working?

  Resources:
  API Key: 8efae9d98e5cb9e674cd59fb3fec08b3
  Sample REST Call: https://api.openweathermap.org/data/2.5/weather?lat=28.163958&lon=-25.834605&APPID=8efae9d98e5cb9e674cd59fb3fec08b3
*/

// !--- Start test ---!

// Wait till the DOM has finished loading, else the button element will not be defined.
window.addEventListener('DOMContentLoaded', (e) => {
  const appId = '8efae9d98e5cb9e674cd59fb3fec08b3';

  //hide weather description details

  console.log('DOM content has finished loading.')
  // Now we can correctly access the button using the DOM and attach a click event listener
  document.getElementById('fetchWeatherAPI').addEventListener('click', (e) => {
    console.log('Button has been clicked, fetch weather API data');

    // Use browser's built in geolocation API
    navigator.geolocation.getCurrentPosition(positionFound, geolocationError);

    function positionFound(position) {
      console.log('Position:', position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Fetch the data using the co-ordinates from the browser's geolocator
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${appId}`)
      .then((resp) => {
        resp.json()
        .then((data) => {
          console.log(data);
          for (let elt of document.querySelectorAll('#after')) {
            elt.style.display = 'block';
          }
          console.log(JSON.stringify(data.weather[0].main));
          // Manipulate assigned div's innerText to contain weather data.
          document.getElementById('specific-weather').textContent = JSON.stringify(data.weather[0].main);
          document.getElementById('weather').textContent = JSON.stringify(data.weather[0].description);
          document.getElementById('main').textContent = JSON.stringify(data.main.temp) + ' Celsius';
          document.getElementById('wind').textContent = JSON.stringify(data.wind.speed) + ' km/h';
        })
      });
    }

    function geolocationError(err) {
      console.log('err:', err);
    }

    // Use sample 
  });
});