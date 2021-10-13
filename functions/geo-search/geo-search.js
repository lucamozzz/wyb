const axios = require("axios");

const handler = async (event) => {
  const { lat, long } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;
  const url = `https://api.waqi.info/feed/geo:${lat};${long}/?token=${API_KEY}`;
  try {
    const { data } = await axios(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }