// Variables
var city = 'Austin';
var key = '7e0d1756ab93961fb340fd9cdc867eda';
var weatherBtn = document.querySelector('.dropdown-trigger');
// weather API variables
var currTemp = document.getElementById('current-temp');
var currWeather = document.getElementById('current-weather');
var currWindSpeed = document.getElementById('current-wind-speed');
var currSunrise = document.getElementById('current-sunrise');
var currSunset = document.getElementById('current-sunset');
var currDate = document.getElementById('current-date');

// function DECLARATIONS
// Weather API functions (LAT, LON)
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

          let currentDT = data.daily[0].dt;
          sevenDayData(data, currentDT);
          let todaysDate = moment.unix(currentDT).format('dddd');
          currentWeather(todaysDate, temp, weather, windSpeed, sunrise, sunset);

          // console.log(sevenDayData(currentDT));
        });
      } else {
        alert('Error: ' + response.statusText); // if response was not okay then its sending an Alert (which is bad bc its a blocker) with the response status displayed
      }
    })
    .catch(function (error) {
      alert('1 Unable to connect to weatherAPI'); //is there is a server side error then an Alert (which is bad bc its a blocker) with the response will be displayed
    });
}

function currentWeather(date, temp, weather, windSpeed, sunrise, sunset) {
  currDate.textContent = "Today's Date: " + date;
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
    console.log(weeklyIcons[i].weather[0].id);
    var dailyWeatherId = weeklyIcons[i].weather[0].id;
    // take in the day and give it the icon
    assignIcon(dailyWeatherId, i);
    // append the image to the correct id based on index (days from today)
  }
}

function sevenDayData(data, currentDT) {
  for (let i = 1; i <= 7; i++) {
    // Data Analysis
    let corrWeather = data.daily[i].weather[0].id;
    console.log(corrWeather);
    let corrTemp = data.daily[i].temp.day;
    let corrWind = data.daily[i].wind_speed;

    // TEXT CONTENT
    let determinedIconEl = document.getElementById('determined-Icon' + i);
    assignIcon(corrWeather, determinedIconEl);
    let determinedDate = moment.unix(currentDT).add([i], 'days').format('dddd');
    let displayedDate = document.getElementById('day' + i);
    displayedDate.textContent = determinedDate;
    let determinedWeather = document.getElementById('determined-weather' + i);
    console.log(i);
    console.log(determinedWeather);
    determinedWeather.textContent = corrWeather;
    let determinedTemp = document.getElementById('determined-temp' + i);
    determinedTemp.textContent = corrTemp;
    let determinedWind = document.getElementById('determined-wind-speed' + i);
    determinedWind.textContent = corrWind;
  }
}

function assignIcon(dailyId, block) {
  var img = document.createElement('img');
  if (dailyId > 800) {
    img.src = 'assets/images/Weather_Icons/clouds.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else if (dailyId === 800) {
    img.src = 'assets/images/Weather_Icons/clear.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else if (dailyId > 700) {
    img.src = 'assets/images/Weather_Icons/fog.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else if (dailyId >= 600) {
    img.src = 'assets/images/Weather_Icons/snow.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else if (dailyId >= 500) {
    img.src = 'assets/images/Weather_Icons/rain.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else if (dailyId >= 300) {
    img.src = 'assets/images/Weather_Icons/drizzle.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else if (dailyId >= 200) {
    img.src = 'assets/images/Weather_Icons/thunder.png';
    img.className += 'weather-icon';
    // var block = document.getElementById('day' + dayNum);
    block.appendChild(img);
  } else {
    console.log('big error lol');
  }
}

// End of weather API's

// Carousel
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.carousel');
  M.Carousel.init(elems);
});

// function declaration END
weatherApi();

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

// pancake navbar functions 
function openNav() {
  document.getElementById("pancake").style.height = "100%";
}

function closeNav() {
  document.getElementById("pancake").style.height = "0%";
}
// end pancake navbar functions