import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import useGeoLocation from "./useGeoLocation.js";

function App() {
  const apiKey = "b0670ccece925c5fea7eb9ffeff60280";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");
  const location = useGeoLocation();

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;

    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    // console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1> Weather App</h1>
        <input
          type="text"
          value={inputCity}
          onChange={handleChangeInput}
        ></input>

        <button type="button" onClick={handleSearch}>
          search
        </button>
      </div>

      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <h2>
            {location.loaded
              ? JSON.stringify(location)
              : "Location data not available yet."}
          </h2>
          <h2 className="weatherCity"> {data?.name}</h2>
          <h2 className="weatherTemp">
            {" "}
            {(data?.main?.temp - 273.15).toFixed(2)}°C
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
