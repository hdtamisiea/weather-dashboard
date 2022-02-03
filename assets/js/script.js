// Create global variables
var APIKey = "95f4113ff118dc3d9eecf2014570612e";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var dailyBox = document.getElementById("daily-box");
var saveCityArr = JSON.parse(localStorage.getItem("cities")) || [];


// added moment.js to get current date as well as dates for 5 day forecast
var date = moment().format("MMM Do, YYYY");
var date1 = moment().add(1, 'days').format("MMM Do, YYYY");
var date2 = moment().add(2, 'days').format("MMM Do, YYYY");
var date3 = moment().add(3, 'days').format("MMM Do, YYYY");
var date4 = moment().add(4, 'days').format("MMM Do, YYYY");
var date5 = moment().add(5, 'days').format("MMM Do, YYYY");

// created array for forecast dates
let forecastDates = [date1, date2, date3, date4, date5];


// Function to get 5 day forecast
var getFiveDayStats = function (cityName) {
  // format the openweathermap api url
  var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlFiveDay).then(function (response) {
    return response.json();
  })

    .then(function (data) {
      console.log(data);
      // Clear any existing 5 day forecast before appending a new city
      dailyBox.innerHTML = "";

      // Variable to choose every 8th object of api array as each object reps 3 hours (3x8=24 hrs)
      for (var i = 0; i < 40; i += 8) {

        // create html and set up 5 day forecast weather icon img element, url
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

        // Set up attributes for 5 day "cards"
        card.setAttribute("class", "card col-sm-12 col-md-4 col-lg-3 col-xl-2  m-3");
        cardBody.setAttribute("class", "card-body");

        // Set up text content of each html element.  Divide i for forecast datesby 8 since we are looping to every 8th element in array from api call since they are every 3 hours
        forecastDate.textContent = forecastDates[i / 8];
        forecastTemp.textContent = "Temp: " + data.list[i].main.temp + " \xB0F";
        forecastWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + " %";

        // Append elements
        dailyBox.append(card);
        card.append(cardBody);
        cardBody.append(forecastDate, iconEl, forecastTemp, forecastWind, forecastHumidity);
      }
    });
};

// Function to get today's weather
var getCityStats = function (cityName) {
  // format the openweathermap api url
  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=95f4113ff118dc3d9eecf2014570612e&units=imperial";

  // make a request to the url
  fetch(apiUrlCurrent)
    .then(function (response) {
      response.json()
        .then(function (data) {
          console.log(data);

          // Set up UV index url
          var apiUrlUVI = (`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}`);

          // make a request to the uv index url
          fetch(apiUrlUVI)
            .then(function (response2) {
              response2.json()
                .then(function (data2) {
                  console.log(data2);

                  // variables for hard coded elements
                  var currentDayCityDate = document.querySelector("#current-day-city-date");
                  var currentDayTemp = document.querySelector("#current-day-temp");
                  var currentDayWind = document.querySelector("#current-day-wind");
                  var currentDayHumidity = document.querySelector("#current-day-humidity");
                  var currentDayUV = document.querySelector("#uvBtn");

                  // Set up text content for today's forecast elements
                  currentDayCityDate.textContent = data.name + " (" + date + ") ";
                  currentDayTemp.textContent = "Temp: " + data.main.temp + " \xB0F";
                  currentDayWind.textContent = "Wind: " + data.wind.speed + " MPH";
                  currentDayHumidity.textContent = "Humidity: " + data.main.humidity + " %";
                  currentDayUV.textContent = data2.current.uvi;

                  // Set up the color coded uvi display based on the response in api
                  let uvi = data2.current.uvi

                  if (uvi < 2) {
                    currentDayUV.classList.add("bg-success");
                  }

                  else if (uvi >= 2.01 &&
                    uvi <= 5.0) {
                    currentDayUV.classList.add("bg-warning");
                  }

                  else {
                    currentDayUV.classList.add("bg-danger");
                  }

                  // Set up current day weather icon for today's weather
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

// Create a new button for every new city entered, this will be saved to local storage. User can either type in a new city, or choose a recent search.
var createRecent = function (cityName) {
  var newButton = document.createElement("button");
  // console.log(newButton);

  // Set text content of recent search button and change to uppercase for appearances
  newButton.textContent = cityName.toUpperCase();
  

  localStorage.setItem("cities", JSON.stringify(saveCityArr));


  // Event listener to get weather if a previous search button is clicked
  newButton.addEventListener("click", function (event) {
    getCityStats(event.target.textContent)
  })

  // Set attributes and append new search button(s)
  document.querySelector(".recent-searches").append(newButton);
  newButton.setAttribute("class", "button btn-primary btn-block flex-row");
}

  //   function saveSearchHistory(cityName) {
  //     var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  //     searchHistory.push(cityName);
  //     searchHistory = searchHistory.filter(function(value, index, array) {
  //         return array.indexOf(value) === index
  //     });
  //     if (searchHistory.length > 10) {
  //         searchHistory = searchHistory.slice(1, 11);
  //     }
  //     localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  //     loadSearchHistory();
  // }

  // function loadSearchHistory() {
  //       var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  //       searchHistoryListEl.innerHTML = "";

  //       for (let i = 0; i < searchHistory.length; i++) {
  //           var searchHistoryListItemEl = document.createElement("li");
  //           searchHistoryListItemEl.textContent = searchHistory[i];

  //           searchHistoryListEl.prepend(searchHistoryListItemEl);
  //       }
  //   }

  // }


  // function to gather city name from user and display today's weather stats
  var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.trim();

    // If a city name is entered create a recent search button and run function to retrieve today's weather stats
    if (cityName) {
      saveCityArr.push(cityName)
      createRecent(cityName);
      getCityStats(cityName);
     
      // reset box to be empty
      cityInputEl.value = "";

      // If no city name is entered, alert user that input is required
    } else {
      alert("Please enter a City Name");
    }
    console.log(event);

    // saveCity();
    // getSavedCities();
  };

  cityFormEl.addEventListener("submit", formSubmitHandler);

  for (let i = 0; i < saveCityArr.length; i++) {
    createRecent(saveCityArr[i]);
    console.log("hello")
  }

// var newCityArray = [];
// var size = 5;

// for (var i = 0; i < size; i++) {
//   newCityArray[i] = (cityName + (i + 1));
// }

// function saveSearchHistory(cityName) {
//       var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
//       searchHistory.push(cityName);
//       searchHistory = searchHistory.filter(function(value, index, array) {
//           return array.indexOf(value) === index
//       });
//       if (searchHistory.length > 10) {
//           searchHistory = searchHistory.slice(1, 11);
//       }
//       localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
//       loadSearchHistory();
//   }

//   function loadSearchHistory() {
//         var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
//         searchHistoryListEl.innerHTML = "";

//         for (let i = 0; i < searchHistory.length; i++) {
//             var searchHistoryListItemEl = document.createElement("li");
//             searchHistoryListItemEl.textContent = searchHistory[i];

//             searchHistoryListEl.prepend(searchHistoryListItemEl);
//         }
//     }

// function saveArray() {
//   var savedCities = [];
//   for (var i = 0; i < savedCities.length; i++) {
//     cityInputEl(savedCities[i]);
//     localStorage.setItem("savedCities", JSON.stringify(cityInputEl.value));
//   }
// }



//   var newCity = {};
//   $(`.cityName`).each(function() {
//     newCity[this.id] = this.value;
//   })
//   console.log(localStorage.getItem("savedCity"));
//   console.log(JSON.parse(localStorage.getItem("savedCity")));
// }
//   var cityName = cityInputEl.value.trim();
//   var newCity = JSON.stringify(cityName);
//   localStorage.setItem("cityName", newCity);

//   var getStoredCities = localStorage.getItem("cityName");

// };



// function getSavedCities() {
//   var newCity = localStorage.getItem("newCity");
//   document.getElementById("")
// }

// var loadCities = function() {
//   var savedCities = localStorage.getItem("cityName");
//   if (!savedCities) {
//     return false;
//   } 
//   savedCities = JSON.parse(savedCities);

//   for (var i = 0; i < savedCities.length; i++) {
//     cityInputEl(savedCities[i]);
//   }
// };

// loadCities();

// Once a city is entered and "Get Weather" is clicked, run formSubmitHandler


// set new submission to local storage
// localStorage.setItem("cityName", JSON.stringify(cityName))