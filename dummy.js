var forecast = []
                        
                        var fiveDayTemp = result.list[i].main.temp;
                        var fiveDayHumidity = result.list[i].main.humidity;
                        var icon = result.list[i].weather[0].icon
                        
                        forecast.push(fiveDayTemp, fiveDayHumidity, icon);
                    
                    console.log(forecast)

                    $("#d1temp").addClass("card-body").text("Temperature: " + forecast[0] + " °F")
                    $("#d1humidity").addClass("card-body").text("Humidity: " + forecast[1] + "%")
                    $("#icon").attr("src",  "http://openweathermap.org/img/wn/" + iconImg + "@2x.png")

                    $("#d2temp").addClass("card-body").text("Temperature: " + forecast[0] + " °F")