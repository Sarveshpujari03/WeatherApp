import { useState } from "react";
import axios from "axios";
import bg from "/bg.jpg";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "YOUR_API_KEY";

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-auto font-sans">
      {/* Background Image */}
      <img
        src={bg}
        alt="Background"
        className="fixed top-0 left-0 h-full w-full object-cover -z-10"
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center pt-10 gap-4 w-full px-4 z-10">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city"
          className="px-4 py-2 rounded-lg w-full sm:w-[300px] border shadow-md backdrop-blur-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition active:scale-95"
        >
          Search
        </button>
      </div>

      {/* Status */}
      {loading && (
        <p className="text-white text-center mt-6 text-lg font-medium">Fetching weather...</p>
      )}
      {error && (
        <p className="text-red-500 text-center mt-4 text-lg font-medium">{error}</p>
      )}

      {/* Weather Info */}
      {weather && (
        <div className="mx-auto mt-10 w-[95%] max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-6 text-white">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold">{weather.name}, {weather.sys.country}</h1>
              <p className="text-xl mt-1 text-gray-200 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Icon"
                className="h-20 w-20"
              />
              <p className="text-5xl font-extrabold">{Math.round(weather.main.temp)}°C</p>
            </div>
          </div>

          {/* Grid Data */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm md:text-base">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Feels Like</h3>
              <p>{weather.main.feels_like}°C</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Humidity</h3>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Pressure</h3>
              <p>{weather.main.pressure} hPa</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Wind Speed</h3>
              <p>{weather.wind.speed} m/s</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Visibility</h3>
              <p>{weather.visibility} m</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Coordinates</h3>
              <p>Lat: {weather.coord.lat}, Lon: {weather.coord.lon}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Sunrise</h3>
              <p>{formatTime(weather.sys.sunrise)}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">Sunset</h3>
              <p>{formatTime(weather.sys.sunset)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
