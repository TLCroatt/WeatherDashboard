$(document).ready(function () {
  //event listener for search button
  $("#submit").click(function () {
    event.preventDefault();

    
    //$("#cityForecast").hide()
    //$("#forecast-card").hide()

    let city = $("#city").val();
    console.log("city", city);
    searchWeather(city);
    //clear input field after search
    $("#city").val("");

    //put local storage here
    //check local storage for an array
    var searchHistory = localStorage.getItem("searchHistory")
    console.log(searchHistory)
    let cities = []
    if (searchHistory) {
    //if there is an array, then parse and push city.val to it
    JSON.parse(localStorage.getItem("searchHistory"));
    cities.push(city);
    //send it back to local storage (if else statement)
    localStorage.setItem("searchHistory", JSON.stringify([city]));
    }else {
    //else (no array) set local storage as an array w/ city we are searching for
    localStorage.setItem("searchHistory", JSON.stringify([city]));
    }
    for (var i = 0; i < cities.length; i++) {
      var li = $("<li>").addClass("list-group-item").text(cities[i]);
      $("#citySearches").append(li);
    }

  });

  //event listener for searched cities list to run searchWeather function
  $(document).on("click", ".citySearches li", function () {
    var selectedCity = $(this).text();
    console.log("selectedCity", selectedCity);
    searchWeather(selectedCity);
  });

  

  //function to search weather from inputJSON
  function searchWeather(city) {
    console.log("running");
    $("#cityForecast .card-body").empty();

    //add the city to the cities array
    


    //var citySearches = $("#citySearches ul");

    $("#citySearches").empty();

    

    //for loop to add searched cities to the list display
    

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
      $("#card-body").empty();

      console.log(response);
      //dynamically create dom elements for results - change to .addClass
      console.log(city);

      var currentDate = moment().date(Number).add(5, "d").format("MM/DD/YY");
        console.log(currentDate);

      var cityTitle = $("<h3>")
        .addClass("card-title")
        .text(city + " " + currentDate); //add date

      var temperature = $("<p>")
        .addClass("card-body")
        .text("Tempurature: " + response.main.temp + "°F");

      var humidity = $("<p>")
        .addClass("card-body")
        .text("Humidity: " + response.main.humidity + "%");

      var windSpeed = $("<p>")
        .addClass("card-body")
        .text("Wind Speed: " + response.wind.speed + "MPH");

      var iconImg = response.weather[0].icon;
      var weatherIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + iconImg + "@2x.png"
      );

      //append everything
      $("#cityDisplay").append(
        cityTitle,
        weatherIcon,
        temperature,
        humidity,
        windSpeed
      );

      $("#cityDisplay").slideDown("fast");
      console.log("its working")

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
        var UVIndex = parseInt(result.value);
        console.log(UVIndex);
        var UV = $("<p>")
          .addClass("card-body")
          .text("UV Index: " + result.value);
        $("#cityDisplay").append(UV);
        if (UVIndex <= 2) {
          UV.addClass("low");
        } else if (UVIndex > 2 && UVIndex < 5) {
          UV.addClass("moderate");
        } else {
          UV.addClass("severe");
        }
      });

      //third ajax call for 5 day forecast
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          apiKey +
          "&units=imperial",
        method: "GET",
      }).then(function (result) {
        //console.log(result)

        $("#forecast").empty();

        //for loop to pull out all times matching 15:00:00
        for (var i = 0; i < result.list.length; i++) {
          var date = new Date(result.list[i].dt_txt);
          var hours = date.getHours();

          if (hours === 15) {
            console.log(result.list[i].dt_txt);
            console.log(result.list[i].main.temp);
            //day 1 forecast
            $("#date1").text(
              moment().date(Number).add(1, "d").format("MM/DD/YY")
            );
            $("#d1temp")
              .addClass("card-body")
              .text("Temperature: " + result.list[0].main.temp + " °F");
            $("#d1humidity")
              .addClass("card-body")
              .text("Humidity: " + result.list[0].main.humidity + "%");
            $("#d1icon").attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                result.list[0].weather[0].icon +
                "@2x.png"
            );
            //day 2 forecast
            $("#date2").text(
              moment().date(Number).add(2, "d").format("MM/DD/YY")
            );
            $("#d2temp")
              .addClass("card-body")
              .text("Temperature: " + result.list[1].main.temp + " °F");
            $("#d2humidity")
              .addClass("card-body")
              .text("Humidity: " + result.list[1].main.humidity + "%");
            $("#d2icon").attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                result.list[1].weather[0].icon +
                "@2x.png"
            );
            //day 3 forecast
            $("#date3").text(
              moment().date(Number).add(3, "d").format("MM/DD/YY")
            );
            $("#d3temp")
              .addClass("card-body")
              .text("Temperature: " + result.list[2].main.temp + " °F");
            $("#d3humidity")
              .addClass("card-body")
              .text("Humidity: " + result.list[2].main.humidity + "%");
            $("#d3icon").attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                result.list[2].weather[0].icon +
                "@2x.png"
            );
            //day 4 forecast
            $("#date4").text(
              moment().date(Number).add(4, "d").format("MM/DD/YY")
            );
            $("#d4temp")
              .addClass("card-body")
              .text("Temperature: " + result.list[3].main.temp + " °F");
            $("#d4humidity")
              .addClass("card-body")
              .text("Humidity: " + result.list[3].main.humidity + "%");
            $("#d4icon").attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                result.list[3].weather[0].icon +
                "@2x.png"
            );
            //day 5 forecast
            $("#date5").text(
              moment().date(Number).add(5, "d").format("MM/DD/YY")
            );
            $("#d5temp")
              .addClass("card-body")
              .text("Temperature: " + result.list[4].main.temp + " °F");
            $("#d5humidity")
              .addClass("card-body")
              .text("Humidity: " + result.list[4].main.humidity + "%");
            $("#d5icon").attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                result.list[4].weather[0].icon +
                "@2x.png"
            );

            //var FiveDayTemp = $("<p>")
            //.addClass("card-body")
            //.text("Tempurature: " + result.list[i].main.temp + "°F");

            //var FiveDayHumidity = $("<p>")
            //.addClass("card-body")
            //.text("Humidity: " + result.list[i].main.humidity + "%");
            //console.log(FiveDayTemp, FiveDayHumidity)

            //$("#forecast-card").append(FiveDayHumidity)
          }
        }
        //let cards = document.getElementsByClassName("forecast")
        //for (var i = 0; i < cards.length; i ++) {

        //cards[i].textContent = 5
        //}
      });
    });
  }

  //check local storage for searched cities. if new search !==, save to local storage
  //retreive 5 day forecast and append to forecast div
  //add icon to city that represents current weather conditions
  //add color to UV Index to show conditions
});
