import React, {useEffect, useRef, useState} from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AirPollutionChart from "../components/AirPollutionChart";
import DayChart from "../components/DayChart";
import needle from "../assets/images/—Pngtree—compass needle_5409072.png";
import Gradient from "../js/Gradient";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import Logo from "../assets/images/4052984.png";

const Weather = () => {
	let [chartData, setChartData] = useState();
	let [chartStroke, setChartStroke] = useState("red");
	let [datasets, setDatasets] = useState({});
	let [dayChart, setDayChart] = useState();
	let daySets;
	const key = "3aa3f35e1a73608e6ab3f0cad3aa4e08";
	let searchResults = useRef();
	let searchBar = useRef();
	let invalidCity = useRef();
	let search = useRef();
	let buttonCont = useRef();
	let locationSearchButton = useRef();
	let cover = useRef();
	let standard = useRef();
	let metric = useRef();
	let imperial = useRef();
	let dateDisplay = useRef();
	let posDisplay = useRef();
	let currentTempDisplay = useRef();
	let weatherDescription = useRef();
	let weatherDetails = useRef();
	let mapCont = useRef();
	let chartRadios = [
		{id: "aqi", base: ""},
		{id: "co", base: ""},
		{id: "no", base: ""},
		{id: "no", base: "2"},
		{id: "o", base: "3"},
		{id: "so", base: "2"},
		{id: "pm", base: "2_5"},
		{id: "pm", base: "10"},
		{id: "nh", base: "3"},
	];
	let forecastList = useRef();
	let dayCont = useRef();
	let forecastChartCont = useRef();
	let results = [];
	let forecastArray = [];
	let lat;
	let lon;
	let data;
	let conditions;
	let temp;
	let unit;
	let weathIcon;
	let weathImg;
	let pos;
	let searchItem;
	const userLocale =
		navigator.languages && navigator.languages.length
			? navigator.languages[0]
			: navigator.language;
	const mapDateOptions = {
		weekday: "short",
		month: "short",
		day: "2-digit",
		year: "numeric",
	};
	const mapTimeOptions = {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};
	const chartDateOptions = {
		month: "short",
		day: "2-digit",
		year: "numeric",
	};
	const chartTimeOptions = {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	};
	const loading = () => {
		document.querySelector(".info").style.borderBottomRightRadius = "1vh";
		searchResults.current.style.height = "5vh";
		searchResults.current.innerHTML = '<div class="loading"></div>';
		searchResults.current.style.display = "flex";
		searchResults.current.style.alignItems = "center";
	};
	const geoResults = async (event) => {
		event.preventDefault();
		if (!searchBar.current.value) {
			searchResults.current.innerHTML = "Please enter a city!";
			searchResults.current.style.textAlign = "center";
		} else {
			try {
				results = [];
				let city = searchBar.current.value;
				event.preventDefault();
				searchResults.current.innerHTML = "";
				loading();
				const geo = await fetch(
					`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=4&appid=${key}`,
				);
				const location = await geo.json();
				let preview;
				let previewData;
				for (let param in location) {
					lat = location[param].lat;
					lon = location[param].lon;
					if (standard.current.disabled) {
						preview = await fetch(
							`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`,
						);
						previewData = await preview.json();
					} else if (metric.current.disabled) {
						preview = await fetch(
							`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
						);
						previewData = await preview.json();
					} else if (imperial.current.disabled) {
						preview = await fetch(
							`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`,
						);
						previewData = await preview.json();
					}
					let name;
					if (location[param].state !== undefined) {
						name = `<span data-lat="${lat}" data-lon="${lon}" class="searchName">${
							location[param].name
						}, ${location[param].state}, ${
							location[param].country
						} <img class="searchFlag" src="https://openweathermap.org/images/flags/${location[
							param
						].country.toLowerCase()}.png" width="22.5px" height="15px"></span>`;
					} else {
						name = `<span data-lat="${lat}" data-lon="${lon}" class="searchName">${
							location[param].name
						}, ${
							location[param].country
						} <img class="searchFlag" src="https://openweathermap.org/images/flags/${location[
							param
						].country.toLowerCase()}.png" width="22.5px" height="15px"></span>`;
					}
					temp = `<span data-lat="${lat}" data-lon="${lon}" class="searchTemp Temp">${previewData.main.temp}</span>`;
					if (standard.current.disabled) {
						unit = `<span data-lat="${lat}" data-lon="${lon}" class="Unit Kelvin">K</span>`;
					} else if (metric.current.disabled) {
						unit = `<span data-lat="${lat}" data-lon="${lon}" class="Unit Metric">\u00B0C</span>`;
					} else if (imperial.current.disabled) {
						unit = `<span data-lat="${lat}" data-lon="${lon}" class="Unit Metric">\u00B0F</span>`;
					}
					weathIcon = await previewData.weather[0].icon;
					weathImg = `<img data-lat="${lat}" data-lon="${lon}" class="searchCond" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weathIcon}.png" width="30px" height="30px">`;
					pos = `<span data-lat="${lat}" data-lon="${lon}" class="searchCoor">${lat.toFixed(
						3,
					)}\xa0\xa0 ${lon.toFixed(3)}</span>`;
					searchItem = `${name} <span>${temp}${unit}</span> ${weathImg} ${pos}`;
					results.push(searchItem);
				}
				searchResults.current.innerHTML = "";
				searchResults.current.style.height = "max-content";
				searchResults.current.style.alignItems = "unset";
				if (previewData) {
					for (let result of results) {
						const info = document.createElement("li");
						info.innerHTML = result;
						info.dataset.index = `${results.indexOf(result)}`;
						info.dataset.lat = info.firstElementChild.dataset.lat;
						info.dataset.lon = info.firstElementChild.dataset.lon;
						info.addEventListener("click", weatherInfo);
						info.classList.add("list-item");
						searchResults.current.append(info);
					}
				} else {
					document.querySelector(
						".info",
					).style.borderBottomRightRadius = "0";
					searchResults.current.innerHTML = "City not found!";
					searchResults.current.style.textAlign = "center";
				}
			} catch (error) {
				throw error;
			}
		}
	};
	const weatherInfo = async (event) => {
		lat = event.target.dataset.lat;
		lon = event.target.dataset.lon;
		try {
			if (standard.current.disabled) {
				data = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`,
				);
				conditions = await data.json();
			} else if (metric.current.disabled) {
				data = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
				);
				conditions = await data.json();
			} else if (imperial.current.disabled) {
				data = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`,
				);
				conditions = await data.json();
			}
			searchResults.current.innerHTML = "";
			document.querySelector(".info").style.borderBottomRightRadius = "0";
			results = [];
			displayInfo(conditions);
		} catch (error) {
			throw error;
		}
	};
	const locationInfo = async (a, b) => {
		try {
			if (standard.current.disabled) {
				data = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${key}`,
				);
				conditions = await data.json();
			} else if (metric.current.disabled) {
				data = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${key}&units=metric`,
				);
				conditions = await data.json();
			} else if (imperial.current.disabled) {
				data = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${key}&units=imperial`,
				);
				conditions = await data.json();
			}
			await displayInfo(conditions);
		} catch (error) {
			throw error;
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
		dateDisplay.current.textContent = `${date}\xa0\xa0\xa0\xa0${time}`;
		posDisplay.current.textContent = `${object.name}, ${object.sys.country}`;
		if (standard.current.disabled) {
			currentUnit = `<span class="Unit Kelvin">K</span>`;
		} else if (metric.current.disabled) {
			currentUnit = `<span class="Unit Metric">\u00B0C</span>`;
		} else if (imperial.current.disabled) {
			currentUnit = `<span class="Unit Metric">\u00B0F</span>`;
		}
		currentTempDisplay.current.innerHTML = `<img class="currentCond" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${object.weather[0].icon}.png" width="50px" height="50px"><span class="Temp">${object.main.temp}</span>${currentUnit}`;
		currentTempDisplay.current.style.fontSize = "2vw";
		weatherDescription.current.innerHTML = `<strong>Feels like: <span class="Temp">${
			object.main.feels_like
		}</span>${currentUnit}\xa0\xa0${
			object.weather[0].description[0].toUpperCase() +
			object.weather[0].description.substring(1)
		}</strong>`;
		let pressure = `<div>${pressureSVG}${object.main.pressure}hPa</div>`;
		let humidity =
			"<div>" +
			`<strong>Humidity:\xa0</strong>${object.main.humidity}%` +
			"</div>";
		let windSpeed = `<span class="Speed">${object.wind.speed}</span>`;
		let windDirection = `<span>${object.wind.deg}\u00B0</span>`;
		let compass = `<img class="compass" src="${needle}" style="transform: rotate(${object.wind.deg}deg); height: 1.5vw;">`;
		let cloudiness = `<div><strong style="display: flex; align-items: center">Cloud\xa0${cloudinessSVG}:\xa0</strong>${object.clouds.all}%</div>`;
		let sunrise = `<div><strong>Sunrise:\xa0</strong> ${new Date(
			object.sys.sunrise * 1000,
		).toLocaleTimeString(userLocale, chartTimeOptions)}</div>`;
		let sunset = `<div><strong>Sunset:\xa0</strong> ${new Date(
			object.sys.sunset * 1000,
		).toLocaleTimeString(userLocale, chartTimeOptions)}</div>`;
		let visibilty;
		if (object.visibilty) {
			visibilty = `<div>${Number(object.visibilty) / 1000}km</div>`;
		} else {
			visibilty = ``;
		}
		let speedUnit;
		if (standard.current.disabled || metric.current.disabled) {
			speedUnit = `<span class="Unit Meters">m/s</span>`;
		} else if (imperial.current.disabled) {
			speedUnit = `<span class="Unit Miles">m/h</span>`;
		}
		weatherDetails.current.innerHTML = `<div>${compass}${windDirection} \xa0\xa0${windSpeed}${speedUnit}</div>${pressure}${humidity} ${cloudiness} ${sunrise} ${sunset} ${visibilty}`;
	};
	const displayMap = async (object) => {
		mapCont.current.firstElementChild.remove();
		let newMap = document.createElement("div");
		newMap.id = "map";
		mapCont.current.appendChild(newMap);
		let map = await L.map("map");
		map.setView([object.coord.lat, object.coord.lon], 13);
		const baseTiles = L.tileLayer(
			`https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
			{
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			},
		);
		baseTiles.addTo(map);
		const tempTiles = L.tileLayer(
			`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`,
			{
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			},
		);
		tempTiles.addTo(map);
		const cloudTiles = L.tileLayer(
			`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${key}`,
			{
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			},
		);
		const precipitationTiles = L.tileLayer(
			`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${key}`,
			{
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			},
		);
		const pressureTiles = L.tileLayer(
			`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${key}`,
			{
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			},
		);
		const windTiles = L.tileLayer(
			`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${key}`,
			{
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			},
		);
		const baseLayers = {
			Temperature: tempTiles,
			Clouds: cloudTiles,
			Precipitation: precipitationTiles,
			Pressure: pressureTiles,
			Wind: windTiles,
		};
		const overlays = {};
		const layerControlOptions = {
			hideSingleBase: true,
		};
		const layerControl = L.control.layers(
			baseLayers,
			overlays,
			layerControlOptions,
		);
		layerControl.addTo(map);
	};
	let aqi = [];
	let co = [];
	let no = [];
	let no2 = [];
	let o3 = [];
	let so2 = [];
	let pm2_5 = [];
	let pm10 = [];
	let nh3 = [];
	let pollutionData;
	let colours = {
		aqi: "red",
		co: "orangered",
		no: "orange",
		no2: "yellow",
		o3: "yellowgreen",
		so2: "green",
		pm2_5: "blue",
		pm10: "indigo",
		nh3: "violet",
	};
	const displayAirPollution = async (object) => {
		let airPollutionResponse = await fetch(
			`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}`,
		);
		pollutionData = await airPollutionResponse.json();
		let times = pollutionData.list;
		times.forEach((object) => {
			let date = String(
				new Date(object.dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(object.dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let xValue = date + " " + time;
			aqi.push({
				date: xValue,
				value: object.main.aqi,
				name: "Air Quality",
			});
			co.push({date: xValue, value: object.components.co, name: "CO"});
			no.push({date: xValue, value: object.components.no, name: "NO"});
			no2.push({date: xValue, value: object.components.no2, name: "NO2"});
			o3.push({date: xValue, value: object.components.o3, name: "O3"});
			so2.push({date: xValue, value: object.components.so2, name: "SO2"});
			pm2_5.push({
				date: xValue,
				value: object.components.pm2_5,
				name: "PM2.5",
			});
			pm10.push({
				date: xValue,
				value: object.components.pm10,
				name: "PM10",
			});
			nh3.push({date: xValue, value: object.components.nh3, name: "NH3"});
		});
		setDatasets({
			aqi: aqi,
			co: co,
			no: no,
			no2: no2,
			o3: o3,
			so2: so2,
			pm2_5: pm2_5,
			pm10: pm10,
			nh3: nh3,
		});
		setChartData(aqi);
		document.getElementById("aqi").checked = true;
	};
	const displayCharts = (event) => {
		setChartData(datasets[event.target.value]);
		setChartStroke(colours[event.target.value]);
		event.target.checked = true;
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
		forecastList.current.innerHTML = "";
		forecastList.current.innerHTML =
			'<div style="height: 20vh; width: 20vh;" class="loading"></div>';
		forecastList.current.style.alignItems = "center";
		forecastList.current.style.justifyContent = "center";
		forecastList.current.style.height = "60vh";
		for (let member of forecastArray) {
			member.remove();
		}
		if (standard.current.disabled) {
			forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}`,
			);
		} else if (metric.current.disabled) {
			forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}&units=metric`,
			);
		} else if (imperial.current.disabled) {
			forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${object.coord.lat}&lon=${object.coord.lon}&appid=${key}&units=imperial`,
			);
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day1.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day2.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day3.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day4.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day5.data.push({date: dateTime, Temp: days[i].main.temp});
		}
		daysList = [day1, day2, day3, day4, day5];
		forecastList.current.innerHTML = "";
		forecastList.current.style.height = "max-content";
		forecastList.current.style.justifyContent = "unset";
		for (let i = 0; i < daysList.length; i++) {
			daysList[i].max = Math.max(...daysList[i].temp);
			daysList[i].min = Math.min(...daysList[i].temp);
			let newDayList = document.createElement("li");
			newDayList.classList.add("forecastDay");
			newDayList.classList.add("closed");
			newDayList.classList.add("dayTile");
			newDayList.id = `day${i + 1}`;
			newDayList.dataset.day = `${i + 1}`;
			date = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastDate">${new Date(
				daysList[i].date[i] * 1000,
			).toLocaleDateString(userLocale, mapDateOptions)}</span>`;
			max = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastTempMax forecastWeather Temp">${
				daysList[i].max
			}</span>`;
			min = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastTempMin forecastWeather Temp">${
				daysList[i].min
			}</span>`;
			if (standard.current.disabled) {
				unit = `<span data-day="${i + 1}" id='day${
					i + 1
				}' class="Unit Kelvin">K</span>`;
			} else if (metric.current.disabled) {
				unit = `<span data-day="${i + 1}" id='day${
					i + 1
				}' class="Unit Metric">\u00B0C</span>`;
			} else if (imperial.current.disabled) {
				unit = `<span data-day="${i + 1}" id='day${
					i + 1
				}' class="Unit Metric">\u00B0F</span>`;
			}
			descriptionText = daysList[i].description[0];
			weathIcon = days[i].weather[0].icon;
			weathImg = `<img data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastIcon" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weathIcon}.png">`;
			description = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastDescription">${
				descriptionText[0].toUpperCase() + descriptionText.substring(1)
			}</span>`;
			let dayInfo = `${date} <span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastWeather">${max}/${min}${unit}${weathImg}</span> ${description}`;
			newDayList.innerHTML = dayInfo;
			forecastList.current.style.flexDirection = "column";
			forecastList.current.append(newDayList);
		}
		daySets = {
			day1: day1.data,
			day2: day2.data,
			day3: day3.data,
			day4: day4.data,
			day5: day5.data,
		};
		let icons = document.getElementsByClassName("forecastWeather");
		let descriptions = document.getElementsByClassName(
			"forecastDescription",
		);
		for (let icon of icons) {
			icon.style.display = "flex";
		}
		for (let description of descriptions) {
			description.style.display = "flex";
		}
		daysItems = document.querySelectorAll(".forecastDay");
		for (let day of daysItems) {
			day.addEventListener("click", displayDayChart);
		}
	};
	const displayDayChart = (event) => {
		let dayID = event.target.id;
		let activedayList = event.target.dataset.day;
		let dayTiles = document.getElementsByClassName("dayTile");
		let dates = document.getElementsByClassName("forecastDate");
		let icons = document.getElementsByClassName("forecastWeather");
		let descriptions = document.getElementsByClassName(
			"forecastDescription",
		);
		if (forecastList.current.dataset.activeday === activedayList) {
			forecastList.current.dataset.activeday = "0";
			forecastList.current.style.flexDirection = "column";
			dayCont.current.style.display = "none";
			forecastChartCont.current.style.display = "none";
			for (let tile of dayTiles) {
				tile.classList.remove("dayRow");
				tile.classList.remove("open");
				tile.classList.add("closed");
			}
			for (let icon of icons) {
				icon.style.display = "flex";
			}
			for (let description of descriptions) {
				description.style.display = "flex";
			}
			for (let date of dates) {
				date.classList.remove("dateRow");
			}
		} else {
			forecastList.current.dataset.activeday = activedayList;
			forecastList.current.style.flexDirection = "row";
			dayCont.current.style.display = "block";
			forecastChartCont.current.style.display = "block";
			for (let tile of dayTiles) {
				tile.classList.add("dayRow");
				tile.classList.add("open");
				tile.classList.remove("closed");
			}
			for (let icon of icons) {
				icon.style.display = "none";
			}
			for (let description of descriptions) {
				description.style.display = "none";
			}
			for (let date of dates) {
				date.classList.add("dateRow");
			}
			setDayChart(daySets[event.target.id]);
		}
		let currentUnit;
		if (standard.current.disabled) {
			currentUnit = `<span class="Unit Kelvin">K</span>`;
		} else if (metric.current.disabled) {
			currentUnit = `<span class="Unit Metric">\u00B0C</span>`;
		} else if (imperial.current.disabled) {
			currentUnit = `<span class="Unit Metric">\u00B0F</span>`;
		}
		let speedUnit;
		if (standard.current.disabled || metric.current.disabled) {
			speedUnit = `<span class="Unit Meters">m/s</span>`;
		} else if (imperial.current.disabled) {
			speedUnit = `<span class="Unit Miles">m/h</span>`;
		}
		let tempRange = document.getElementById("tempRange");
		let activeIndex = +dayID[3] - 1;
		let activeday = daysList[activeIndex];
		tempRange.innerHTML = `<h3 style="margin: 0;">The high will be <strong>${activeday.max}${currentUnit}</strong> and the low will be <strong>${activeday.min}${currentUnit}</strong></h3>`;
		let pressureSum = 0;
		for (let pressure of activeday.pressure) {
			pressureSum += pressure;
		}
		let pressureAvg = (pressureSum / activeday.pressure.length).toFixed(0);
		let pressure = `<div>${pressureSVG}${pressureAvg}hPa</div>`;
		let humiditySum = 0;
		for (let humidity of activeday.humidity) {
			humiditySum += humidity;
		}
		let humidityAvg = (humiditySum / activeday.humidity.length).toFixed(0);
		let humidity =
			"<div>" +
			`<strong>Humidity:\xa0</strong>${humidityAvg}%` +
			"</div>";
		let windSpeedSum = 0;
		for (let windSpeed of activeday.wind.speed) {
			windSpeedSum += windSpeed;
		}
		let windSpeedAvg = (windSpeedSum / activeday.wind.speed.length).toFixed(
			0,
		);
		let windSpeed = `<span class="Speed">${windSpeedAvg}</span>`;
		let windDirectionSum = 0;
		for (let windDirection of activeday.wind.direction) {
			windDirectionSum += windDirection;
		}
		let windDirectionAvg = (
			windDirectionSum / activeday.wind.direction.length
		).toFixed(0);
		let windDirection = `<span>${windDirectionAvg}\u00B0</span>`;
		let compass = `<img class="compass" src="${needle}" style="transform: rotate(${windDirectionAvg}deg); height: 1.5vw;">`;
		let cloudinessSum = 0;
		for (let cloudiness of activeday.clouds) {
			cloudinessSum += cloudiness;
		}
		let cloudinessAvg = (cloudinessSum / activeday.clouds.length).toFixed(
			0,
		);
		let cloudiness = `<div><strong style="display: flex; align-items: center">Cloud\xa0${cloudinessSVG}:\xa0</strong>${cloudinessAvg}%</div>`;
		document.querySelector(
			".morningTemp",
		).innerHTML = `${activeday.temp[2]}${currentUnit}`;
		document.querySelector(
			".afternoonTemp",
		).innerHTML = `${activeday.temp[4]}${currentUnit}`;
		document.querySelector(
			".nightTemp",
		).innerHTML = `${activeday.temp[6]}${currentUnit}`;
		document.querySelector(
			".morningFeel",
		).innerHTML = `${activeday.feelsLike[2]}${currentUnit}`;
		document.querySelector(
			".afternoonFeel",
		).innerHTML = `${activeday.feelsLike[4]}${currentUnit}`;
		document.querySelector(
			".nightFeel",
		).innerHTML = `${activeday.feelsLike[6]}${currentUnit}`;
		document.getElementById(
			"dayDetails",
		).innerHTML = `<div>${compass}${windDirection} \xa0\xa0${windSpeed}${speedUnit}</div>${pressure}${humidity} ${cloudiness}`;
	};
	const displayInfo = async (object) => {
		for (let member of forecastArray) {
			member.remove();
		}
		forecastList.current.innerHTML = "";
		displayDetails(object);
		displayMap(object);
		displayAirPollution(object);
		displayDay(object);
	};
	const disableButton = (event) => {
		if (event.target.nodeName === "BUTTON") {
			cover.current.style.left = event.target.offsetLeft + "px";
			cover.current.style.width = event.target.offsetWidth + "px";
		}
	};
	const toStandard = (event) => {
		event.preventDefault();
		let tempElements = document.getElementsByClassName("Temp");
		let speedElement = document.querySelector(".Speed");
		let units = document.getElementsByClassName("Unit");
		for (let ele of tempElements) {
			let temp = Number(ele.textContent);
			if (metric.current.disabled) {
				ele.textContent = (temp + 273).toFixed(2);
			} else if (imperial.current.disabled) {
				ele.textContent = ((temp - 32) / 1.8 + 273).toFixed(2);
			}
			for (let unit of units) {
				if (unit.classList.contains("Metric")) {
					unit.classList.remove("Metric");
					unit.classList.add("Kelvin");
					unit.textContent = "K";
				} else if (unit.classList.contains("Imperial")) {
					unit.classList.remove("Imperial");
					unit.classList.add("Kelvin");
					unit.textContent = "K";
				}
			}
		}
		let speed = Number(speedElement.textContent);
		let unit = speedElement.nextElementSibling;
		if (unit.classList.contains("Miles")) {
			unit.classList.remove("Miles");
			unit.classList.add("Meters");
			speedElement.textContent = (speed * 2.23694).toFixed(2);
			unit.innerHTML = `m/s`;
		}
		standard.current.disabled = true;
		standard.current.classList.add("disabled");
		metric.current.disabled = false;
		metric.current.classList.remove("disabled");
		imperial.current.disabled = false;
		imperial.current.classList.remove("disabled");
	};
	const toMetric = async (event) => {
		event.preventDefault();
		let tempElements = document.getElementsByClassName("Temp");
		let speedElement = document.querySelector(".Speed");
		let units = document.getElementsByClassName("Unit");
		for (let ele of tempElements) {
			let temp = Number(ele.textContent);
			if (standard.current.disabled) {
				ele.textContent = (temp - 273).toFixed(2);
			} else if (imperial.current.disabled) {
				ele.textContent = ((temp - 32) / 1.8).toFixed(2);
			}
		}
		for (let unit of units) {
			if (unit.classList.contains("Kelvin")) {
				unit.classList.remove("Kelvin");
				unit.classList.add("Metric");
				unit.textContent = "\u00B0C";
			} else if (unit.classList.contains("Imperial")) {
				unit.classList.remove("Imperial");
				unit.classList.add("Metric");
				unit.textContent = "\u00B0C";
			}
		}
		let speed = Number(speedElement.textContent);
		let unit = speedElement.nextElementSibling;
		if (unit.classList.contains("Miles")) {
			unit.classList.remove("Miles");
			unit.classList.add("Meters");
			speedElement.textContent = (speed * 2.23694).toFixed(2);
			unit.innerHTML = `m/s`;
		}
		standard.current.disabled = false;
		standard.current.classList.remove("disabled");
		metric.current.disabled = true;
		metric.current.classList.add("disabled");
		imperial.current.disabled = false;
		imperial.current.classList.remove("disabled");
	};
	const toImperial = (event) => {
		event.preventDefault();
		let tempElements = document.getElementsByClassName("Temp");
		let speedElement = document.querySelector(".Speed");
		let units = document.getElementsByClassName("Unit");
		for (let ele of tempElements) {
			let temp = Number(ele.textContent);
			if (standard.current.disabled) {
				ele.textContent = ((temp - 273) * 1.8 + 32).toFixed(2);
			} else if (metric.current.disabled) {
				ele.textContent = (temp * 1.8 + 32).toFixed(2);
			}
		}
		for (let unit of units) {
			if (unit.classList.contains("Kelvin")) {
				unit.classList.remove("Kelvin");
				unit.classList.add("Imperial");
				unit.textContent = "\u00B0F";
			} else if (unit.classList.contains("Metric")) {
				unit.classList.remove("Metric");
				unit.classList.add("Imperial");
				unit.textContent = "\u00B0F";
			}
		}
		let speed = Number(speedElement.textContent);
		let unit = speedElement.nextElementSibling;
		if (unit.classList.contains("Meters")) {
			unit.classList.remove("Meters");
			unit.classList.add("Miles");
			speedElement.textContent = (speed / 2.23694).toFixed(2);
			unit.innerHTML = `m/h`;
		}
		standard.current.disabled = false;
		standard.current.classList.remove("disabled");
		metric.current.disabled = false;
		metric.current.classList.remove("disabled");
		imperial.current.disabled = true;
		imperial.current.classList.add("disabled");
	};
	const changeDay = async () => {
		let lat = 0;
		let lon = 0;
		navigator.geolocation.getCurrentPosition((pos) => {
			lat = pos.coords.latitude.toFixed(3);
			lon = pos.coords.longitude.toFixed(3);
		});
		let day1;
		let day2;
		let day3;
		let day4;
		let day5;
		forecastList.current.innerHTML = "";
		forecastList.current.innerHTML =
			'<div style="height: 20vh; width: 20vh;" class="loading"></div>';
		forecastList.current.style.alignItems = "center";
		forecastList.current.style.justifyContent = "center";
		forecastList.current.style.height = "60vh";
		dayCont.current.style.display = "none";
		forecastChartCont.current.style.display = "none";
		forecastList.current.dataset.activeday = "0";
		let max;
		let min;
		let descriptionText;
		let description;
		let daysItems;
		if (standard.current.disabled) {
			forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`,
			);
		} else if (metric.current.disabled) {
			forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
			);
		} else if (imperial.current.disabled) {
			forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`,
			);
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
				direction: [],
			},
			visibilty: [],
			description: [],
			data: [],
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day1.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day2.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day3.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day4.data.push({date: dateTime, Temp: days[i].main.temp});
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
			let date = String(
				new Date(days[i].dt * 1000).toLocaleDateString(
					userLocale,
					chartDateOptions,
				),
			);
			let time = String(
				new Date(days[i].dt * 1000).toLocaleTimeString(
					userLocale,
					chartTimeOptions,
				),
			);
			let dateTime = date + " " + time;
			day5.data.push({date: dateTime, Temp: days[i].main.temp});
		}
		daysList = [day1, day2, day3, day4, day5];
		forecastList.current.innerHTML = "";
		forecastList.current.style.height = "max-content";
		forecastList.current.style.justifyContent = "unset";
		for (let i = 0; i < daysList.length; i++) {
			daysList[i].max = Math.max(...daysList[i].temp);
			daysList[i].min = Math.min(...daysList[i].temp);
			let newDayList = document.createElement("li");
			newDayList.classList.add("forecastDay");
			newDayList.classList.add("closed");
			newDayList.classList.add("dayTile");
			newDayList.id = `day${i + 1}`;
			newDayList.dataset.day = `${i + 1}`;
			date = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastDate">${new Date(
				daysList[i].date[i] * 1000,
			).toLocaleDateString(userLocale, mapDateOptions)}</span>`;
			max = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastTempMax forecastWeather Temp">${
				daysList[i].max
			}</span>`;
			min = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastTempMin forecastWeather Temp">${
				daysList[i].min
			}</span>`;
			if (standard.current.disabled) {
				unit = `<span data-day="${i + 1}" id='day${
					i + 1
				}' class="Unit Kelvin">K</span>`;
			} else if (metric.current.disabled) {
				unit = `<span data-day="${i + 1}" id='day${
					i + 1
				}' class="Unit Metric">\u00B0C</span>`;
			} else if (imperial.current.disabled) {
				unit = `<span data-day="${i + 1}" id='day${
					i + 1
				}' class="Unit Metric">\u00B0F</span>`;
			}
			descriptionText = daysList[i].description[0];
			weathIcon = days[i].weather[0].icon;
			weathImg = `<img data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastIcon" src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weathIcon}.png">`;
			description = `<span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastDescription">${
				descriptionText[0].toUpperCase() + descriptionText.substring(1)
			}</span>`;
			let dayInfo = `${date} <span data-day="${i + 1}" id='day${
				i + 1
			}' class="forecastWeather">${max}/${min}${unit}${weathImg}</span> ${description}`;
			newDayList.innerHTML = dayInfo;
			forecastList.current.style.flexDirection = "column";
			forecastList.current.append(newDayList);
		}
		daySets = {
			day1: day1.data,
			day2: day2.data,
			day3: day3.data,
			day4: day4.data,
			day5: day5.data,
		};
		let icons = document.getElementsByClassName("forecastWeather");
		let descriptions = document.getElementsByClassName(
			"forecastDescription",
		);
		for (let icon of icons) {
			icon.style.display = "flex";
		}
		for (let description of descriptions) {
			description.style.display = "flex";
		}
		daysItems = document.querySelectorAll(".forecastDay");
		for (let day of daysItems) {
			day.addEventListener("click", displayDayChart);
		}
	};
	const successCallback = async (position) => {
		lat = position.coords.latitude.toFixed(3);
		lon = position.coords.longitude.toFixed(3);
		locationInfo(lat, lon);
	};
	let locate = () => {
		navigator.geolocation.getCurrentPosition(successCallback);
	};
	const handleStandard = (e) => {
		e.preventDefault();
		toStandard(e);
		changeDay();
	};
	const handleMetric = (e) => {
		e.preventDefault();
		toMetric(e);
		changeDay();
	};
	const handleImperial = (e) => {
		e.preventDefault();
		toImperial(e);
		changeDay();
	};
	useEffect(() => {
		const canvasElement = document.getElementById("gradient-canvas");
		const gradient = new Gradient();
		if (canvasElement) {
			gradient.initGradient("#gradient-canvas");
		} else {
			gradient.pause();
		}
		searchResults.current.tabIndex = "0";
		locate();
		standard.current.disabled = true;
		standard.current.classList.add("disabled");
		cover.current.style.left = standard.current.offsetLeft + "px";
		cover.current.style.width = standard.current.offsetWidth + "px";
	}, []);
	return (
		<div>
			<div className='headerCont'>
				<header>
					<canvas
						id='gradient-canvas'
						data-js-darken-top
						data-transition-in
					></canvas>
					<h1>
						<Link
							to='/'
							className='inline-flex items-center gap-[15px] no-underline'
						>
							<img className='h-[8vh]' src={Logo} alt='Logo' />
							<h1 className='relative w-fit text-center font-bold leading-[normal] tracking-[0] text-[5vh]'>
								Weather4U
							</h1>
						</Link>
					</h1>
					<p>Built with React and TailwindCSS</p>
				</header>
			</div>
			<main>
				<form className='searchCont'>
					<div className='infoCont'>
						<div className='info'>
							<input
								ref={searchBar}
								placeholder='Look up a city!'
								type='text'
							/>
							<ul
								ref={searchResults}
								id='geoResults'
								className='panel'
							></ul>
						</div>
					</div>
					<button
						ref={search}
						onClick={geoResults}
						className='searchButton px-1'
					>
						Search
					</button>
					<button
						ref={locationSearchButton}
						onClick={(e) => {
							e.preventDefault();
							locate();
						}}
						className='locationSearch'
					>
						<img
							className='locationSearchIcon'
							alt='location'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABwElEQVRIie2UT0uUURjFz3nvvOpEWGQlmE1Zi4QwyolWrSyIPkCzbtEirEV9g9YRDAlt/AJCLsOFkbyLNlGMaaQhLXIkAxH7HxPOe+9pMQzMTHecP87Ss7vneZ7zu3AfLrCnBmKngm6ejHp6nc4aaCC7duVZ2U/sNvju8ecDIU0aViOiupw0U1lvCzB+JNofJuPzgBkldEgAQAEKioE237cJEO+n5oYcmCY1DAUGUFUHA7eczWcKLQHuHHvRF4ZmRDa6IPAAAUDy9orbb2s9L+ABosSPlM44IE1wCM6RDdaB0Lfs6vXVHQG3T88eTRa7zn2HRgHtK2X6b1srB5Pz+VWAnmJiXHBNBVZKoOtOhou+WlB5iGUnCeRExK0AKH18uHL5l7fmM8trSJlLoHobAWQ49fjT2ErTgLJu4KkZTB0eLj22TnmbiN/r+a3sNDK2ZUCl7p2IbkFusNZ34MuJtbG5enNBvUKtZO1rz7isdQs7zTUN+PL56xLEn9VUl3+yfnWrI4BpZCwM56vypfl6/S0DACBR2H5TXmECfwv9Bz90FPBo49ofgssAYMl3k7mLxY4CACB28avS4P8f257a0j/L+aEmiV6rhwAAAABJRU5ErkJggg=='
						/>
					</button>
					<div ref={buttonCont} onClick={disableButton} id='buttons'>
						<div ref={cover} className='cover'></div>
						<button
							ref={standard}
							onClick={handleStandard}
							className='standardUnits'
						>
							Standard: K/mps
						</button>
						<button
							ref={metric}
							onClick={handleMetric}
							className='metricUnits'
						>
							Metric: &deg;C/mps
						</button>
						<button
							ref={imperial}
							onClick={handleImperial}
							className='imperialUnits'
						>
							Imperial: &deg;F/mph
						</button>
					</div>
				</form>
				<section className='weatherDisplay'>
					<div className='top'>
						<div className='general'>
							<p
								ref={dateDisplay}
								className='mt-[1rem]'
								id='date'
							></p>
							<h1 ref={posDisplay} id='pos'>
								{" "}
							</h1>
							<div
								ref={currentTempDisplay}
								id='currentTemp'
							></div>
							<div
								ref={weatherDescription}
								id='description'
							></div>
							<div ref={weatherDetails} id='details'></div>
						</div>
						<div ref={mapCont} className='mapCont'>
							<div id='map'></div>
						</div>
					</div>
					<div className='bottom'>
						<div className='airPollution'>
							<h1 className='bottomHeader'>Air Pollution</h1>
							<form id='chartsDisplay'>
								{chartRadios.map((chart, index) => {
									return (
										<label
											key={index}
											htmlFor={
												chart.id +
												chart.base.replace("_", ".")
											}
										>
											<input
												name='chart'
												id={
													chart.id +
													chart.base.replace("_", ".")
												}
												type='radio'
												onChange={displayCharts}
												value={chart.id + chart.base}
											/>
											<strong>
												{chart.id === "aqi"
													? "Air Quality"
													: chart.id.toUpperCase()}
												<sub>
													{chart.base.replace(
														"_",
														".",
													)}
												</sub>
											</strong>
										</label>
									);
								})}
							</form>
							<div className='fullChartCont overflow-x-scroll no-scrollbar'>
								<AirPollutionChart
									stroke={chartStroke}
									data={chartData}
								/>
							</div>
						</div>
						<div className='forecast'>
							<h1 className='bottomHeader'>
								5 Day/3 Hour Forecast
							</h1>
							<ul
								ref={forecastList}
								data-activeday='0'
								id='forecastDays'
							></ul>
							<div ref={dayCont} className='dayCont'>
								<div className='dayInfo'>
									<div
										id='tempRange'
										className='*:font-bold *:text-[1.17em]'
									></div>
									<div id='dayDescription'>
										<div id='dayDetails'></div>
									</div>
									<div id='dayDetails'></div>
									<div id='tempRange'>
										<table>
											<tbody>
												<tr>
													<th scope='col'></th>
													<th
														className='text-center'
														scope='col'
													>
														Morning
													</th>
													<th
														className='text-center'
														scope='col'
													>
														Afternoon
													</th>
													<th
														className='text-center'
														scope='col'
													>
														Night
													</th>
												</tr>
												<tr>
													<th
														className='text-center'
														scope='row'
													>
														Temperature
													</th>
													<td className='Temp morningTemp'></td>
													<td className='Temp afternoonTemp'></td>
													<td className='Temp nightTemp'></td>
												</tr>
												<tr>
													<th
														className='text-center'
														scope='row'
													>
														Feels Like
													</th>
													<td className='Temp morningFeel'></td>
													<td className='Temp afternoonFeel'></td>
													<td className='nightFeel'></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div
									ref={forecastChartCont}
									className='forecastfullChartCont fullChartCont overflow-x-scroll no-scrollbar'
								>
									<DayChart
										data={dayChart}
										stroke='#711ebe80'
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Weather;
