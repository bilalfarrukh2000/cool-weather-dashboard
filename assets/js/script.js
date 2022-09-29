var cityData;
var forecastData;
var long;
var lat;

var currentDate=moment().format('l');

//Function to getData

function getData(city){

    var currentCity=city;
    var url1="https://api.openweathermap.org/data/2.5/weather?q="+currentCity+"&appid=166d9ab93a294c2aa16185a2466084c7";
    $.ajax({
      async: false,
      type: 'GET',
      url: url1,
      success: function(data) {
           cityData=data;
      }
    });
  
    long=cityData.coord.lon;
    lat=cityData.coord.lat;
    getForecastData();
  }

  function getForecastData(){
  
    var url2="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=166d9ab93a294c2aa16185a2466084c7";
  
      $.ajax({
        async: false,
        type: 'GET',
        url: url2,
        success: function(data) {
          forecastData=data;
        }
      });
  
      displayData();
  }

  //Displaying data in html

function displayData(){

    //Adding main data
  
    var currentTemp=Math.round(1.8*(cityData.main.temp-273)+32);
    var currentWind=Math.round(cityData.wind.speed*2.237);
    var currentHumidity=cityData.main.humidity;
    var currentUvi=forecastData.current.uvi;
    var icon=cityData.weather[0].icon;
    var imgSrc="\"http://openweathermap.org/img/w/"+icon+".png\"";
  
    var generalHTML= 
    "<h1>"+city+" "+currentDate+"<img src="+imgSrc+"></h1>"+
    "<p>Temp: "+currentTemp+" &#8457</p>"+
    "<p>Wind: "+currentWind+" mph</p>"+
    "<p>Humidity: "+currentHumidity+"%</p>"+
    "<p>UV Index: "+currentUvi+"</p>";
  
    $(".general").append(generalHTML);

    //Adding Forecast Data
  for(var i=1;i<6;i++){

    currentDate=moment().add(i, 'days').format('l');
    currentTemp=Math.round(1.8*(forecastData.daily[i].temp.max-273)+32);
    currentWind=Math.round(forecastData.daily[i].wind_speed*2.237);
    currentHumidity=forecastData.daily[i].humidity;
    currentUvi=forecastData.daily[i].uvi;
    icon=forecastData.daily[i].weather[0].icon;
    imgSrc="\"http://openweathermap.org/img/w/"+icon+".png\"";

    var forecastHTML=
    "<article class='card'>"+
    "<h1>"+currentDate+"</h1>"+
    "<img src="+imgSrc+">"+
    "<p>Temp: "+currentTemp+" &#8457</p>"+
    "<p>Wind: "+currentWind+" mph</p>"+
    "<p>Humidity: "+currentHumidity+"%</p>"+
    "<p>UV Index: "+currentUvi+"</p>"+
    "</article>";
  
    $(".five").append(forecastHTML);

    
  }

  $(".display-weather").show();
}

// Display search history 

function showHistory(){

    var vals = Object.values(localStorage);
    var keys = Object.keys(localStorage);
    var sizeofLocalStorage = Object.keys(localStorage).length;
  
    for(var i=0;i<sizeofLocalStorage;i++) {
      var historyHTML = "<button class='history'>"+keys[i]+"</button>";
      $(".sidebar").append(historyHTML);
    }
  }