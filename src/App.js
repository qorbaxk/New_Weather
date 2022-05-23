import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBtn from "./component/WeatherBtn";
import WeatherBox from "./component/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";

//1.앱이 실행되자마자 현재 위치기반의 날씨가 보인다
//2.날씨정보에는 도시, 섭씨, 상태
//3.버튼이 있어서 (1개는 현재위치 4개는 다른도시)
//4.도시버튼 누를때마다 도시별 날씨가 보인다
//5.현재위치 기반 날시를 클릭하면 다시 현재위치 기반으로 돌아온다
//6.데이터 가져오는 동안 로딩스피너

function App() {
  const cities = [
    "Seoul",
    "New York",
    "London",
    "Paris",
    "Hong Kong",
    "Tokyo",
    "Sydney",
  ];

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Seoul");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=ef710ba10aec5ee8c5ce8f984a15dff0`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=kr&q=${city}&appid=ef710ba10aec5ee8c5ce8f984a15dff0`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherByCity();
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      getCurrentLocation();

    } else {
      setCity(city);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container">
          <div className="center">
            <ClipLoader color="#02343F" loading={loading} size={100} />
          </div> 
        </div>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <div className="selectbox">
            <WeatherBtn
              cities={cities}
              handleCityChange={handleCityChange}
           
            />
          </div>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}
export default App;
