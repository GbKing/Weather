# Weather App

A modern, responsive weather application that displays current weather conditions for any city worldwide.

## Features

- Real-time weather data from OpenWeatherMap API
- Temperature display in both Celsius and Fahrenheit
- Local time display for searched cities
- Humidity information
- Current weather conditions description
- Responsive design that works on desktop and mobile
- User-friendly error handling

## Technologies Used

- HTML5
- CSS3 (with Flexbox)
- JavaScript (ES6+)
- OpenWeatherMap API
- Google Fonts (Poppins)

## Setup

1. Clone this repository
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Set up your API key:
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Rename `config.example.js` to `config.js`
   - Replace `YOUR_API_KEY_HERE` in `config.js` with your actual API key

3. Open `index.html` in your web browser

## API Key Configuration

This project uses the OpenWeatherMap API. To use the application:

1. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Rename `config.example.js` to `config.js`
3. Open `config.js` and replace `YOUR_API_KEY_HERE` with your actual API key

## Privacy Notice

The `config.js` file containing your API key is git-ignored to prevent accidentally committing sensitive information. Never commit your actual API keys to version control.