var APIKey = "95f4113ff118dc3d9eecf2014570612e";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var dailyBox = document.getElementById("daily-box");
var forecastIcon = document.querySelector(".forecast-icon");

// added moment.js to get current date
var date = moment().format("MMM Do, YYYY");

// var iconDescription = data.weather[0].description || weather[0].main;


var getFiveDayStats = function () {
  // format the openweathermap api url
  var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlFiveDay).then(function (response) {
    return response.json();
  })

    .then(function (data) {
      console.log(data);

      for (var i = 0; i < 40; i += 8) {
        // console.log(data.length);

        // create html
        var forecastDate = document.createElement("h4");
        var card = document.createElement("div");
        var cardBody = document.createElement("div");
        var forecastDate = document.createElement("h4");
        var forecastTemp = document.createElement("li");
        var forecastWind = document.createElement("li");
        var forecastHumidity = document.createElement("li");

        card.setAttribute("class", "card col-sm-12 col-md-4 col-lg-3 col-xl-2  m-3");
        cardBody.setAttribute("class", "card-body");
        // forecastIcon.setAttribute('src', iconUrl);

        forecastDate.textContent = "Date: " 
        // forecastIcon.textContent = iconUrl
        forecastTemp.textContent = "Temp: " + data.list[i].main.temp + " \xB0F";
        forecastWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";
        
        dailyBox.append(card);
        card.append(cardBody);
        cardBody.append(forecastDate, forecastTemp, forecastWind, forecastHumidity);

        // var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        // var dayOneDate = document.querySelector("#day-one-date");
        // var dayOneTemp = document.querySelector("#day-one-temp");
        // var dayOneWind = document.querySelector("#day-one-wind");
        // var dayOneHumidity = document.querySelector("#day-one-humidity");

        // dayOneDate.textContent = "Date: " + data.list[i].dt_txt;
        // console.log(data.list[i].dt_txt);
      }
    });
};

// var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
// var forecastIcon = document.querySelector(".forecast-icon");
// forecastIcon.setAttribute('src', iconUrl);

// var dayOneDate = document.querySelector("#day-one-date");
// var dayOneTemp = document.querySelector("#day-one-temp");
// var dayOneWind = document.querySelector("#day-one-wind");
// var dayOneHumidity = document.querySelector("#day-one-humidity");

// dayOneDate.textContent = "Date: " + data.list[i].dt_txt;
// console.log(data.list[i].dt_txt);

// let j = 0;
// let length = data.list.length;
// for (var i = 0; i < data.length; i ++) {

// var dayOneDate = document.querySelector("#day-date0");
// var dayOneTemp = document.querySelector("#day-temp0");
// var dayOneWind = document.querySelector("#day-wind0");
// var dayOneHumidity = document.querySelector("#day-humidity0");

// var dayTwoDate = document.querySelector("#day-date1");
// var dayTwoTemp = document.querySelector("#day-temp1");
// var dayTwoWind = document.querySelector("#day-wind1");
// var dayTwoHumidity = document.querySelector("#day-humidity1");

// var dayThreeDate = document.querySelector("#day-date2");
// var dayThreeTemp = document.querySelector("#day-temp2");
// var dayThreeWind = document.querySelector("#day-wind2");
// var dayThreeHumidity = document.querySelector("#day-humidity2");

// var dayFourDate = document.querySelector("#day-date3");
// var dayFourTemp = document.querySelector("#day-te[mp3");
// var dayFourWind = document.querySelector("#day-wind3");
// var dayFourHumidity = document.querySelector("#day-humidity3");

// var dayFiveDate = document.querySelector("#day-date4");
// var dayFiveTemp = document.querySelector("#day-temp4");
// var dayFiveWind = document.querySelector("#day-wind4");
// var dayFiveHumidity = document.querySelector("#day-humidity4");

// dayOneDate.textContent = "Date: " + data.list[2].dt_txt;
// dayOneTemp.textContent = "Temp: " + data.list[2].main.temp + " \xB0F";
// dayOneWind.textContent = "Wind: " + data.list[2].wind.speed + " MPH";
// dayOneHumidity.textContent = "Humidity: " + data.list[2].main.humidity + " %";

// // dayTwoDate.textContent = "Date: " + data.list[10].dt_txt;
// dayTwoTemp.textContent = "Temp: " + data.list[10].main.temp + " \xB0F";
// dayTwoWind.textContent = "Wind: " + data.list[10].wind.speed + " MPH";
// dayTwoHumidity.textContent = "Humidity: " + data.list[10].main.humidity + " %";

// // dayThreeDate.textContent = "Date: ";
// dayThreeTemp.textContent = "Temp: " + data.list[18].main.temp + " \xB0F";
// dayThreeWind.textContent = "Wind: " + data.list[18].wind.speed + " MPH";
// dayThreeHumidity.textContent = "Humidity: " + data.list[18].main.humidity + " %";

// // dayFourDate.textContent = "Date: ";
// dayFourTemp.textContent = "Temp: " + data.list[26].main.temp + " \xB0F";
// dayFourWind.textContent = "Wind: " + data.list[26].wind.speed + " MPH";
// dayFourHumidity.textContent = "Humidity: " + data.list[26].main.humidity + " %";

// // dayFiveDate.textContent = "Date: ";
// dayFiveTemp.textContent = "Temp: " + data.list[34].main.temp + " \xB0F";
// dayFiveWind.textContent = "Wind: " + data.list[34].wind.speed + " MPH";
// dayFiveHumidity.textContent = "Humidity: " + data.list[34].main.humidity + " %";

// j++;



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
      // var currentDayUV = document.querySelector("#current-day-uv");

      currentDayCityDate.textContent = data.name + " (" + date + ") ";
      currentDayTemp.textContent = "Temp: " + data.main.temp + " \xB0F";
      currentDayWind.textContent = "Wind: " + data.wind.speed + " MPH";
      currentDayHumidity.textContent = "Humidity: " + data.main.humidity + " %";
      // currentDayUV.textContent = "UV Index: " + data.?;

      var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      var currentDayIcon = document.querySelector(".current-day-icon");
      currentDayIcon.setAttribute('src', iconUrl);


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