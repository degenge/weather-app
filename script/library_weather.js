const OPENWEATHER_KEY = 'bb0e1f790c8db79e3532961bf204d7aa';

function getWeather(cityName) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + OPENWEATHER_KEY;
    //console.log(url);
    fetch(url)
        .then(function (resp) {
            // todo: add spinner
            // document.getElementById('spinner').style.display = 'none';
            return resp.json()
        })
        .then(function (data) {
            drawWeather(data);
            getUvIndex(data.coord.lat, data.coord.lon);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function getForecast(cityName, temp) {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&APPID=' + OPENWEATHER_KEY;
    //console.log(url);
    fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            const DATA_LIST = data.list,
                DAY_HOUR = '12:00:00',
                NIGHT_HOUR = '03:00:00',
                CURRENT_DATE = new Date();

            // ADD ONE DAY TO CURRENT DATE
            CURRENT_DATE.setDate(CURRENT_DATE.getDate() + 1);
            let startDateDay = formatDate(CURRENT_DATE, 'date_us') + ' ' + DAY_HOUR,
                startDateNight = formatDate(CURRENT_DATE, 'date_us') + ' ' + NIGHT_HOUR,
                tempResultsDay = [],
                tempResultsNight = [];

            DATA_LIST.forEach((dataElement) => {
                let dateTemp = new Date(dataElement.dt_txt);
                dateTemp.setDate(dateTemp.getDate() + 1);

                let dataElementDateDay = formatDate(dateTemp, 'date_us') + ' ' + DAY_HOUR;
                let dataElementDateNight = formatDate(dateTemp, 'date_us') + ' ' + NIGHT_HOUR;

                if (dataElement.dt_txt.indexOf(startDateDay) !== -1) {
                    tempResultsDay.push(dataElement);
                    startDateDay = dataElementDateDay;
                }

                if (dataElement.dt_txt.indexOf(startDateNight) !== -1) {
                    tempResultsNight.push(dataElement);
                    startDateNight = dataElementDateNight;
                }

            });

            if (temp === 'day') {
                return tempResultsDay;
            }
            else {
                return tempResultsNight;
            }

        })
        .then(function (newDataArray) {
            drawForecast(newDataArray);
            drawForecastTemperature(newDataArray);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function getUvIndex(lat, lon) {
    //http://api.openweathermap.org/data/2.5/uvi?appid=bb0e1f790c8db79e3532961bf204d7aa&lat=51.03&lon=4.08
    let url = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + OPENWEATHER_KEY + '&lat=' + lat + '&lon=' + lon;
    fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log('UV Index: ' + data.value);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function drawWeather(d) {
    // location
    document.getElementById('location').innerHTML = d.name + ', ' + d.sys.country;
    document.getElementById('currentDate').innerHTML = formatDate(d.dt, '');

    // current temperature
    let currentTemperature = calculateTemperature(d.main.temp, 'celcius');
    let currentTemperatureFeelslike = calculateTemperature(d.main.feels_like, 'celcius');
    // let currentTemperatureWeatherIcon = "http://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png";
    let currentTemperatureWeatherIcon = "images/" + d.weather[0].icon + ".svg";
    currentTemperatureValue.innerHTML = currentTemperature + '&deg;';
    currentTemperatureFeelsLikeValue.innerHTML = 'Feels like ' + currentTemperatureFeelslike + '&deg;';
    currentTemperatureSummary.innerHTML = d.weather[0].description.toProperCase();
    currentTemperatureIcon.setAttribute('src', currentTemperatureWeatherIcon);

    // current stats
    let currentTemperatureHigh = calculateTemperature(d.main.temp_max, 'celcius');
    let currentTemperatureLow = calculateTemperature(d.main.temp_min, 'celcius');
    currentStatsTemperatureHighValue.innerHTML = currentTemperatureHigh + '&deg;';
    currentStatsTemperatureLowValue.innerHTML = currentTemperatureLow + '&deg;';

    currentStatsPressureValue.innerText = d.main.pressure + 'hPa';
    currentStatsHumidityValue.innerText = d.main.humidity + '%';

    currentStatsWindSpeedValue.innerText = d.wind.speed + 'm/s';
    currentStatsCloudsValue.innerText = d.clouds.all + '%';

    currentStatsSunriseValue.innerText = formatDate(d.sys.sunrise, 'time', true);
    currentStatsSunsetValue.innerText = formatDate(d.sys.sunset, 'time', true);
}

function drawForecast(newDataArray) {
    // clear the container first
    nextFiveDaysContainer.innerText = '';

    newDataArray.forEach((newDataElement) => {
        // day
        let element1 = document.createElement('div');
        element1.setAttribute('class', 'next-5-days__date');
        let value1 = document.createElement('div');
        value1.setAttribute('class', 'next-5-days__value');
        value1.innerText = formatDate(newDataElement.dt, 'day_short', true);
        let label1 = document.createElement('div');
        label1.setAttribute('class', 'next-5-days__label');
        label1.innerHTML = formatDate(newDataElement.dt, 'day_month', true) + '<br/>' + formatDate(newDataElement.dt_txt, 'time');
        element1.appendChild(value1);
        element1.appendChild(label1);

        let element2 = document.createElement('div');
        element2.setAttribute('class', 'next-5-days__icon');
        let value2 = document.createElement('div');
        value2.setAttribute('class', 'next-5-days__value');
        let imageIcon = document.createElement('img');
        //imageIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + newDataElement.weather[0].icon + "@2x.png");
        imageIcon.setAttribute('src', "images/" + newDataElement.weather[0].icon + ".svg");
        value2.appendChild(imageIcon);
        let label2 = document.createElement('div');
        label2.setAttribute('class', 'next-5-days__label');
        label2.innerText = newDataElement.weather[0].description.toProperCase();
        element2.appendChild(value2);
        element2.appendChild(label2);

        let element3 = document.createElement('div');
        element3.setAttribute('class', 'next-5-days__low');
        let value3 = document.createElement('div');
        value3.setAttribute('class', 'next-5-days__value');
        value3.innerHTML = calculateTemperature(newDataElement.main.temp_min, 'celcius') + '&deg;';
        let label3 = document.createElement('div');
        label3.setAttribute('class', 'next-5-days__label');
        label3.innerText = 'Low';
        element3.appendChild(value3);
        element3.appendChild(label3);

        let element4 = document.createElement('div');
        element4.setAttribute('class', 'next-5-days__high');
        let value4 = document.createElement('div');
        value4.setAttribute('class', 'next-5-days__value');
        value4.innerHTML = calculateTemperature(newDataElement.main.temp_max, 'celcius') + '&deg;';
        let label4 = document.createElement('div');
        label4.setAttribute('class', 'next-5-days__label');
        label4.innerText = 'High';
        element4.appendChild(value4);
        element4.appendChild(label4);

        let element5 = document.createElement('div');
        element5.setAttribute('class', 'next-5-days__rain');
        let value5 = document.createElement('div');
        value5.setAttribute('class', 'next-5-days__value');
        value5.innerText = newDataElement.clouds.all + '%';
        let label5 = document.createElement('div');
        label5.setAttribute('class', 'next-5-days__label');
        label5.innerText = 'Clouds';
        element5.appendChild(value5);
        element5.appendChild(label5);

        let element6 = document.createElement('div');
        element6.setAttribute('class', 'next-5-days__wind');
        let value6 = document.createElement('div');
        value6.setAttribute('class', 'next-5-days__value');
        value6.innerText = newDataElement.wind.speed + 'm/s';
        let label6 = document.createElement('div');
        label6.setAttribute('class', 'next-5-days__label');
        label6.innerText = 'Wind';
        element6.appendChild(value6);
        element6.appendChild(label6);

        let rowElement = document.createElement('div');
        rowElement.setAttribute('class', 'next-5-days__row');
        rowElement.appendChild(element1);
        rowElement.appendChild(element2);
        rowElement.appendChild(element3);
        rowElement.appendChild(element4);
        rowElement.appendChild(element5);
        rowElement.appendChild(element6);

        nextFiveDaysContainer.appendChild(rowElement);
    });

}

function drawForecastTemperature(newDataArray) {
    let chartData = {
        'legend': [],
        'data': []
    };
    newDataArray.forEach((newDataElement) => {
        let dataLegend = [formatDate(newDataElement.dt, 'day_short', true), formatDate(newDataElement.dt, 'day_month', true)];
        chartData.legend.push(dataLegend);
        chartData.data.push(calculateTemperature(newDataElement.main.temp, 'celcius'));
    });

    let ctx = document.getElementById('myChart').getContext('2d');
    let temperatureLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.legend,
            datasets: [{
                label: ' Temperature (°C)',
                data: chartData.data,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: '#f4a91a',
                clip: 50,
                fill: false,
                lineTension: 0.1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        drawTicks: true,
                        offsetGridLines: false,
                        zeroLineColor: 'rgba(255, 255, 255, 0.25)'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white',
                        fontStyle: '300',
                        fontSize: 14
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawTicks: true,
                        offsetGridLines: false,
                        zeroLineColor: 'rgba(255, 255, 255, 0.25)'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white',
                        fontStyle: '300',
                        fontSize: 14
                    },
                }]
            },
            layout: {
                padding: 25
            },
            legend: {
                display: true,
                labels: {
                    boxWidth: 2,
                    fontColor: 'white',
                    fontStyle: '300',
                    fontSize: 16
                }
            }
        }
    });
}

function calculateTemperature(value, scale) {
    let temperature = 0;
    switch (scale) {
        case 'celcius':
            temperature = Math.round(parseFloat(value) - 273.15);
            break;
        case 'fahrenheit':
            temperature = Math.round(((parseFloat(value) - 273.15) * 1.8) + 32);
            break;
        default:
            break;
    }
    return temperature;
}

function calculateDegreesToCompass(degrees) {
    let val = Math.floor((degrees / 22.5) + 0.5);
    const WIND_DIRECTIONS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return WIND_DIRECTIONS[(val % 16)];
}