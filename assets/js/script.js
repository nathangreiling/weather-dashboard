var key = "603b52e788a8259f32d720b2e67f9494"
var today = new Date().toLocaleDateString()

var button = document.querySelector('.btn');
var input = document.querySelector('.cityInput');
var city = document.querySelector('.name');
var wind = document.querySelector('.wind');
var temp = document.querySelector('.temp');
var humid = document.querySelector('.humidity');
var historyContainer = document.querySelector('.history-container')


button.addEventListener('click', function(e){
    e.preventDefault();
    getWeather();
    getForecast();
    storage();
    
});

var getWeather = function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=imperial&appid=' + key)
        .then(response => response.json())
        .then(response => {
      var tempValue = response.main.temp;
      var nameValue = response.name +" "+ "(" +today+ ")";
      var windValue = response.wind.speed;
      var humidValue = response.main.humidity;
    
      city.innerHTML = nameValue;
      wind.innerHTML = "Wind: "+windValue+" MPH";
      temp.innerHTML = "Temp: "+tempValue+" °F";
      humid.innerHTML = "Humidity: "+humidValue+"%";
      input.value ="";
    }).catch(function(error) {
        alert("No city found with that name!")
    });
};

var storage = function () {
    localStorage.setItem("cityInput", input.value)
    var history = localStorage.getItem('cityInput')
    var searches = document.createElement("button")
    
    searches.className = "historybtn"
    searches.innerHTML = history
    historyContainer.appendChild(searches)
}

var getForecast = function () {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+input.value+",us&appid=" + key)
}

historyContainer.addEventListener("click", getSearch);

function getSearch(event) {
    var pastSearch = event.target.innerHTML
    console.log(pastSearch);
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+pastSearch+'&units=imperial&appid=' + key)
        .then(response => response.json())
        .then(response => {
      var tempValue = response.main.temp;
      var nameValue = response.name +" "+ "(" +today+ ")";
      var windValue = response.wind.speed;
      var humidValue = response.main.humidity;
    
      city.innerHTML = nameValue;
      wind.innerHTML = "Wind: "+windValue+" MPH";
      temp.innerHTML = "Temp: "+tempValue+" °F";
      humid.innerHTML = "Humidity: "+humidValue+"%";
      input.value ="";
    }).catch(function(error) {
        alert("No city found with that name!")
    });
}
  
