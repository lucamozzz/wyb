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

## How To Use & Deploy

This app is nothing different from a billion others you've already used. 
<br>Type a keyword in the search bar to find a specific location and hit "🔎". 
<br>Hit "📍" instead to input your current location. That's about it.
<br>Deploy --> <a href="wyb.netlify.app" target="_blank">wyb.netlify.app</a>

## How To Run

Download the repo and run "npm run build" to see it in action
<br>(in order to function correctly, you'll have to set your own api key in a ".env" file).
The "/scripts" folder was created to make the deploy on Netlify work. You can get rid of it if you're deploying somewhere else.

## License

This project is under the MIT License.
