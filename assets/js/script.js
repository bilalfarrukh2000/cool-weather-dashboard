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