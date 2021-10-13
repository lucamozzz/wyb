const axios = require("axios");

const handler = async (event) => {
  const { key } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;
  const url = `https://api.waqi.info/search/?keyword=${key}&token=${API_KEY}`;
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