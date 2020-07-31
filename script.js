$(document).ready(function() {

    //event listener for search button
    $("#submit").click(function() {
        event.preventDefault();

        searchWeather();

        let city = $("#city").val();
        console.log("city", city);

        //clear input field after search
        $("#city").val("");

        //array of searched cities
        let cities = [];

        //function to take in the city as a parameter
        const searchWeather = (city) => {
            $("#cityDisplay .card-body").empty()
            //add te city to the cities array
            cities.push(city);
            
            //update the data object with the city
            data.name = city;
            var citySearches = $("#citySearches ul");
            
            citySearches.empty();

            //for loop to add searched cities to the list display
            for (var i = 0; i < cities.length; i++) {
                var li = $("<li>").addClass("list-group-item").text(cities[i]);
                citySearches.append(li);
            };

            let apiKey = "e5d47731dc26eefda896c92eb148db5f"
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e5d47731dc26eefda896c92eb148db5f"

            //ajax call to search for city
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                //clear card body for each new search
                
                cityId = result.id;
            
                    //second ajax call using response from first to generate weather data
                    $.ajax({url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial",
                    success: function(result) {

                        //dynamically create dom elements for results - change to .addClass
                        var city = $("<h3>").text($(result.city.name) + $(getDate(0)));
                        $("#cityDisplay").append(city); //addClass "card-title"

                        var temperature = $("<p>").text("Tempurature: " + $(result.list[0].main.temp) + "°F");
                        $("#cityDisply").append(temperature); //addClass "card-body"

                        var humidity = $("<p>").text("Humidity: " + $(result.list[0].main.humidity) + "%");
                        $("#cityDisplay").append(humidity);

                        var windSpeed = $("<p>").text("Wind Speed: " + $(mph(result.list[0].wind.speed)) + "MPH")
                        $("#cityDisplay").append(windSpeed);

                        //append everything
                        $("#cityDisplay").append(city, temperature, humidity, windSpeed);
                    }

                    })

            })
        }    
    })


})