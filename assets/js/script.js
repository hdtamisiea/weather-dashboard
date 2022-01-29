var APIKey = "95f4113ff118dc3d9eecf2014570612e";
// var cityName = "tampa";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
// added moment.js to get current date
var date = moment().format("MMM Do, YYYY");
// var iconDescription = data.weather[0].description || weather[0].main;


var getFiveDayStats = function () {
  // format the openweathermap api url
  var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlFiveDay).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      for (var i = 0; i < data.length; i = i + 8) 
        console.log(data.length);
        var dayOneDate = document.querySelector("#day-one-date");
        var dayOneTemp = document.querySelector("#day-one-temp");
        var dayOneWind = document.querySelector("#day-one-wind");
        var dayOneHumidity = document.querySelector("#day-one-humidity");

        // dayOneDate.textContent = "Date: " + data.list[i].dt_txt;
        // console.log(data.list[i].dt_txt);

        dayOneTemp.textContent = "Temp: " + data.list[i].main.temp + " \xB0F";
        dayOneWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        dayOneHumidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";
      }
    );
  });
};

var getCityStats = function () {
  // format the openweathermap api url
  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlCurrent).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      var currentDayCityDate = document.querySelector("#current-day-city-date");
      var currentDayTemp = document.querySelector("#current-day-temp");
      var currentDayWind = document.querySelector("#current-day-wind");
      var currentDayHumidity = document.querySelector("#current-day-humidity");
      var currentDayUV = document.querySelector("#current-day-uv");



      currentDayCityDate.textContent = data.name + " (" + date + ") ";
      currentDayTemp.textContent = "Temp: " + data.main.temp + " \xB0F";
      currentDayWind.textContent = "Wind: " + data.wind.speed + " MPH";
      currentDayHumidity.textContent = "Humidity: " + data.main.humidity + " %";
      // currentDayUV.textContent = "UV Index: " + data.?;

      var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      var currentDayIcon = document.querySelector(".current-day-icon");
      currentDayIcon.setAttribute('src', iconUrl);
      // currentDayIcon.setAttribute('alt', iconDescription);

      // calling the 5 day forecast function
      getFiveDayStats()
    });
  });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  cityName = cityInputEl.value.trim();

  if (cityName) {
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
// }