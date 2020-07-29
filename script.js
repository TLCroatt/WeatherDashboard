$(document).ready(function() {

    //event listener for search button
    $("#submit").click(function() {
        event.preventDefault();

        let city = $("#city").val();
        let apiKey = "e5d47731dc26eefda896c92eb148db5f"
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e5d47731dc26eefda896c92eb148db5f"
        
        //ajax call to search for city
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            cityId = result.id;
            
                //second ajax call using response from first to generate weather data
                $.ajax({url: "api.openweathermap.org/data/2.5/weather?q={cityId}&appid={apiKey}&units=imperial",
                success: function(result) {
                    var city = $("<h1>").text($(result.city.name) + $(getDate(0)));
                    $("#current").append(city);

                    var temperature = $("<p>").text("Tempurature: " + $(result.list[0].main.temp) + "°F");
                    $("#current").append(temperature);

                    var humidity = $("<p>").text("Humidity: " + $(result.list[0].main.humidity) + "%");
                    $("#current").append(humidity);

                    var windSpeed = $("<p>").text("Wind Speed: " + $(mph(result.list[0].wind.speed)) + "MPH")
                    $("#current").append(windSpeed);
                }

                })

        })
    })
})