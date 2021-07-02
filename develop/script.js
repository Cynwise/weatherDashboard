let searchBtn = $('#searchBtn');
let inputValue = $('#searchInfo');
let cityName = $('#currentCity');
let temperature = $('#currentTemperature');
let humidity = $('#currentHumidity');
let wind = $('#currentWind');
let uvIndex = $('#currentUVI');
let uviNumber = $('#uviNumber');
let searchHistory = $('#history');

let cities = JSON.parse(localStorage.getItem('cities')) || [];

searchBtn.on('click', search);

// city search history 
let searchList = $(".history");
function getHistory() {

  let histories =JSON.parse(localStorage.getItem('cities'));
  if (histories) {
    histories.forEach(history => {
      searchList.append(`<li>${history}</li>`);
    })
  }
};

getHistory();

// search 
async function search(event) {
  event.preventDefault();
  cities.push(inputValue.val());
  localStorage.setItem('cities', JSON.stringify(cities));
  searchList.empty();
  getHistory();

  let getUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.val()+'&units=imperial&appid=aba5daa3e7ca6a8ea43228cfbcc74721'

// today forecast
fetch(getUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      cityName.text(data.name + " " + moment().format('L'));
      
      $('#weatherIcon').show()
      let iconCode = data.weather[0].icon;
      let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
      $('#weatherIcon').attr('src', iconUrl);
      temperature.text('Temperature: ' + data.main.temp + ' F');
      humidity.text('Humidity: ' + data.main.humidity + ' %');
      wind.text('Wind Speed: ' + data.wind.speed + ' MPH');
      let longitude = data.coord.lon;
      let latitude = data.coord.lat;

        let uviUrlApi = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=imperial&appid=aba5daa3e7ca6a8ea43228cfbcc74721';
  
        fetch(uviUrlApi)
          .then(response => response.json())
          .then(data => {
            uviNumber.text(data.current.uvi);
            console.log(uviNumber.text())
          })
    })

      // five day forecast
      let fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.val()+'&units=imperial&appid=aba5daa3e7ca6a8ea43228cfbcc74721'
      
      fetch(fiveDayApi)
        .then(response => response.json())
        .then(data => {
          console.log(data)

          $('#day1').text(moment().add(1, 'days').format('MM-DD-YYYY'));
          let dayOneIcon = data.list[0].weather[0].icon;
          let dayOneUrl = "http://openweathermap.org/img/wn/" + dayOneIcon + ".png";
          $('#logo1').attr('src', dayOneUrl);
          $('#temperature1').text('Temp: ' + data.list[0].main.temp + ' ℉')
          $('#humidity1').text('Humidity ' + data.list[0].main.humidity + '%')

          $('#day2').text(moment().add(2, 'days').format('MM-DD-YYYY'));
          let dayTwoIcon = data.list[1].weather[0].icon;
          let dayTwoUrl = "http://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
          $('#logo2').attr('src', dayTwoUrl);
          $('#temperature2').text('Temp: ' + data.list[1].main.temp + ' ℉')
          $('#humidity2').text('Humidity ' + data.list[1].main.humidity + '%')

          $('#day3').text(moment().add(3, 'days').format('MM-DD-YYYY'));
          let dayThreeIcon = data.list[2].weather[0].icon;
          let dayThreeUrl = "http://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
          $('#logo3').attr('src', dayThreeUrl);
          $('#temperature3').text('Temp: ' + data.list[2].main.temp + ' ℉')
          $('#humidity3').text('Humidity ' + data.list[2].main.humidity + '%')

          $('#day4').text(moment().add(4, 'days').format('MM-DD-YYYY'));
          let dayFourIcon = data.list[3].weather[0].icon;
          let dayFourUrl = "http://openweathermap.org/img/wn/" + dayFourIcon + ".png";
          $('#logo4').attr('src', dayFourUrl);
          $('#temperature4').text('Temp: ' + data.list[3].main.temp + ' ℉')
          $('#humidity4').text('Humidity ' + data.list[3].main.humidity + '%')

          $('#day5').text(moment().add(5, 'days').format('MM-DD-YYYY'));
          let dayFiveIcon = data.list[4].weather[0].icon;
          let dayFiveUrl = "http://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
          $('#logo5').attr('src', dayFiveUrl);
          $('#temperature5').text('Temp: ' + data.list[4].main.temp + ' ℉')
          $('#humidity5').text('Humidity ' + data.list[4].main.humidity + '%')
   
        })
    .catch(() => {
      console.error('Not a valid City');
    })
  
};