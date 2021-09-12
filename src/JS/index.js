const axios = require("axios");

const locate = () => {
  navigator.geolocation.getCurrentPosition(
    (success) => {
    const crd = success.coords;
    const api_key = process.env.API_KEY;
    console.log(api_key);    
    axios(`http://api.waqi.info/feed/geo:${crd.latitude};${crd.longitude}/?token=${api_key}`)
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
};

document.getElementById("search-btn").addEventListener("click", locate);


const displayValues = (response) => {
  console.log(response);

  let div = document.getElementById('results');

  let city = response.city;
  let aqi = response.aqi;
  let iaqi = response.iaqi;
  let idx = response.idx;
  let time = response.time;

  div.innerHTML = `
  <h2>City: ${city.name}</h2>
  <h3>Air Quality Index: ${aqi}</h3>
  `
}
