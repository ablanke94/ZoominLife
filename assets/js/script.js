// Variables
var city = "Austin";
var key = '7e0d1756ab93961fb340fd9cdc867eda';
var coords = [];


// function DECLARATIONS

function weatherApi() {
    // let city = something else 
    console.log(city);

    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + key;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(lat);
            console.log(lon);
            coords = [lat, lon]
            console.log(coords);
            // function here
        });

}

weatherApi();
console.log(coords);


// save email to local storage 
document.getElementById("signUpBtn").addEventListener("click", function (event) {
    //event.preventDefaults();
    var userEmail = document.getElementById("userEmail");
    localStorage.setItem("email", userEmail.value);
  });

// Trail api
var script = document.createElement("script");
script.setAttribute("src", "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js");
document.getElementsByTagName("head")[0].appendChild(script); var widgetCheck = false;

