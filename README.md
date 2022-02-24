# WYB - What You Breathe

## What It Is

WYB is a web app that allows you to monitor air quality of a specific place or current location 
(data is retrieved from the <a href="https://aqicn.org/api/" target="_blank">AQICN API</a>).
Just a simple app that could one day become something more or just remain as it is for the eternity...

## A couple screenshots

<div>
<img width="300" alt="Search using keyword 'Roma'" src="https://user-images.githubusercontent.com/76916015/136994853-faac8e0d-0ee2-4764-80cc-8bcbb81164b2.jpg">
<img width="300" alt="AQI view example" src="https://user-images.githubusercontent.com/76916015/136994864-82bd8b0c-3322-47b0-8bb1-b7554743cb32.jpg">
</div>
  
## Technologies

- JS, HTML5, SASS
- Bundled with Webpack 5
- HTTP requests made using Axios
- Laid out with Bootstrap 5
- Deployed on Netlify with netlify-cli

## How To Use & Deploy

### Deploy --> <a href="https://wyb.netlify.app/" target="_blank">wyb.netlify.app</a>
This app is nothing different from a billion others you've already used. 
<br>Type a keyword in the search bar to find a specific location and hit "🔎". 
<br>Hit "📍" instead to input your current location. That's about it.

## How To Run

Download the repo and run <code>npm run build</code> to see it in action (in order to function correctly, you'll have to set your own api key in a <code>.env</code> file).

<b>NOTE</b>: a <code>scripts</code> folder was created as a workaround for deploying on Netlify. That folder has been recently deleted to make space for a <code>functions</code> folder which contains Netlify Functions. Just pointing it out for clarity.

## License

This project is under the MIT License.
