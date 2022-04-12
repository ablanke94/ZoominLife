// Variables
var city = "Austin";
var key = '7e0d1756ab93961fb340fd9cdc867eda';
var coords = [];

// function DECLARATIONS

function weatherApi(){
    // let city = something else 
    console.log(city);
    
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' +city+ '&limit=5&appid=' + key;
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
        coords =[ lat, lon]
        console.log(coords);
        // function here
    });    

}    

weatherApi();
console.log(coords);

document.addEventListener('DOMContentLoaded', function () {
    var modalElem = document.querySelector('.modal');
    var instance = M.Modal.init(modalElem);
    instance.open();
});