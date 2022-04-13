// Variables
var city = 'Austin';
var key = '7e0d1756ab93961fb340fd9cdc867eda';
var coords = [];
var weatherBtn = document.querySelector('.dropdown-trigger');
// weather API variables
var currTemp = document.getElementById('current-temp');
var currWeather = document.getElementById('current-weather');
var currWindSpeed = document.getElementById('current-wind-speed');
var currSunrise = document.getElementById('current-sunrise');
var currSunset = document.getElementById('current-sunset');

//                                                                                                           unix time and weather icons

// function DECLARATIONS
// Weather API functions
function weatherApi() {
  var apiUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    city +
    '&limit=5&units=imperial&appid=' +
    key;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;

      // function here
      eightDayForecast(lat, lon, key);
    });
}

function eightDayForecast(lat, lon, key) {
  let apiUrl =
    'https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=' +
    lat +
    '&lon=' +
    lon +
    '&exclude=minutely,hourly,alerts&appid=' +
    key;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var temp = data.current.temp;
          var weather = data.current.weather[0].main;
          let windSpeed = data.current.wind_speed;

          let sunrise = moment.unix(data.current.sunrise).format('h:mm a');
          let sunset = moment.unix(data.current.sunset).format('h:mm a');
          currentWeather(temp, weather, windSpeed, sunrise, sunset);

          let weeklyWeather = data.daily;
          weatherIcon(weeklyWeather);
        });
      } else {
        alert('Error: ' + response.statusText); // if response was not okay then its sending an Alert (which is bad bc its a blocker) with the response status displayed
      }
    })
    .catch(function (error) {
      alert('1 Unable to connect to weatherAPI'); //is there is a server side error then an Alert (which is bad bc its a blocker) with the response will be displayed
    });
}

function currentWeather(temp, weather, windSpeed, sunrise, sunset) {
  currTemp.textContent = 'Current Temperature: ' + temp + '°F';
  currWeather.textContent = 'Current Weather: ' + weather;
  currWindSpeed.textContent =
    'Current Wind Speed: ' + windSpeed + ' miles/hour';
  currSunrise.textContent = "Today's Sunrise: " + sunrise;
  currSunset.textContent = "Today's Sunset: " + sunset;
}

function weatherIcon(weeklyIcons) {
  console.log(weeklyIcons);
  for (let i = 0; i < weeklyIcons.length; i++) {
    
  }
}

// End of weather API's

// Carousel
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  M.Carousel.init(elems);
});

// function declaration END
weatherApi();

console.log(coords);

// save email to local storage
document
  .getElementById('signUpBtn')
  .addEventListener('click', function (event) {
    //event.preventDefaults();
    var userEmail = document.getElementById('userEmail');
    localStorage.setItem('email', userEmail.value);
  });

// Trail api
var script = document.createElement('script');
script.setAttribute(
  'src',
  'https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js'
);
document.getElementsByTagName('head')[0].appendChild(script);
var widgetCheck = false;
