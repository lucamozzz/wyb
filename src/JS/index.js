import '../CSS/style.css';

const axios = require("axios");
const api_path = 'https://api.waqi.info/';
const api_key = process.env.API_KEY;

const curlocBtn = document.getElementById("curloc-btn");
const searchBtn = document.getElementsByClassName("btn-search");
const searchBar = document.getElementById('search-bar');
const resultsDiv = document.getElementById("results");

curlocBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    async (success) => {
    const latitude = success.coords.latitude;
    const longitude = success.coords.longitude;
    geoSearch(latitude, longitude);
  },
    (error) => {
    console.log(error);
  });
});

searchBtn[0].addEventListener('click', async () => {
  try {
    const response = await axios(api_path + `search/?keyword=${searchBar.value}&token=${api_key}`, { crossdomain: true });
    console.log(response.data.data);
    displayLocations(response.data.data);
  } catch (error) {
    console.log(error);
  }
})

const geoSearch = async (latitude, longitude) => {
  try {
    const response = await axios(api_path + `feed/geo:${latitude};${longitude}/?token=${api_key}`);
    displayParams(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

const displayParams = (response) => {
  resultsDiv.innerHTML = `
      <div class="row">
        <div class="col-12 col-md-6" id="div-aqi"></div>
        <div class="col-12 col-md-6" id="div-params"></div>
      </div>
      <div class="row">
        <div class="col-12" id="div-station"></div>
      </div>
  `;
  const aqiDiv = document.getElementById("div-aqi");
  const paramsDiv = document.getElementById("div-params");
  const stationDiv = document.getElementById("div-station");
  
  let res = response.iaqi;
  let ul = document.createElement("ul");
  for (const prop in res) {
    let name = `${prop}`;
    name = name.toUpperCase();
    let value = `${res[prop].v}`;
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML += name + ": " + value;
  }
  
  let aqi = document.createElement("h3");
  aqi.innerHTML = `Air Quality Index: ${response.aqi}`;
  aqiDiv.appendChild(aqi);

  let params = document.createElement("h4");
  params.innerHTML = `Considered parameters:`;
  paramsDiv.appendChild(params);
  paramsDiv.appendChild(ul);

  let info = document.createElement("h6");
  info.innerHTML = `
  Data retrieved from the following weather station: ${response.city.name} (<a href="${response.attributions[0].url}">${response.attributions[0].url}</a>).
  <br>Values are converted from µg/m3 to AQI levels using the EPA standard.
  `;
  stationDiv.appendChild(info);

  console.log('puttana madonna');
}

const displayLocations = (res) => {
  resultsDiv.innerHTML = ``;
  let ul = document.createElement("ul");
  res.forEach(element => {
    let name = element.station.name;
    let geo = element.station.geo;
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML += `<a style="cursor:pointer">${name}</a>`;
    li.addEventListener('click', () => {
      geoSearch(geo[0], geo[1]);
    })
  });
  resultsDiv.appendChild(ul);
}