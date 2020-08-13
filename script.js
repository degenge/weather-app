// DOM ELEMENTS
let cityElement = document.getElementById('city'),
    searchButton = document.getElementById('search'),
    currentTemperatureValue = document.getElementById('currentTemperatureValue'),
    currentTemperatureFeelsLikeValue = document.getElementById('currentTemperatureFeelsLikeValue'),
    currentTemperatureSummary = document.getElementById('currentTemperatureSummary'),
    currentTemperatureIcon = document.getElementById('currentTemperatureIcon'),
    currentStatsTemperatureHighValue = document.getElementById('currentStatsTemperatureHighValue'),
    currentStatsTemperatureLowValue = document.getElementById('currentStatsTemperatureLowValue'),
    currentStatsWindSpeedValue = document.getElementById('currentStatsWindSpeedValue'),
    currentStatsCloudsValue = document.getElementById('currentStatsCloudsValue'),
    currentStatsPressureValue = document.getElementById('currentStatsPressureValue'),
    currentStatsHumidityValue = document.getElementById('currentStatsHumidityValue'),
    currentStatsSunriseValue = document.getElementById('currentStatsSunriseValue'),
    currentStatsSunsetValue = document.getElementById('currentStatsSunsetValue'),
    testContainer = document.getElementById('testContainer'),
    testElement = document.getElementById('testElement'),
    dayButton = document.getElementById('day'),
    nightButton = document.getElementById('night');

// APP CONSTANTS
const preferredCity = 'dendermonde';

// if (!localStorage.hasOwnProperty('weather_current_city')) {
//     localStorage.setItem('weather_current_city', preferredCity);
// }

let city = getCity();

getWeather(city);
getForecast(city, 'day');

searchButton.onclick = () => {
    city = getCity();
    cityElement.value = '';
    getWeather(city);
    getForecast(city, 'day');

};

cityElement.onkeyup = (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        city = getCity();
        cityElement.value = '';
        getWeather(city);
        getForecast(city, 'day');
    }
};

dayButton.onclick = () => {
    //fadeOutIn(testContainer, 250 , 'day');
    city = getCity();
    cityElement.value = '';
    getForecast(city, 'day');
};

nightButton.onclick = () => {
    //fadeOutIn(testContainer, 250 , 'night');
    city = getCity();
    cityElement.value = '';
    getForecast(city, 'night');
};

function getCity(){
    if (cityElement.value === '') {
        return preferredCity;
    }
    else {
        return cityElement.value;
    }
}







