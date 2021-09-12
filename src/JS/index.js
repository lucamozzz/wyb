const axios = require("axios");
const api_path = 'http://api.waqi.info/feed/';

document.getElementById("search-btn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (success) => {
    const crd = success.coords;
    const api_key = process.env.API_KEY;
    console.log(api_key);    
    axios(api_path + `geo:${crd.latitude};${crd.longitude}/?token=${api_key}`)
    .then((response) => {
      displayValues(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, 
    (error) => {
    console.log(error);
  });
});

const displayValues = (response) => {
  let div = document.getElementById('results');

  div.innerHTML = `
  <h2>Let's see what it's like out there &#129488: </h2>
  <h3>Air Quality Index: ${response.aqi}</h3>
  <h3>Considered parameters &#128202:</h3>
  <ul>
    <li>Temperature &#127777: ${response.iaqi.t.v} C</li>
    <li>Pressure &#128317: ${response.iaqi.p.v}</li>
    <li>Humidity &#128167:${response.iaqi.h.v} </li>
    <li>Wind &#128168: ${response.iaqi.w.v}</li>
  </ul>
  <h3>Substances involved &#129514:</h3>
  <ul>
    <li>PM2.5 (Fine Particulate Matter): ${response.iaqi.pm25.v}</li>
    <li>PM10 (Inhalable Particulate Matter)): ${response.iaqi.pm10.v}</li>
    <li>CO (Carbon Monoxide): ${response.iaqi.co.v}</li>
    <li>O3 (Trioxygen): ${response.iaqi.o3.v}</li>
    <li>SO2 (Sulfur Dioxide): ${response.iaqi.so2.v}</li>
    <li>NO2 (Nitrogen Dioxide): ${response.iaqi.no2.v}</li>
  </ul>
  <h6>Data retrieved from the closest weather station:</h6>
  <h6>${response.city.name} (<a href="${response.attributions[0].url}">${response.attributions[0].url}</a>).</h6>
  <h6>Values are converted from µg/m3 to AQI levels using the EPA standard.</h6>
  `;
}
