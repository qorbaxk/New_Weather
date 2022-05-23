import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBtn from "./component/WeatherBtn";
import WeatherBox from "./component/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";
import AirBox from "./component/AirBox";

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
  const [air, setAir] = useState(null);

  const currentAirQuality = async (lat,lon) =>{
    let url = new URL(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=962b0453ed99f7d057e1f97431ccf78f8df6a846`);
    let response = await fetch(url);
    let data = await response.json();
    setAir(data);
  }

  const cityAirQuality = async () =>{
    let url = new URL(`https://api.waqi.info/feed/${city}/?token=962b0453ed99f7d057e1f97431ccf78f8df6a846`);
    let response = await fetch(url);
    let data = await response.json();
    setAir(data);
  }


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      currentAirQuality(lat,lon);
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
    cityAirQuality();
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      getCurrentLocation();
      currentAirQuality();

    } else {
      setCity(city);
      cityAirQuality(city);
    }
  };

  const airLevel = (aqi)=>{
    let status = "";
    if(0<=aqi && aqi < 50){
        return status = "좋음";   
    }else if(50<=aqi && aqi<100){
        return status = "보통"; 
    }else if(aqi<=100 && aqi<150){
        return status = "약간 좋지않음"
    }else if(aqi<=150 && aqi<200){
        return status = "좋지 않음"
    }else if(aqi<=200 && aqi<300){
        return status = "매우 좋지 않음"
    }else if(aqi<=300 && aqi<500){
        return status = "위험한"
    }
  }

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
              handleCityChange={handleCityChange}/>
          </div>
          <AirBox air={air} airLevel={airLevel}/>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}
export default App;
