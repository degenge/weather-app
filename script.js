// DOM ELEMENTS
const cityElement = document.getElementById('city'),
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
    nextFiveDaysContainer = document.getElementById('nextFiveDaysContainer'),
    dayButton = document.getElementById('day'),
    nightButton = document.getElementById('night');

// APP CONSTANTS
const preferredCity = 'dendermonde';

// ADD TO LOCAL STORAGE
// if (!localStorage.hasOwnProperty('weather_current_city')) {
//     localStorage.setItem('weather_current_city', preferredCity);
// }

let city = getCity();

getWeather(city);
getForecast(city, 'day');

searchButton.onclick = () => {
    city = getCity();
    getWeather(city);
    getForecast(city, 'day');

};

cityElement.onkeyup = (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        city = getCity();
        getWeather(city);
        getForecast(city, 'day');
    }
};

dayButton.onclick = () => {
    dayButton.classList.add('active');
    nightButton.classList.remove('active');
    city = getCity();
    getForecast(city, 'day');
};

nightButton.onclick = () => {
    dayButton.classList.remove('active');
    nightButton.classList.add('active');
    city = getCity();
    getForecast(city, 'night');
};

function getCity() {
    let city;
    if (cityElement.value === '') {
        city = preferredCity;
    }
    else {
        city = cityElement.value;
    }
    cityElement.value = '';
    return city;
}







