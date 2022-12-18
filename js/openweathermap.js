import { Gradient } from './Gradient.js';
// Create your instance
export let gradient = new Gradient();

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas');

const key = '3aa3f35e1a73608e6ab3f0cad3aa4e08';

const searchResults = document.getElementById('geoResults');

const searchBar = document.querySelector('input');

const invalidCity = document.getElementById('invalidCity');

const search = document.querySelector('button');

const buttonCont = document.querySelector('#buttons');

const locationSearchButton = document.querySelector('.locationSearch');

const cover = document.querySelector('.cover');

const standard = document.querySelector('.standardUnits');

const metric = document.querySelector('.metricUnits');

const imperial = document.querySelector('.imperialUnits');

const dateDisplay = document.querySelector('#date');

const posDisplay = document.querySelector('#pos');

const currentTempDisplay = document.querySelector('#currentTemp');

const weatherDescription = document.querySelector('#description');

const weatherDetails = document.querySelector('#details');

const mapCont = document.querySelector('.mapCont');

const chartCont = document.querySelector('.chartCont');

const chartRadios = document.getElementsByName('chart');

const forecastList = document.getElementById('forecastDays');

const dayCont = document.querySelector('.dayCont');

const forecastChartCont = document.querySelector('.forecastchartCont');

const dayInfo = document.querySelector('.dayInfo');

const dayDescription = document.getElementById('dayDescription');

const dayDetails = document.getElementById('dayDetails');

let charts = document.querySelectorAll('.chart');

let results = [];

let canvasArray = [];

let forecastArray = [];

let dayArray = [];

let lat;

let lon;

let data;

let conditions;

const userLocale =
    navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;

const mapDateOptions = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
};

const mapTimeOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

const chartDateOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
};

const chartTimeOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
};

const loading = () => {
    document.querySelector('.info').style.borderBottomRightRadius = '1vh';
    searchResults.style.height = '5vh';
    searchResults.innerHTML = '<div class="loading"></div>';
    searchResults.style.display = 'flex';
    searchResults.style.alignItems = 'center';
};

let temp;

let unit;

let weathIcon;

let weathImg;

let pos;

let searchItem;

searchResults.tabIndex = '0';

const geoResults = async (event) => {
    event.preventDefault();
    invalidCity.style.display = 'none';
    if (!searchBar.value) {
        invalidCity.style.display = 'block';
    } else {
        try {
            results = [];
            let city = searchBar.value;
            event.preventDefault();
            invalidCity.style.display = 'none';
            loading();
            const geo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=4&appid=${key}`);
            const location = await geo.json();
            let preview;
            let previewData;
            for (let param in location) {
                lat = location[param].lat;
                lon = location[param].lon;
                if (standard.disabled) {
                    preview = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
                    previewData = await preview.json();
                } else if (metric.disabled) {
                    preview = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
                    previewData = await preview.json();
                } else if (imperial.disabled) {
                    preview = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
                    previewData = await preview.json();
                }
                let name;
                if (location[param].state != undefined) {
                    name = `<span data-lat="${lat}" data-lon="${lon}" class="searchName">${location[param].name}, ${location[param].state}, ${location[param].country} <img src="https://openweathermap.org/images/flags/${location[param].country.toLowerCase()}.png" width="22.5px" height="15px"></span>`;
                } else {
                    name = `<span data-lat="${lat}" data-lon="${lon}" class="searchName">${location[param].name}, ${location[param].country} <img src="https://openweathermap.org/images/flags/${location[param].country.toLowerCase()}.png" width="22.5px" height="15px"></span>`;
                }
                temp = `<span data-lat="${lat}" data-lon="${lon}" class="searchTemp Temp">${previewData.main.temp}</span>`;
                if (standard.disabled) {
                    unit = `<span data-lat="${lat}" data-lon="${lon}" class="Unit Kelvin">K</span>`;
                } else if (metric.disabled) {
                    unit = `<span data-lat="${lat}" data-lon="${lon}" class="Unit Metric">\u00B0C</span>`;
                } else if (imperial.disabled) {
                    unit = `<span data-lat="${lat}" data-lon="${lon}" class="Unit Metric">\u00B0F</span>`;
                }
                weathIcon = await previewData.weather[0].icon;
                weathImg = `<img data-lat="${lat}" data-lon="${lon}" class="searchCond" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weathIcon}.png" width="30px" height="30px">`;
                pos = `<span data-lat="${lat}" data-lon="${lon}" class="searchCoor">${lat.toFixed(3)}\xa0\xa0 ${lon.toFixed(3)}</span>`;
                searchItem = `${name} <span>${temp}${unit}</span> ${weathImg} ${pos}`;
                results.push(searchItem);
            }
            searchResults.innerHTML = '';
            searchResults.style.height = 'max-content';
            searchResults.style.alignItems = 'unset';
            if (previewData) {
                for (let result of results) {
                    const info = document.createElement('li');
                    info.innerHTML = result;
                    info.dataset.index = `${results.indexOf(result)}`;
                    info.dataset.lat = info.firstElementChild.dataset.lat;
                    info.dataset.lon = info.firstElementChild.dataset.lon;
                    info.addEventListener('click', weatherInfo);
                    info.classList.add('list-item');
                    searchResults.append(info);
                }
            } else {
                document.querySelector('.info').style.borderBottomRightRadius = '0';
                invalidCity.style.display = 'block';
            }
        } catch (error) {
            throw (error);;
        }
    }
};

const weatherInfo = async (event) => {
    lat = event.target.dataset.lat;
    lon = event.target.dataset.lon;
    try {
        if (standard.disabled) {
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
            conditions = await data.json();
        } else if (metric.disabled) {
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            conditions = await data.json();
        } else if (imperial.disabled) {
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
            conditions = await data.json();
        }
        searchResults.innerHTML = '';
        document.querySelector('.info').style.borderBottomRightRadius = '0';
        results = [];
        displayInfo(conditions);
    } catch (error) {
        throw (error);
    }
};

const locationInfo = async (a, b) => {
    try {
        if (standard.disabled) {
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${key}`);
            conditions = await data.json();
        } else if (metric.disabled) {
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${key}&units=metric`);
            conditions = await data.json();
        } else if (imperial.disabled) {
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${key}&units=imperial`);
            conditions = await data.json();
        }
        displayInfo(conditions);
    } catch (error) {
        throw (error);
    }
};

let date;

let time;

let timestamp = new Date().getTime();

let currentDateTime = new Date(timestamp);

let currentUnit;

let pressureSVG = `<svg viewBox="0 0 96 96" class="icon-pressure"><g data-v-7bdd0738="" transform="translate(0,96) scale(0.100000,-0.100000)" fill="#48484a" stroke="none"><path data-v-7bdd0738="" d="M351 854 c-98 -35 -179 -108 -227 -202 -27 -53 -29 -65 -29 -172 0
    -107 2 -119 29 -172 38 -75 104 -141 180 -181 58 -31 66 -32 176 -32 110 0
    118 1 175 32 77 40 138 101 178 178 31 57 32 65 32 175 0 110 -1 118 -32 176
    -40 76 -106 142 -181 179 -49 25 -71 29 -157 32 -73 2 -112 -1 -144 -13z m259
    -80 c73 -34 126 -86 161 -159 24 -50 29 -73 29 -135 0 -62 -5 -85 -29 -135
    -57 -119 -161 -185 -291 -185 -130 0 -234 66 -291 185 -24 50 -29 73 -29 135
    0 130 66 234 185 291 82 40 184 41 265 3z"></path><path data-v-7bdd0738="" d="M545 600 c-35 -35 -68 -60 -80 -60 -27 0 -45 -18 -45 -45 0 -33 -50
    -75 -89 -75 -18 0 -41 -5 -53 -11 -20 -11 -20 -11 3 -35 12 -13 33 -24 46 -24
    17 0 23 -6 23 -23 0 -13 10 -33 23 -45 30 -28 47 -13 47 43 0 32 6 47 28 68
    15 15 37 27 48 27 26 0 44 18 44 44 0 12 26 47 60 81 l60 61 -28 27 -28 27
    -59 -60z"></path></g></svg>`;

let cloudinessSVG = `<svg viewBox="0 0 512 512" class="icon-snow"><path data-v-dccd94fc="" d="M142.5 25.1C85.3 33.9 36.6 72.5 15.1 126c-8.6 21.4-11.5 39.2-10.9 65.4.4 15 1 20.1 3.2 30 4.8 20.9 12 37.5 24 55.6 9.1 13.7 29.2 34 42.6 42.9 23 15.4 49.3 25 75.3 27.6l6.7.7v73l3.4 3.4c3 3 4 3.4 8.6 3.4s5.6-.4 8.6-3.4l3.4-3.4V348h176v73.2l3.4 3.4c3 3 4 3.4 8.6 3.4s5.6-.4 8.6-3.4l3.4-3.4V348h19.3c14.8 0 21.3-.5 28.2-1.9 39.4-8.1 70.5-39.4 78.7-79.1 2.9-13.9 2.1-36.8-1.7-49.5-10.9-36.7-40.5-64.1-77.4-71.7-7.9-1.6-12.2-1.9-24.6-1.5-18.4.6-26.6 2.5-42 10.1-23.4 11.6-41.7 31.4-50.1 54.2-3.2 8.9-2.8 13.3 1.8 17.6 2.5 2.4 3.9 2.8 8.4 2.8 6.9 0 10-2.8 13.9-12.3 17-41.5 65.6-59.8 106-39.8 38 18.9 53.5 65.3 34.6 103.6-9.9 20-27.8 34.4-50.6 40.8l-8 2.2h-131c-146.5 0-140 .3-162.5-7.2-34.3-11.4-64.4-37.6-80.1-69.8-9.8-20.2-13.9-38-13.9-60.5 0-37.4 13.5-70 40.1-96.7 26.3-26.4 59.6-40.3 96.6-40.4 37 0 71 13.9 96.8 39.6 11 11.1 18.6 21.6 26.3 36.5 4.6 9 6.5 11.7 9.3 13.2 7.6 4.2 16.6-.6 17.6-9.4.4-3.8-.1-5.9-3.4-12.9-17.8-37.9-51.1-68.2-90.9-82.8-4.4-1.6-13.4-4.2-20-5.7-10.6-2.4-14.2-2.8-32.4-3-11.3-.1-23.2.2-26.5.7z"></path><path data-v-dccd94fc="" d="M259.4 387.4l-3.4 3.4v90.4l3.4 3.4c3 3 4 3.4 8.6 3.4s5.6-.4 8.6-3.4l3.4-3.4v-90.4l-3.4-3.4c-3-3-4-3.4-8.6-3.4s-5.6.4-8.6 3.4z"></path></svg>`;

const displayDetails = (object) => {
    date = currentDateTime.toLocaleDateString(userLocale, mapDateOptions);
    time = currentDateTime.toLocaleTimeString(userLocale, mapTimeOptions);
    dateDisplay.textContent = `${date}\xa0\xa0\xa0\xa0${time}`;
    posDisplay.textContent = `${object.name}, ${object.sys.country}`;
    if (standard.disabled) {
        currentUnit = `<span class="Unit Kelvin">K</span>`;
    } else if (metric.disabled) {
        currentUnit = `<span class="Unit Metric">\u00B0C</span>`;
    } else if (imperial.disabled) {
        currentUnit = `<span class="Unit Metric">\u00B0F</span>`;
    }
    currentTempDisplay.innerHTML = `<img class="currentCond" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${object.weather[0].icon}.png" width="50px" height="50px"><span class="Temp">${object.main.temp}</span>${currentUnit}`;
    currentTempDisplay.style.fontSize = '2vw';
    weatherDescription.innerHTML = `<strong>Feels like: <span class="Temp">${object.main.feels_like}</span>${currentUnit}\xa0\xa0${object.weather[0].description[0].toUpperCase() + object.weather[0].description.substring(1)}</strong>`;

    let pressure = `<div>${pressureSVG}${object.main.pressure}hPa</div>`;

    let humidity = '<div>' + `<strong>Humidity:\xa0</strong>${object.main.humidity}%` + '</div>';

    let windSpeed = `<span class="Speed">${object.wind.speed}</span>`;

    let windDirection = `<span>${object.wind.deg}\u00B0</span>`;

    let compass = `<img class="compass" src="./images/—Pngtree—compass needle_5409072.png" style="transform: rotate(${object.wind.deg}deg); height: 1.5vw;">`;

    let cloudiness = `<div><strong>Cloud\xa0${cloudinessSVG}:\xa0</strong>${object.clouds.all}%</div>`;

    let sunrise = `<div><strong>Sunrise:\xa0</strong> ${new Date(object.sys.sunrise * 1000).toLocaleTimeString(userLocale, chartTimeOptions)}</div>`;

    let sunset = `<div><strong>Sunset:\xa0</strong> ${new Date(object.sys.sunset * 1000).toLocaleTimeString(userLocale, chartTimeOptions)}</div>`;

    let visibilty;

    if (object.visibilty) {
        visibilty = `<div>${Number(object.visibilty) / 1000}km</div>`;
    } else {
        visibilty = ``;
    }

    let speedUnit;

    if (standard.disabled || metric.disabled) {
        speedUnit = `<span class="Unit Meters">m/s</span>`;
    } else if (imperial.disabled) {
        speedUnit = `<span class="Unit Miles">m/h</span>`;
    }

    weatherDetails.innerHTML = `<div>${compass}${windDirection} \xa0\xa0${windSpeed}${speedUnit}</div>${pressure}${humidity} ${cloudiness} ${sunrise} ${sunset} ${visibilty}`;
};

const displayMap = async (object) => {

    mapCont.firstElementChild.remove();

    let newMap = document.createElement('div');

    newMap.id = 'map';

    mapCont.appendChild(newMap);

    let map = await L.map('map');
    map.setView([object.coord.lat, object.coord.lon], 13);

    const baseTiles = L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    baseTiles.addTo(map);

    const tempTiles = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tempTiles.addTo(map);

    const cloudTiles = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${key}`, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const precipitationTiles = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${key}`, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const pressureTiles = L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${key}`, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const windTiles = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${key}`, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const baseLayers = {
        Temperature: tempTiles,
        Clouds: cloudTiles,
        Precipitation: precipitationTiles,
        Pressure: pressureTiles,
        Wind: windTiles
    };

    const overlays = {
    };

    const layerControlOptions = {
        hideSingleBase: true,
    };

    const layerControl = L.control.layers(baseLayers, overlays, layerControlOptions);

    layerControl.addTo(map);
};

const displayAirPollution = async (object) => {
    for (let member of canvasArray) {
        member.remove();
    }

    let airPollutionResponse = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}`);

    let xValues = [];

    let pollutionData = await airPollutionResponse.json();

    let times = pollutionData.list;

    let aqi = [];
    let co = [];
    let no = [];
    let no2 = [];
    let o3 = [];
    let so2 = [];
    let pm2_5 = [];
    let pm10 = [];
    let nh3 = [];

    const componentsArray = { co, no, no2, o3, so2, pm2_5, pm10, nh3 };

    for (let object in times) {
        xValues.push([new Date(times[object].dt * 1000).toLocaleDateString(userLocale, chartDateOptions), new Date(times[object].dt * 1000).toLocaleTimeString(userLocale, chartTimeOptions)]);
        aqi.push(times[object].main.aqi);
        co.push(times[object].components.co);
        no.push(times[object].components.no);
        no2.push(times[object].components.no2);
        o3.push(times[object].components.o3);
        so2.push(times[object].components.so2);
        pm2_5.push(times[object].components.pm2_5);
        pm10.push(times[object].components.pm10);
        nh3.push(times[object].components.nh3);
    }

    const keys = Object.keys(componentsArray);

    let newYAQICanvas = document.createElement('canvas');
    newYAQICanvas.id = `myYAQIChart`;
    newYAQICanvas.classList.add(`aqi`);
    newYAQICanvas.classList.add('chart');
    newYAQICanvas.style.zIndex = '2';
    newYAQICanvas.style.aspectRatio = 'unset';
    newYAQICanvas.style.display = 'none';
    newYAQICanvas.style.width = '65px';
    newYAQICanvas.style.height = '46.3vh';
    chartCont.insertAdjacentElement('beforebegin', newYAQICanvas);
    new Chart(`myYAQIChart`, {
        type: "line",
        data: {
            datasets: [{
                data: aqi,
                fill: false,
                yAxisID: 'y'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: true
                    },
                    reverse: true,
                    min: 1,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                },
            }
        }
    });
    let newXAQICanvas = document.createElement('canvas');
    newXAQICanvas.id = `myAQIChart`;
    newXAQICanvas.classList.add(`aqi`);
    newXAQICanvas.classList.add('chart');
    newXAQICanvas.style.aspectRatio = 'unset';
    newXAQICanvas.style.display = 'none';
    newXAQICanvas.style.width = `200vw`;
    newXAQICanvas.style.left = '30px';
    newXAQICanvas.style.height = `50vh`;
    chartCont.firstElementChild.append(newXAQICanvas);
    new Chart(`myAQIChart`, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: aqi,
                borderColor: 'beige',
                fill: false,
                yAxisID: 'y'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    titleSpacing: 4,
                    callbacks: {
                        label: function (context) {
                            let label = context.parsed.y;
                            if (label == 1) {
                                return label += ' Good';
                            } else if (label == 2) {
                                return label += ' Fair';
                            } else if (label == 3) {
                                return label += ' Moderate';
                            } else if (label == 4) {
                                return label += ' Poor';
                            } else if (label == 5) {
                                return label += ' Very Poor';
                            };
                        }
                    }
                }
            },
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        align: 'center',
                        minRotatio: 0,
                        maxRotation: 0
                    }
                },
                y: {
                    grid: {
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                        stepSize: 1
                    },
                    reverse: true,
                    min: 1,
                    max: 5
                }
            }
        }
    });
    canvasArray.push(newXAQICanvas);
    canvasArray.push(newYAQICanvas);

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'brown'];

    for (let i = 0; i < keys.length; i++) {
        let newYCanvas = document.createElement('canvas');
        newYCanvas.id = `myY${keys[i].toUpperCase()}Chart`;
        newYCanvas.classList.add(`${keys[i]}`);
        newYCanvas.classList.add('chart');
        newYCanvas.style.zIndex = '2';
        newYCanvas.style.aspectRatio = 'unset';
        newYCanvas.style.display = 'none';
        newYCanvas.style.width = '80px';
        newYCanvas.style.height = '46.3vh';
        chartCont.insertAdjacentElement('beforebegin', newYCanvas);
        new Chart(`myY${keys[i].toUpperCase()}Chart`, {
            type: "line",
            data: {
                datasets: [{
                    data: componentsArray[`${keys[i]}`],
                    fill: false,
                    yAxisID: 'y'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: true
                        }
                    },
                }
            }
        });
        let newXCanvas = document.createElement('canvas');
        newXCanvas.id = `my${keys[i].toUpperCase()}Chart`;
        newXCanvas.classList.add(`${keys[i]}`);
        newXCanvas.classList.add('chart');
        newXCanvas.style.aspectRatio = 'unset';
        newXCanvas.style.display = 'none';
        newXCanvas.style.width = `200vw`;
        newXCanvas.style.left = `50px`;
        newXCanvas.style.height = `50vh`;
        chartCont.firstElementChild.append(newXCanvas);
        new Chart(`my${keys[i].toUpperCase()}Chart`, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    data: componentsArray[`${keys[i]}`],
                    borderColor: colors[i],
                    fill: false,
                    yAxisID: 'y'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        displayColors: false,
                        titleSpacing: 4,
                        callbacks: {
                            label: function (context) {
                                let label = context.parsed.y;
                                if (context.dataset.borderColor == 'beige') {
                                    if (label == 1) {
                                        return label += ' Good';
                                    } else if (label == 2) {
                                        return label += ' Fair';
                                    } else if (label == 3) {
                                        return label += ' Moderate';
                                    } else if (label == 4) {
                                        return label += ' Poor';
                                    } else if (label == 5) {
                                        return label += ' Very Poor';
                                    };
                                }
                                if (context.parsed.y !== null) {
                                    label += `μg/m3`;
                                }
                                return label;
                            }
                        }
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            align: 'center',
                            minRotatio: 0,
                            maxRotation: 0
                        }
                    },
                    y: {
                        grid: {
                            drawTicks: false,
                        },
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
        canvasArray.push(newXCanvas);
        canvasArray.push(newYCanvas);
    }

    const visibleMap = Math.floor(Math.random() * 8);

    chartRadios[visibleMap].checked = true;

    charts = document.querySelectorAll('.chart');

    displayCharts();
};

const displayCharts = () => {
    for (let chart of charts) {
        chart.style.display = 'none';
    }
    for (const radio of chartRadios) {
        let component = radio.id.toUpperCase();
        if (radio.checked) {
            document.querySelector(`#myY${component}Chart`).style.display = 'inline-block';
            document.querySelector(`#my${component}Chart`).style.display = 'inline-block';
        }
    }
};

let forecastResponse;

let forecastData;

let day1;
let day2;
let day3;
let day4;
let day5;
let daysList;

const displayDay = async (object) => {
    let max;
    let min;
    let descriptionText;
    let description;
    let daysItems;
    for (let member of forecastArray) {
        member.remove();
    }
    if (standard.disabled) {
        forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}`);
    } else if (metric.disabled) {
        forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}&units=metric`);
    } else if (imperial.disabled) {
        forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}&units=imperial`);
    }

    forecastData = await forecastResponse.json();

    let days = forecastData.list;
    day1 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day2 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day3 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day4 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day5 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    for (let i = 0; i <= 7; i++) {
        day1.date.push(days[i].dt);
        day1.temp.push(days[i].main.temp);
        day1.feelsLike.push(days[i].main.feels_like);
        day1.pressure.push(days[i].main.pressure);
        day1.humidity.push(days[i].main.humidity);
        day1.clouds.push(days[i].clouds.all);
        day1.wind.speed.push(days[i].wind.speed);
        day1.wind.direction.push(days[i].wind.deg);
        day1.visibilty.push(days[i].visibilty);
        day1.description.push(days[i].weather[0].description);
    }
    for (let i = 8; i <= 15; i++) {
        day2.date.push(days[i].dt);
        day2.temp.push(days[i].main.temp);
        day2.feelsLike.push(days[i].main.feels_like);
        day2.pressure.push(days[i].main.pressure);
        day2.humidity.push(days[i].main.humidity);
        day2.clouds.push(days[i].clouds.all);
        day2.wind.speed.push(days[i].wind.speed);
        day2.wind.direction.push(days[i].wind.deg);
        day2.visibilty.push(days[i].visibilty);
        day2.description.push(days[i].weather[0].description);
    }
    for (let i = 16; i <= 23; i++) {
        day3.date.push(days[i].dt);
        day3.temp.push(days[i].main.temp);
        day3.feelsLike.push(days[i].main.feels_like);
        day3.pressure.push(days[i].main.pressure);
        day3.humidity.push(days[i].main.humidity);
        day3.clouds.push(days[i].clouds.all);
        day3.wind.speed.push(days[i].wind.speed);
        day3.wind.direction.push(days[i].wind.deg);
        day3.visibilty.push(days[i].visibilty);
        day3.description.push(days[i].weather[0].description);
    }
    for (let i = 24; i <= 31; i++) {
        day4.date.push(days[i].dt);
        day4.temp.push(days[i].main.temp);
        day4.feelsLike.push(days[i].main.feels_like);
        day4.pressure.push(days[i].main.pressure);
        day4.humidity.push(days[i].main.humidity);
        day4.clouds.push(days[i].clouds.all);
        day4.wind.speed.push(days[i].wind.speed);
        day4.wind.direction.push(days[i].wind.deg);
        day4.visibilty.push(days[i].visibilty);
        day4.description.push(days[i].weather[0].description);
    }
    for (let i = 32; i <= 39; i++) {
        day5.date.push(days[i].dt);
        day5.temp.push(days[i].main.temp);
        day5.feelsLike.push(days[i].main.feels_like);
        day5.pressure.push(days[i].main.pressure);
        day5.humidity.push(days[i].main.humidity);
        day5.clouds.push(days[i].clouds.all);
        day5.wind.speed.push(days[i].wind.speed);
        day5.wind.direction.push(days[i].wind.deg);
        day5.visibilty.push(days[i].visibilty);
        day5.description.push(days[i].weather[0].description);
    }
    daysList = [day1, day2, day3, day4, day5];
    for (let i = 0; i < daysList.length; i++) {
        daysList[i].max = Math.max(...daysList[i].temp);
        daysList[i].min = Math.min(...daysList[i].temp);
        let newDayList = document.createElement('li');
        newDayList.classList.add('forecastDay');
        newDayList.classList.add('closed');
        newDayList.classList.add('dayTile');
        newDayList.id = `day${i + 1}`;
        newDayList.dataset.day = `${i + 1}`;
        date = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastDate">${new Date(daysList[i].date[i] * 1000).toLocaleDateString(userLocale, mapDateOptions)}</span>`;
        max = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastTempMax forecastWeather Temp">${daysList[i].max}</span>`;
        min = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastTempMin forecastWeather Temp">${daysList[i].min}</span>`;
        if (standard.disabled) {
            unit = `<span data-day="${i + 1}" id='day${i + 1}' class="Unit Kelvin">K</span>`;
        } else if (metric.disabled) {
            unit = `<span data-day="${i + 1}" id='day${i + 1}' class="Unit Metric">\u00B0C</span>`;
        } else if (imperial.disabled) {
            unit = `<span data-day="${i + 1}" id='day${i + 1}' class="Unit Metric">\u00B0F</span>`;
        }
        descriptionText = daysList[i].description[0];
        weathIcon = days[i].weather[0].icon;
        weathImg = `<img data-day="${i + 1}" id='day${i + 1}' class="forecastIcon" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weathIcon}.png">`;
        description = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastDescription">${descriptionText[0].toUpperCase() + descriptionText.substring(1)}</span>`;
        let dayInfo = `${date} <span data-day="${i + 1}" id='day${i + 1}' class="forecastWeather">${max}/${min}${unit}${weathImg}</span> ${description}`;
        newDayList.innerHTML = dayInfo;
        forecastList.style.flexDirection = 'column';
        forecastList.append(newDayList);
    }
    let icons = document.getElementsByClassName('forecastWeather');
    let descriptions = document.getElementsByClassName('forecastDescription');
    for (let icon of icons) {
        icon.style.display = 'flex';
    }
    for (let description of descriptions) {
        description.style.display = 'flex';
    }
    for (let member of daysList) {
        let i = daysList.indexOf(member) + 1;
        let x1Values = [];
        let x2Values = [];
        let yValues = [];
        let speedUnit;
        let memberDescriptionText = member.description[i];
        if (standard.disabled || metric.disabled) {
            speedUnit = `m/s`;
        } else if (imperial.disabled) {
            speedUnit = `m/h`;
        }
        for (let i = 0; i < member.temp.length; i++) {
            yValues.push(member.temp[i]);
            x1Values.push([new Date(member.date[i] * 1000).toLocaleDateString(userLocale, chartDateOptions), new Date(member.date[i] * 1000).toLocaleTimeString(userLocale, chartTimeOptions)]);
            x2Values.push(memberDescriptionText[0].toUpperCase() + memberDescriptionText.substring(1));
        }
        let data = {
            datasets: [{
                data: yValues,
                borderColor: 'rgb(113, 30, 190)',
                fill: false,
                xAxisID: 'x',
                yAxisID: 'y',
                tension: 0.5
            },
            {
                data: yValues,
                borderColor: 'none',
                fill: false,
                xAxisID: 'x2',
                yAxisID: 'y2',
                tension: 0.5,
                showLine: false
            }]
        };
        let YCanvas = document.createElement('canvas');
        YCanvas.id = `day${i}YChart`;
        YCanvas.classList.add(`day${i}`);
        YCanvas.classList.add('forecastYChart');
        YCanvas.style.zIndex = '2';
        YCanvas.style.display = 'none';
        YCanvas.style.width = '65px';
        YCanvas.style.height = '44.1vh';
        forecastChartCont.insertAdjacentElement('beforebegin', YCanvas);
        new Chart(`day${i}YChart`, {
            type: "line",
            data: {
                datasets: [{
                    data: yValues,
                    fill: false,
                    yAxisID: 'y'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: true
                        }
                    },
                }
            }
        });
        let forecastChart = document.createElement('canvas');
        forecastChart.id = `day${i}Chart`;
        forecastChart.classList.add(`day${i}`);
        forecastChart.classList.add('forecastChart');
        forecastChart.style.aspectRatio = 'unset';
        forecastChart.style.display = 'none';
        forecastChart.style.top = '0';
        forecastChart.style.width = '50vw';
        forecastChart.style.height = '50vh';
        forecastChartCont.firstElementChild.append(forecastChart);
        new Chart(`day${i}Chart`, {
            type: "line",
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        labels: x1Values,
                        ticks: {
                            align: 'center',
                            minRotatio: 0,
                            maxRotation: 0,
                            autoSkip: false
                        },
                        position: 'bottom',
                        display: true
                    },
                    y: {
                        grid: {
                            drawTicks: true,
                        },
                        ticks: {
                            display: false
                        }
                    },
                    x2: {
                        type: 'category',
                        labels: x2Values,
                        ticks: {
                            align: 'center',
                            minRotatio: 0,
                            maxRotation: 0,
                            autoSkip: false
                        },
                        position: 'top',
                        display: true
                    },
                    y2: {
                        position: 'right',
                        display: false
                    }
                }
            }
        });
        forecastArray.push(YCanvas);
        forecastArray.push(forecastChart);
    }
    daysItems = document.querySelectorAll('.forecastDay');
    for (let day of daysItems) {
        day.addEventListener('click', displayDayChart);
    }
};

const displayDayChart = (event) => {
    let dayID = event.target.id;
    let activeDayList = event.target.dataset.day;
    let dayTiles = document.getElementsByClassName('dayTile');
    let forecastCharts = document.getElementsByClassName('forecastChart');
    let forecastYCharts = document.getElementsByClassName('forecastYChart');
    for (let chart of forecastCharts) {
        chart.style.display = 'none';
    }
    for (let chart of forecastYCharts) {
        chart.style.display = 'none';
    }
    let dates = document.getElementsByClassName('forecastDate');
    let icons = document.getElementsByClassName('forecastWeather');
    let descriptions = document.getElementsByClassName('forecastDescription');
    if (forecastList.dataset.activeDay == activeDayList) {
        forecastList.dataset.activeDay = '0';;
        forecastList.style.flexDirection = 'column';
        dayCont.style.display = 'none';
        for (let tile of dayTiles) {
            tile.classList.remove('dayRow');
            tile.classList.remove('open');
            tile.classList.add('closed');
        }
        for (let icon of icons) {
            icon.style.display = 'flex';
        }
        for (let description of descriptions) {
            description.style.display = 'flex';
        }
        for (let date of dates) {
            date.classList.remove('dateRow');
        }
        document.getElementById(`${dayID}Chart`).style.display = 'none';
        document.getElementById(`${dayID}YChart`).style.display = 'none';
    } else {
        forecastList.dataset.activeDay = activeDayList;
        forecastList.style.flexDirection = 'row';
        dayCont.style.display = 'block';
        for (let tile of dayTiles) {
            tile.classList.add('dayRow');
            tile.classList.add('open');
            tile.classList.remove('closed');
        }
        for (let icon of icons) {
            icon.style.display = 'none';
        }
        for (let description of descriptions) {
            description.style.display = 'none';
        }
        for (let date of dates) {
            date.classList.add('dateRow');
        }
        document.getElementById(`${dayID}Chart`).style.display = 'inline-block';
        document.getElementById(`${dayID}YChart`).style.display = 'inline-block';
    }
    let currentUnit;
    if (standard.disabled) {
        currentUnit = `<span class="Unit Kelvin">K</span>`;
    } else if (metric.disabled) {
        currentUnit = `<span class="Unit Metric">\u00B0C</span>`;
    } else if (imperial.disabled) {
        currentUnit = `<span class="Unit Metric">\u00B0F</span>`;
    }

    let speedUnit;

    if (standard.disabled || metric.disabled) {
        speedUnit = `<span class="Unit Meters">m/s</span>`;
    } else if (imperial.disabled) {
        speedUnit = `<span class="Unit Miles">m/h</span>`;
    }
    let tempRange = document.getElementById('tempRange');
    let activeIndex = +dayID[3] - 1;
    let activeDay = daysList[activeIndex];
    tempRange.innerHTML = `<h3 style="margin: 0;">The high will be <strong>${activeDay.max}${currentUnit}</strong> and the low will be <strong>${activeDay.min}${currentUnit}</strong></h3>`;
    let pressureSum = 0;
    for (let pressure of activeDay.pressure) {
        pressureSum += pressure;
    }
    let pressureAvg = (pressureSum / activeDay.pressure.length).toFixed(0);

    let pressure = `<div>${pressureSVG}${pressureAvg}hPa</div>`;

    let humiditySum = 0;
    for (let humidity of activeDay.humidity) {
        humiditySum += humidity;
    }
    let humidityAvg = (humiditySum / activeDay.humidity.length).toFixed(0);

    let humidity = '<div>' + `<strong>Humidity:\xa0</strong>${humidityAvg}%` + '</div>';

    let windSpeedSum = 0;
    for (let windSpeed of activeDay.wind.speed) {
        windSpeedSum += windSpeed;
    }
    let windSpeedAvg = (windSpeedSum / activeDay.wind.speed.length).toFixed(0);

    let windSpeed = `<span class="Speed">${windSpeedAvg}</span>`;

    let windDirectionSum = 0;
    for (let windDirection of activeDay.wind.direction) {
        windDirectionSum += windDirection;
    }
    let windDirectionAvg = (windDirectionSum / activeDay.wind.direction.length).toFixed(0);

    let windDirection = `<span>${windDirectionAvg}\u00B0</span>`;

    let compass = `<img class="compass" src="./images/—Pngtree—compass needle_5409072.png" style="transform: rotate(${windDirectionAvg}deg); height: 1.5vw;">`;

    let cloudinessSum = 0;
    for (let cloudiness of activeDay.clouds) {
        cloudinessSum += cloudiness;
    }
    let cloudinessAvg = (cloudinessSum / activeDay.clouds.length).toFixed(0);

    let cloudiness = `<div><strong>Cloud\xa0${cloudinessSVG}:\xa0</strong>${cloudinessAvg}%</div>`;

    document.querySelector('.morningTemp').innerHTML = `${activeDay.temp[2]}${currentUnit}`;

    document.querySelector('.afternoonTemp').innerHTML = `${activeDay.temp[4]}${currentUnit}`;

    document.querySelector('.nightTemp').innerHTML = `${activeDay.temp[6]}${currentUnit}`;

    document.querySelector('.morningFeel').innerHTML = `${activeDay.feelsLike[2]}${currentUnit}`;

    document.querySelector('.afternoonFeel').innerHTML = `${activeDay.feelsLike[4]}${currentUnit}`;

    document.querySelector('.nightFeel').innerHTML = `${activeDay.feelsLike[6]}${currentUnit}`;

    document.getElementById('dayDetails').innerHTML = `<div>${compass}${windDirection} \xa0\xa0${windSpeed}${speedUnit}</div>${pressure}${humidity} ${cloudiness}`;
};

const displayInfo = async (object) => {
    for (let member of forecastArray) {
        member.remove();
    }

    forecastList.innerHTML = '';

    displayDetails(object);

    displayMap(object);

    displayAirPollution(object);

    displayDay(object);
};

const disableButton = (event) => {
    if (event.target.nodeName === 'BUTTON') {
        cover.style.left = event.target.offsetLeft + 'px';
        cover.style.width = event.target.offsetWidth + 'px';
    }
};

const toStandard = (event) => {
    event.preventDefault();
    let tempElements = document.getElementsByClassName('Temp');
    let speedElement = document.querySelector('.Speed');
    let units = document.getElementsByClassName('Unit');
    for (let ele of tempElements) {
        let temp = Number(ele.textContent);
        if (metric.disabled) {
            ele.textContent = (temp + 273).toFixed(2);
        } else if (imperial.disabled) {
            ele.textContent = (((temp - 32) / 1.8) + 273).toFixed(2);
        }
        for (let unit of units) {
            if (unit.classList.contains('Metric')) {
                unit.classList.remove('Metric');
                unit.classList.add('Kelvin');
                unit.textContent = 'K';
            } else if (unit.classList.contains('Imperial')) {
                unit.classList.remove('Imperial');
                unit.classList.add('Kelvin');
                unit.textContent = 'K';
            }
        }
    }
    let speed = Number(speedElement.textContent);
    let unit = speedElement.nextElementSibling;
    if (unit.classList.contains('Miles')) {
        unit.classList.remove('Miles');
        unit.classList.add('Meters');
        speedElement.textContent = (speed * 2.23694).toFixed(2);
        unit.innerHTML = `m/s`;
    }

    standard.disabled = true;
    standard.classList.add('disabled');
    metric.disabled = false;
    metric.classList.remove('disabled');
    imperial.disabled = false;
    imperial.classList.remove('disabled');
};

const toMetric = (event) => {
    event.preventDefault();
    let tempElements = document.getElementsByClassName('Temp');
    let speedElement = document.querySelector('.Speed');
    let units = document.getElementsByClassName('Unit');
    for (let ele of tempElements) {
        let temp = Number(ele.textContent);
        if (standard.disabled) {
            ele.textContent = (temp - 273).toFixed(2);
        } else if (imperial.disabled) {
            ele.textContent = ((temp - 32) / 1.8).toFixed(2);
        }
    }
    for (let unit of units) {
        if (unit.classList.contains('Kelvin')) {
            unit.classList.remove('Kelvin');
            unit.classList.add('Metric');
            unit.textContent = '\u00B0C';
        } else if (unit.classList.contains('Imperial')) {
            unit.classList.remove('Imperial');
            unit.classList.add('Metric');
            unit.textContent = '\u00B0C';
        }
    }
    let speed = Number(speedElement.textContent);
    let unit = speedElement.nextElementSibling;
    if (unit.classList.contains('Miles')) {
        unit.classList.remove('Miles');
        unit.classList.add('Meters');
        speedElement.textContent = (speed * 2.23694).toFixed(2);
        unit.innerHTML = `m/s`;
    }

    standard.disabled = false;
    standard.classList.remove('disabled');
    metric.disabled = true;
    metric.classList.add('disabled');
    imperial.disabled = false;
    imperial.classList.remove('disabled');
};

const toImperial = (event) => {
    event.preventDefault();
    let tempElements = document.getElementsByClassName('Temp');
    let speedElement = document.querySelector('.Speed');
    let units = document.getElementsByClassName('Unit');
    for (let ele of tempElements) {
        let temp = Number(ele.textContent);
        if (standard.disabled) {
            ele.textContent = (((temp - 273) * 1.8) + 32).toFixed(2);
        } else if (metric.disabled) {
            ele.textContent = ((temp * 1.8) + 32).toFixed(2);
        }
    }
    for (let unit of units) {
        if (unit.classList.contains('Kelvin')) {
            unit.classList.remove('Kelvin');
            unit.classList.add('Imperial');
            unit.textContent = '\u00B0F';
        } else if (unit.classList.contains('Metric')) {
            unit.classList.remove('Metric');
            unit.classList.add('Imperial');
            unit.textContent = '\u00B0F';
        }
    }
    let speed = Number(speedElement.textContent);
    let unit = speedElement.nextElementSibling;
    if (unit.classList.contains('Meters')) {
        unit.classList.remove('Meters');
        unit.classList.add('Miles');
        speedElement.textContent = (speed / 2.23694).toFixed(2);
        unit.innerHTML = `m/h`;
    }

    standard.disabled = false;
    standard.classList.remove('disabled');
    metric.disabled = false;
    metric.classList.remove('disabled');
    imperial.disabled = true;
    imperial.classList.add('disabled');
};

const changeDay = async () => {
    for (let member of forecastArray) {
        member.remove();
    }
    forecastList.innerHTML = '';
    dayCont.style.display = 'none';
    let max;
    let min;
    let descriptionText;
    let description;
    let daysItems;
    if (standard.disabled) {
        forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    } else if (metric.disabled) {
        forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    } else if (imperial.disabled) {
        forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
    }

    forecastData = await forecastResponse.json();

    let days = forecastData.list;
    day1 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day2 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day3 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day4 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    day5 = {
        date: [],
        temp: [],
        feelsLike: [],
        pressure: [],
        humidity: [],
        clouds: [],
        wind: {
            speed: [],
            direction: []
        },
        visibilty: [],
        description: []
    };
    for (let i = 0; i <= 7; i++) {
        day1.date.push(days[i].dt);
        day1.temp.push(days[i].main.temp);
        day1.feelsLike.push(days[i].main.feels_like);
        day1.pressure.push(days[i].main.pressure);
        day1.humidity.push(days[i].main.humidity);
        day1.clouds.push(days[i].clouds.all);
        day1.wind.speed.push(days[i].wind.speed);
        day1.wind.direction.push(days[i].wind.deg);
        day1.visibilty.push(days[i].visibilty);
        day1.description.push(days[i].weather[0].description);
    }
    for (let i = 8; i <= 15; i++) {
        day2.date.push(days[i].dt);
        day2.temp.push(days[i].main.temp);
        day2.feelsLike.push(days[i].main.feels_like);
        day2.pressure.push(days[i].main.pressure);
        day2.humidity.push(days[i].main.humidity);
        day2.clouds.push(days[i].clouds.all);
        day2.wind.speed.push(days[i].wind.speed);
        day2.wind.direction.push(days[i].wind.deg);
        day2.visibilty.push(days[i].visibilty);
        day2.description.push(days[i].weather[0].description);
    }
    for (let i = 16; i <= 23; i++) {
        day3.date.push(days[i].dt);
        day3.temp.push(days[i].main.temp);
        day3.feelsLike.push(days[i].main.feels_like);
        day3.pressure.push(days[i].main.pressure);
        day3.humidity.push(days[i].main.humidity);
        day3.clouds.push(days[i].clouds.all);
        day3.wind.speed.push(days[i].wind.speed);
        day3.wind.direction.push(days[i].wind.deg);
        day3.visibilty.push(days[i].visibilty);
        day3.description.push(days[i].weather[0].description);
    }
    for (let i = 24; i <= 31; i++) {
        day4.date.push(days[i].dt);
        day4.temp.push(days[i].main.temp);
        day4.feelsLike.push(days[i].main.feels_like);
        day4.pressure.push(days[i].main.pressure);
        day4.humidity.push(days[i].main.humidity);
        day4.clouds.push(days[i].clouds.all);
        day4.wind.speed.push(days[i].wind.speed);
        day4.wind.direction.push(days[i].wind.deg);
        day4.visibilty.push(days[i].visibilty);
        day4.description.push(days[i].weather[0].description);
    }
    for (let i = 32; i <= 39; i++) {
        day5.date.push(days[i].dt);
        day5.temp.push(days[i].main.temp);
        day5.feelsLike.push(days[i].main.feels_like);
        day5.pressure.push(days[i].main.pressure);
        day5.humidity.push(days[i].main.humidity);
        day5.clouds.push(days[i].clouds.all);
        day5.wind.speed.push(days[i].wind.speed);
        day5.wind.direction.push(days[i].wind.deg);
        day5.visibilty.push(days[i].visibilty);
        day5.description.push(days[i].weather[0].description);
    }
    daysList = [day1, day2, day3, day4, day5];
    for (let i = 0; i < daysList.length; i++) {
        daysList[i].max = Math.max(...daysList[i].temp);
        daysList[i].min = Math.min(...daysList[i].temp);
        let newDayList = document.createElement('li');
        newDayList.classList.add('forecastDay');
        newDayList.classList.add('closed');
        newDayList.classList.add('dayTile');
        newDayList.id = `day${i + 1}`;
        newDayList.dataset.day = `${i + 1}`;
        date = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastDate">${new Date(daysList[i].date[i] * 1000).toLocaleDateString(userLocale, mapDateOptions)}</span>`;
        max = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastTempMax forecastWeather Temp">${daysList[i].max}</span>`;
        min = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastTempMin forecastWeather Temp">${daysList[i].min}</span>`;
        if (standard.disabled) {
            unit = `<span data-day="${i + 1}" id='day${i + 1}' class="Unit Kelvin">K</span>`;
        } else if (metric.disabled) {
            unit = `<span data-day="${i + 1}" id='day${i + 1}' class="Unit Metric">\u00B0C</span>`;
        } else if (imperial.disabled) {
            unit = `<span data-day="${i + 1}" id='day${i + 1}' class="Unit Metric">\u00B0F</span>`;
        }
        descriptionText = daysList[i].description[0];
        weathIcon = days[i].weather[0].icon;
        weathImg = `<img data-day="${i + 1}" id='day${i + 1}' class="forecastIcon" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weathIcon}.png">`;
        description = `<span data-day="${i + 1}" id='day${i + 1}' class="forecastDescription">${descriptionText[0].toUpperCase() + descriptionText.substring(1)}</span>`;
        let dayInfo = `${date} <span data-day="${i + 1}" id='day${i + 1}' class="forecastWeather">${max}/${min}${unit}${weathImg}</span> ${description}`;
        newDayList.innerHTML = dayInfo;
        forecastList.style.flexDirection = 'column';
        forecastList.append(newDayList);
    }
    let icons = document.getElementsByClassName('forecastWeather');
    let descriptions = document.getElementsByClassName('forecastDescription');
    for (let icon of icons) {
        icon.style.display = 'flex';
    }
    for (let description of descriptions) {
        description.style.display = 'flex';
    }
    for (let member of daysList) {
        let i = daysList.indexOf(member) + 1;
        let x1Values = [];
        let x2Values = [];
        let yValues = [];
        let speedUnit;
        let memberDescriptionText = member.description[i];
        if (standard.disabled || metric.disabled) {
            speedUnit = `m/s`;
        } else if (imperial.disabled) {
            speedUnit = `m/h`;
        }
        for (let i = 0; i < member.temp.length; i++) {
            let wind = `${member.wind.speed[i]}${speedUnit},\xa0${member.wind.direction[i]}\u00B0`;
            yValues.push(member.temp[i]);
            x1Values.push([new Date(member.date[i] * 1000).toLocaleDateString(userLocale, chartDateOptions), new Date(member.date[i] * 1000).toLocaleTimeString(userLocale, chartTimeOptions)]);
            x2Values.push(memberDescriptionText[0].toUpperCase() + memberDescriptionText.substring(1));
        }
        let data = {
            datasets: [{
                data: yValues,
                borderColor: 'rgb(113, 30, 190)',
                fill: false,
                xAxisID: 'x',
                yAxisID: 'y',
                tension: 0.5
            },
            {
                data: yValues,
                borderColor: 'none',
                fill: false,
                xAxisID: 'x2',
                yAxisID: 'y2',
                tension: 0.5,
                showLine: false
            }]
        };
        let YCanvas = document.createElement('canvas');
        YCanvas.id = `day${i}YChart`;
        YCanvas.classList.add(`day${i}`);
        YCanvas.classList.add('forecastYChart');
        YCanvas.style.zIndex = '2';
        YCanvas.style.display = 'none';
        YCanvas.style.width = '65px';
        YCanvas.style.height = '44.1vh';
        forecastChartCont.insertAdjacentElement('beforebegin', YCanvas);
        new Chart(`day${i}YChart`, {
            type: "line",
            data: {
                datasets: [{
                    data: yValues,
                    fill: false,
                    yAxisID: 'y'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: true
                        }
                    },
                }
            }
        });
        let forecastChart = document.createElement('canvas');
        forecastChart.id = `day${i}Chart`;
        forecastChart.classList.add(`day${i}`);
        forecastChart.classList.add('forecastChart');
        forecastChart.style.aspectRatio = 'unset';
        forecastChart.style.display = 'none';
        forecastChart.style.top = '0';
        forecastChart.style.width = '50vw';
        forecastChart.style.height = '50vh';
        forecastChartCont.firstElementChild.append(forecastChart);
        new Chart(`day${i}Chart`, {
            type: "line",
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        labels: x1Values,
                        ticks: {
                            align: 'center',
                            minRotatio: 0,
                            maxRotation: 0,
                            autoSkip: false
                        },
                        position: 'bottom',
                        display: true
                    },
                    y: {
                        grid: {
                            drawTicks: true,
                        },
                        ticks: {
                            display: false
                        }
                    },
                    x2: {
                        type: 'category',
                        labels: x2Values,
                        ticks: {
                            align: 'center',
                            minRotatio: 0,
                            maxRotation: 0,
                            autoSkip: false
                        },
                        position: 'top',
                        display: true
                    },
                    y2: {
                        position: 'right',
                        display: false
                    }
                }
            }
        });
        forecastArray.push(YCanvas);
        forecastArray.push(forecastChart);
    }
    daysItems = document.querySelectorAll('.forecastDay');
    for (let day of daysItems) {
        day.addEventListener('click', displayDayChart);
    }
};

const successCallback = async (position) => {
    lat = position.coords.latitude.toFixed(3);
    lon = position.coords.longitude.toFixed(3);
    locationInfo(lat, lon);
};

for (let radio of chartRadios) {
    radio.addEventListener('change', displayCharts);
}

let locate = () => {
    navigator.geolocation.getCurrentPosition(successCallback);
};

navigator.geolocation.getCurrentPosition(successCallback);

standard.disabled = true;

standard.classList.add('disabled');

cover.style.left = standard.offsetLeft + 'px';

cover.style.width = standard.offsetWidth + 'px';

search.addEventListener('click', geoResults);

buttonCont.addEventListener('click', disableButton);

locationSearchButton.addEventListener('click', () => {
    event.preventDefault();
    locate();
});

standard.addEventListener('click', toStandard);

metric.addEventListener('click', toMetric);

imperial.addEventListener('click', toImperial);

standard.addEventListener('click', changeDay);

metric.addEventListener('click', changeDay);

imperial.addEventListener('click', changeDay);

window.addEventListener('resize', () => location.reload());