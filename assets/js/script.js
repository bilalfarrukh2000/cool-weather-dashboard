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