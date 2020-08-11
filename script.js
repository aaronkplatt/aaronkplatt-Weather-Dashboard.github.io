var searchBtn = document.getElementById('searchBtn');
// TODO add 8 pre-places
var cities = JSON.parse(window.localStorage.getItem("cities")) || ["Boston", "San Diego", "Los Angeles", "New York"];


loadCities();
//pop of total is over 8
searchBtn.addEventListener("click", function(event) {
        var searchInput = document.getElementById('searchInput');
        // TODO validate the search input
        // empty dont do anything
        //already exists, load in weather, dont add to array, loop?
        //city doest exist, alert cant find city, get out
        cities.unshift(searchInput.value);
        if (cities.length > 8) {
            cities.pop();
        }
        window.localStorage.setItem("cities", JSON.stringify(cities));
        loadCities();
        
});


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
    for (let i = 0; i < liCities.length; i++) {
        liCities[i].addEventListener('click', myFunction, false);
        
    }
}

