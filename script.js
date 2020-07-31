$(document).ready(function () {
  //event listener for search button
  $("#submit").click(function () {
    event.preventDefault();

    let city = $("#city").val();
    console.log("city", city);

    //clear input field after search
    $("#city").val("");

    //event listener for searched cities list to run searchWeather function
    $(document).on("click", ".citySearches li", function () {
      var selectedCity = $(this).text();
      console.log("selectedCity", selectedCity);
      searchWeather(selectedCity);
    });

    //array of searched cities, check local storage for previous searches
    let cities = [];
    if (localStorage.getItem("citySearch")) {
      cities = JSON.parse(localStorage.getItem("citySearch"));
    }

    //function to search weather from input
    const searchWeather = () => {
      console.log("running");
      $("#cityDisplay .card-body").empty();
      //add the city to the cities array
      cities.push(city);

      var citySearches = $("#citySearches ul");

      citySearches.empty();

      //for loop to add searched cities to the list display
      for (var i = 0; i < cities.length; i++) {
        var li = $("<li>").addClass("list-group-item").text(cities[i]);
        citySearches.append(li);
      }

      let apiKey = "e5d47731dc26eefda896c92eb148db5f";
      let queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=imperial";

      //ajax call to search for city to generate weather data
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        //clear card body for each new search

        //cityId = result.id;
        console.log(response);
        //dynamically create dom elements for results - change to .addClass
       console.log(city);
        var cityTitle = $("<h3>").addClass("card-title").text(city);

        var temperature = $("<p>")
          .addClass("card-body")
          .text("Tempurature: " + response.main.temp + "°F");

        var humidity = $("<p>")
          .addClass("card-body")
          .text("Humidity: " + response.main.humidity + "%");

        var windSpeed = $("<p>")
          .addClass("card-body")
          .text("Wind Speed: " + response.wind.speed + "MPH");

        //append everything
        $("#cityDisplay").append(cityTitle, temperature, humidity, windSpeed);

        //second ajax call using objects that return from second ajax call for longitude and latitude to get UV index
        $.ajax({
          url:
            "http://api.openweathermap.org/data/2.5/uvi?appid=" +
            apiKey +
            "&lat=" +
            response.coord.lat +
            "&lon=" +
            response.coord.lon,
          method: "GET",  
        }).then(function (result) {
              console.log(result);
            var UV = $("<p>")
              .addClass("card-body")
              .text("UV Index: " + result.value);
            $("#cityDisplay").append(UV);
          });
        

        //third ajax call for 5 day forecast
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey,
            method: "GET"

        }).then(function(result) {
            console.log(result)
        })
      });
    };

    searchWeather();
    //check local storage for searched cities. if new search !==, save to local storage
    //retreive 5 day forecast and append to forecast div
    //add icon to city that represents current weather conditions
    //add color to UV Index to show conditions
  });
});
