var APIKey = "95f4113ff118dc3d9eecf2014570612e";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var dailyBox = document.getElementById("daily-box");

// added moment.js to get current date as well as dates for 5 day forecast
var date = moment().format("MMM Do, YYYY");
var date1 = moment().add(1, 'days').format("MMM Do, YYYY");
var date2 = moment().add(2, 'days').format("MMM Do, YYYY");
var date3 = moment().add(3, 'days').format("MMM Do, YYYY");
var date4 = moment().add(4, 'days').format("MMM Do, YYYY");
var date5 = moment().add(5, 'days').format("MMM Do, YYYY");

let forecastDates = [date1, date2, date3, date4, date5];


var getFiveDayStats = function (cityName) {
  // format the openweathermap api url
  var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlFiveDay).then(function (response) {
    return response.json();
  })

    .then(function (data) {
      console.log(data);

      for (var i = 0; i < 40; i += 8) {

        // create html
        var forecastDate = document.createElement("h4");
        var card = document.createElement("div");
        var cardBody = document.createElement("div");
        var forecastDate = document.createElement("h4");

        var iconEl = document.createElement("img");
        var iconUrl = (`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
        iconEl.setAttribute('src', iconUrl);

        var forecastTemp = document.createElement("p");
        var forecastWind = document.createElement("p");
        var forecastHumidity = document.createElement("p");

        card.setAttribute("class", "card col-sm-12 col-md-4 col-lg-3 col-xl-2  m-3");
        cardBody.setAttribute("class", "card-body");

        // Divide i by 8 since we are looping to every 8th element in array from api call since they are every 3 hours
        forecastDate.textContent = forecastDates[i / 8];
        forecastTemp.textContent = "Temp: " + data.list[i].main.temp + " \xB0F";
        forecastWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";

        dailyBox.append(card);
        card.append(cardBody);
        cardBody.append(forecastDate, iconEl, forecastTemp, forecastWind, forecastHumidity);

      }
    });
};

var getCityStats = function (cityName) {
  // format the openweathermap api url
  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlCurrent)
    .then(function (response) {
      response.json()
        .then(function (data) {
          console.log(data);

          var apiUrlUVI = (`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}`);

          fetch(apiUrlUVI)
            .then(function (response2) {
              response2.json()
                .then(function (data2) {
                  console.log(data2);

                  var currentDayCityDate = document.querySelector("#current-day-city-date");
                  var currentDayTemp = document.querySelector("#current-day-temp");
                  var currentDayWind = document.querySelector("#current-day-wind");
                  var currentDayHumidity = document.querySelector("#current-day-humidity");
                  var currentDayUV = document.querySelector("#current-day-uv");

                  currentDayCityDate.textContent = data.name + " (" + date + ") ";
                  currentDayTemp.textContent = "Temp: " + data.main.temp + " \xB0F";
                  currentDayWind.textContent = "Wind: " + data.wind.speed + " MPH";
                  currentDayHumidity.textContent = "Humidity: " + data.main.humidity + " %";
                  currentDayUV.textContent = "UV Index: " + data2.current.uvi;

                  var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                  var currentDayIcon = document.querySelector(".current-day-icon");
                  currentDayIcon.setAttribute('src', iconUrl);

                  // calling the 5 day forecast function
                  getFiveDayStats(cityName)
                })
            })


        });
    });
};

var createRecent = function (cityName) {
  var newButton = document.createElement("button");
  newButton.textContent = cityName;
  newButton.addEventListener("click", function (event) {
    getCityStats(event.target.textContent)
    localStorage.setItem("cityName");
  })

  document.querySelector(".recent-searches").append(newButton);
  newButton.setAttribute("class", "button btn-primary btn-block flex-row");
}

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var cityName = cityInputEl.value.trim();

  if (cityName) {
    createRecent(cityName);
    getCityStats(cityName);
    // reset box to be empty
    cityInputEl.value = "";
  } else {
    alert("Please enter a City Name");
  }
  console.log(event);
};

cityFormEl.addEventListener("submit", formSubmitHandler);


//Click Handlers
// $("#search-button").on("click", displayWeather);
// $(document).on("click", invokePastSearch);
// $(window).on("load", loadlastCity);
// $("#clear-history").on("click", clearHistory);

// var getUVIndex = function(event) {
//   var apiUrlUV

//   //get UV Index
//   var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=7e4c7478cc7ee1e11440bf55a8358ec3&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
//   $.ajax({
//       url: uvIndexURL,
//       method: "GET"
//   }).then(function (uvresponse) {
//       var uvindex = uvresponse.value;
//       var backgroundcolor;
//       if (uvindex <= 3) {
//           backgroundcolor = "green";
//       }
//       else if (uvindex >= 3 || uvindex <= 6) {
//           backgroundcolor = "yellow";
//       }
//       else if (uvindex >= 6 || uvindex <= 8) {
//           backgroundcolor = "orange";
//       }
//       else {
//           backgroundcolor = "red";
//       }
//       var uvdisplay = $("<p>").attr("class", "card-text").text("UV Index: ");
//       uvdisplay.append($("<span>").attr("class", "uvindex").attr("style", ("background-color:" + backgroundcolor)).text(uvindex));
//       cardBody.append(uvdisplay);

//   });

//   cardRow.append(textCntr);
//   getForecast(response.id);