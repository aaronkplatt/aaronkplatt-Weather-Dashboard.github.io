var searchBtn = document.getElementById('searchBtn');
var searchInput = document.getElementById('searchInput');

// Day
var currentDay = $(`#currentDay`).text(moment().format('MM-DD-YYYY'));
var dateCard1 = $("#currentDay1").text(moment().add(1, 'days').format('MM-DD-YYYY'));
var dateCard1 = $("#currentDay2").text(moment().add(2, 'days').format('MM-DD-YYYY'));
var dateCard1 = $("#currentDay3").text(moment().add(3, 'days').format('MM-DD-YYYY'));
var dateCard1 = $("#currentDay4").text(moment().add(4, 'days').format('MM-DD-YYYY'));
var dateCard1 = $("#currentDay5").text(moment().add(5, 'days').format('MM-DD-YYYY'));

// Pre loaded locations
var cities = JSON.parse(window.localStorage.getItem("cities")) || ["Boston", "San Diego", "Los Angeles", "New York", "San Fransisco", "Hawaii", "Huston", "Tampa"];

// Load Cities
function loadCities() {
    var listCities = document.getElementById('listGroup');
    listCities.innerHTML = "";
    $.each(cities, function(i)
    {
        var li = $('<li/>')
        .addClass('list-group-item')
        .text(cities[i])
        .appendTo(listCities);
    });
    var liCities = document.getElementsByClassName('list-group-item');
    var myFunction = function() {
        alert(this.innerHTML);
    }
    
}

function checkIfExists() {
    index = 0;
    //already exists, load in weather, dont add to array, Use loop
    for (let index = 0; index < cities.length; index++) {
        if (searchInput.value == cities[index]) {
            cities.splice(index, 1);
        }
    }
}

// Add New City If its real
function addNewCity() {
    checkIfExists();
    cities.unshift(searchInput.value);
    cityLimit();
}

// This fuction keeps the array at 8 cities or less
function cityLimit() {
    if (cities.length > 8) {
        cities.pop();
    }
}
//Pre load cities
loadCities();
//Search Btn which is linking to the weather Api
searchBtn.addEventListener("click", function(event) {
    //prevent default
    event.preventDefault();
    //resets current icons every time the search btn is clicked
    $("#currentIcon").empty();
    $("#forecastIcon1").empty();
    $("#forecastIcon2").empty();
    $("#forecastIcon3").empty();
    $("#forecastIcon4").empty();
    $("#forecastIcon5").empty();
    cityLimit(); 
    
    //dont do nothing but alert the user
    if (searchInput.value == "") {
        alert("Couldn't find the City you are looking for");
        return false;
    }

    //Create Api city responses 
    else {
        //API
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&APPID=c3874f4c359949e02c8d036aafbb1d67&units=imperial"
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Linking info with the Api
            var locationCard = $(".location").text("Location: " + response.name);

            var temperatureCard = $(".temperature").text("Temperature: " + response.main.temp + "° F");


            var humidityCard = $(".humidity").text("Humidity: " + response.main.humidity + "%");

            var windSpeedCard = $(".windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

            // TODO IF API NAME DOESNT EXIST

            
            // UV Index
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=c3874f4c359949e02c8d036aafbb1d67&lat=" + latitude + "&lon=" + longitude;
            $.ajax({
                url: uvURL,
                method: "GET"
                }).then(function (response) {
                    //emptys the uv index slot
                    $("#uvIndex0").empty();
                    var uvIndex = response.value;
                    $("#uvIndex0").append($(`<p>UV Index: <span id="uv">${uvIndex}</span></p>`));
                    if (uvIndex <= 3) {
                        $("#uv").css({
                            "background-color": "green"
                        });
                    }
                    else if (uvIndex >= 3 || uvindex <= 6) {
                        $("#uv").css({
                            "background-color": "yellow"
                        });
                    } 
                    else if (uvIndex >= 6 || uvindex <= 8) {
                        $("#uv").css({
                            "background-color": "orange"
                        });
                    } 
                    else {
                        $("#uv").css({
                            "background-color": "red"
                        });
                    }
            });
            var uvIndexCard = $(".uvIndex").text("UV Index: " + "Lon: " + response.coord.lon + " Lat: " + response.coord.lat);
            

            //Icon
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            $("#currentIcon").prepend(currentIcon);

        });
        addNewCity();
    }    
    //Five Day ForeCast
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&appid=c3874f4c359949e02c8d036aafbb1d67&units=imperial";
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
        
            //icons
            var forecastIcon1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png");
            $("#forecastIcon1").prepend(forecastIcon1);

            var forecastIcon2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + ".png");
            $("#forecastIcon2").prepend(forecastIcon2);

            var forecastIcon3 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + ".png");
            $("#forecastIcon3").prepend(forecastIcon3);

            var forecastIcon4 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png");
            $("#forecastIcon4").prepend(forecastIcon4);

            var forecastIcon5 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + ".png");
            $("#forecastIcon5").prepend(forecastIcon5);
            
            
            //temp
            var temperatureForcast1 = $(".forecastTemperature1").text("Temperature: " + response.list[0].main.temp + "° F");
            var temperatureForcast2 = $(".forecastTemperature2").text("Temperature: " + response.list[1].main.temp + "° F");
            var temperatureForcast3 = $(".forecastTemperature3").text("Temperature: " + response.list[2].main.temp + "° F");
            var temperatureForcast4 = $(".forecastTemperature4").text("Temperature: " + response.list[3].main.temp + "° F");
            var temperatureForcast5 = $(".forecastTemperature5").text("Temperature: " + response.list[4].main.temp + "° F");

            //humidity
            var humidityForcast1 = $(".forecastHumidity1").text("Humidity: " + response.list[0].main.humidity + "%");
            var humidityForcast2 = $(".forecastHumidity2").text("Humidity: " + response.list[1].main.humidity + "%");
            var humidityForcast3 = $(".forecastHumidity3").text("Humidity: " + response.list[2].main.humidity + "%");
            var humidityForcast4 = $(".forecastHumidity4").text("Humidity: " + response.list[3].main.humidity + "%");
            var humidityForcast5 = $(".forecastHumidity5").text("Humidity: " + response.list[4].main.humidity + "%");
        });

    
    window.localStorage.setItem("cities", JSON.stringify(cities));
    loadCities();
});



