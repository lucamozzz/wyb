import '../SCSS/main.scss';

const axios = require("axios");
const api_path = 'https://api.waqi.info/';
const api_key = process.env.API_KEY;

let aqiDiv, indicationsDiv, paramsDiv, stationDiv;
const homeBtn = document.getElementById("btn-home");
const curlocBtn = document.getElementsByClassName("btn-curloc");
const searchBtn = document.getElementsByClassName("btn-search");
const searchBar = document.getElementById('search-bar');
const resultsDiv = document.getElementById("results");

displayHome();

homeBtn.addEventListener('click', displayHome);

curlocBtn[0].addEventListener("click", () => {
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
    displayLocations(response.data.data);
  } catch (error) {
    console.log(error);
  }
});

const geoSearch = async (latitude, longitude) => {
  try {
    const response = await axios(api_path + `feed/geo:${latitude};${longitude}/?token=${api_key}`);
    displayResults(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function displayResults(response){
  scroll(0, 0);
  resultsDiv.innerHTML = `
  <div class="row">
    <div class="col-12 aqi" id="div-aqi"></div>
    <div class="col-7" id="div-indications"></div>
    <div class="col-5" id="div-params"></div>
  </div>
  <div class="row">
    <div class="col-12" id="div-station"></div>
  </div>
`;

  aqiDiv = document.getElementById("div-aqi");
  indicationsDiv = document.getElementById("div-indications");
  paramsDiv = document.getElementById("div-params");
  stationDiv = document.getElementById("div-station");

  let aqi = document.createElement("h3");
  aqi.innerHTML = `Air Quality Index<br><span class="aqi-value">${response.aqi}</span>`;
  aqiDiv.appendChild(aqi);

  displayParams(response);
  displayInfos(response.aqi);

  let station = document.createElement("p");
  station.innerHTML = `
  Data retrieved from the following weather station: ${response.city.name}<br>(<a href="${response.attributions[0].url}">${response.attributions[0].url}</a>).
  <br>Values are converted from µg/m3 to AQI levels using the EPA standard.
  `;
  stationDiv.appendChild(station);
}

function displayParams(response){
  let res = response.iaqi;
  let params = document.createElement("h5");
  params.innerHTML = `Parameters`;
  paramsDiv.appendChild(params);

  let ul = document.createElement("ul");
  for (const prop in res) {
    let name = `${prop}</span>`;
    name = name.toUpperCase();
    let value = `${res[prop].v}`;
    let li = document.createElement('li');
    li.classList.add('par');
    ul.appendChild(li);
    li.innerHTML += '<span class="par-name">' + name + '</span>' + ": " 
                    + '<span class="par-value">' + value + '</span>';
  }
  paramsDiv.appendChild(ul);
}

function displayInfos(aqi){
  let infos = [];
  if (aqi < 51) {
    infos[0] = `Good`;
    infos[1] = `😃`;
    infos[2] = `Air quality is considered satisfactory, and air pollution poses little or no risk.`;
  } else if (aqi < 101) {
    infos[0] = `Moderate`;
    infos[1] = `🙂`;
    infos[2] = `Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution. Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.`;
  } else if (aqi < 151) {
    infos[0] = `Unhealthy for some`;
    infos[1] = `🤭`;
    infos[2] = `Members of sensitive groups may experience health effects. The general public is not likely to be affected. Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.`;
  } else if (aqi < 201) {
    infos[0] = `Unhealthy`;
    infos[1] = `😰`;
    infos[2] = `Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects. Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion
    `;
  } else if (aqi < 301) {
    infos[0] = `Very unhealthy`;
    infos[1] = `😷`;
    infos[2] = `Health warnings of emergency conditions. The entire population is more likely to be affected. Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.`;
  } else {
    infos[0] = `Hazardous`;
    infos[1] = `😵`;
    infos[2] = `HEALTH ALERT: everyone may experience more serious health effects. Everyone should avoid all outdoor exertion.`;
  }

  let aqiLevel = document.createElement("h5");
  aqiLevel.innerHTML = `Level`;
  indicationsDiv.appendChild(aqiLevel);

  let aqiLevelValue = document.createElement("div");
  aqiLevelValue.classList.add('level');
  aqiLevelValue.innerHTML = `<h4 class="aqi-emoji-value">${infos[1]}</h4>
                            <h4 class="aqi-level-value">${infos[0]}</h4>`;
  indicationsDiv.appendChild(aqiLevelValue);
  
  let aqiIndications = document.createElement("h5");
  aqiIndications.innerHTML = `Indications`;
  indicationsDiv.appendChild(aqiIndications);

  let aqiIndicationsText = document.createElement("p");
  aqiIndicationsText.innerHTML = `${infos[2]}`;
  indicationsDiv.appendChild(aqiIndicationsText);
}

function displayLocations(res){
  scroll(0, 0);
  resultsDiv.innerHTML = `
    <div class="instructions" id="div-instructions">
    <h2>Select a location</h2>
    </div>
  `;  
  if (res.length == 0) {
    displayEmpty();
  } else {
    let ul = document.createElement("ul");
    res.forEach(element => {
      let name = element.station.name;
      let geo = element.station.geo;
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += `<a style="cursor:pointer">${name}</a>`;
      li.addEventListener('click', () => {
        geoSearch(geo[0], geo[1]);
        searchBar.value = "";
      })
    });
    resultsDiv.appendChild(ul);
  }
}

function displayHome(){
  scroll(0, 0);
  searchBar.value = "";
  resultsDiv.innerHTML = `
  <div class="instructions" id="div-instructions">
  <h2>Welcome!</h2>
  <p class="lead">Analyze a specific place 🔎 <br> or your current location 📍</p>
  </div>
  `;
}

function displayEmpty(){
  scroll(0, 0);
  resultsDiv.innerHTML = `
  <div class="instructions" id="div-instructions">
  <h2>It didn't go well...</h2>
  <p class="lead">Try inserting a keyword in the searchbar</p>
  </div>
  `;
}