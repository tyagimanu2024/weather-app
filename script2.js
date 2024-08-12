const apiKey = "a31b575bc45689ce59bd795db3659561";

async function checkWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const cityNameElement = document.getElementById('cityName');
        cityNameElement.innerHTML = city;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        // Update HTML elements with weather data
        const feelsLikeElement = document.getElementById('feels_like');
        const mintempElement = document.getElementById('mintemp');
        const maxtempElement = document.getElementById('maxtemp');
        const skyElement = document.getElementById('sky');
        const windspeedElement = document.getElementById('windspeed');
        const sealevelElement = document.getElementById('sealevel');
        const humidityElement = document.getElementById('humidity');
        const sunriseElement = document.getElementById('sunrise');
        const sunsetElement = document.getElementById('sunset');

        feelsLikeElement.innerHTML = `Feels like: ${result.main.feels_like}°C`;
        mintempElement.innerHTML = `Min temp: ${result.main.temp_min}°C`;
        maxtempElement.innerHTML = `Max temp: ${result.main.temp_max}°C`;
        skyElement.innerHTML = `Sky: ${result.weather[0].description}`;
        windspeedElement.innerHTML = `Wind speed: ${result.wind.speed}km/h`;
        sealevelElement.innerHTML = `Sea Level: ${result.main.sea_level ? result.main.sea_level : 'N/A'}`;
        humidityElement.innerHTML = `Humidity: ${result.main.humidity}%`;
        sunriseElement.innerHTML = `Sunrise: ${new Date(result.sys.sunrise * 1000).toLocaleTimeString()}`;
        sunsetElement.innerHTML = `Sunset: ${new Date(result.sys.sunset * 1000).toLocaleTimeString()}`;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function fetchWeatherForCities(cities) {
    for (const city of cities) {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);

            // Update HTML elements with weather data
            document.getElementById(`${city.toLowerCase()}_feels_like`).innerHTML = result.main.feels_like;
            document.getElementById(`${city.toLowerCase()}_min_temp`).innerHTML = result.main.temp_min;
            document.getElementById(`${city.toLowerCase()}_max_temp`).innerHTML = result.main.temp_max;
            document.getElementById(`${city.toLowerCase()}_sky`).innerHTML = result.weather[0].description;
            document.getElementById(`${city.toLowerCase()}_sunrise`).innerHTML = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
            document.getElementById(`${city.toLowerCase()}_sunset`).innerHTML = new Date(result.sys.sunset * 1000).toLocaleTimeString();
            document.getElementById(`${city.toLowerCase()}_wind_degrees`).innerHTML = result.wind.deg;
            document.getElementById(`${city.toLowerCase()}_wind_speed`).innerHTML = result.wind.speed;
        } catch (error) {
            console.error(`An error occurred for ${city}:`, error);
        }
    }
}

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    checkWeather(cityInput);
});

const cities = ["Shanghai", "Boston", "Kolkata", "Lucknow", "New Delhi", "Ghaziabad"];
fetchWeatherForCities(cities);













