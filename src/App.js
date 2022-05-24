import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBtn from "./component/WeatherBtn";
import WeatherBox from "./component/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";
import AirBox from "./component/AirBox";


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
  const condition = "";
  const rainFall = 0;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Seoul");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const [air, setAir] = useState(null);


  //대기상태 현재위치로 받는 함수
  const currentAirQuality = async (lat,lon) =>{
    try{
      let url = new URL(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=962b0453ed99f7d057e1f97431ccf78f8df6a846`);
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setAir(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
   
  }

  //대기상태 도시이름으로 받는 함수
  const cityAirQuality = async () =>{
    try{
      let url = new URL(`https://api.waqi.info/feed/${city}/?token=962b0453ed99f7d057e1f97431ccf78f8df6a846`);
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setAir(data);setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
 
  }

  //현재위치 받아오는 위도경도함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      currentAirQuality(lat,lon);
    });
  };

  //현재위치로 날씨 받는 함수
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

  //도시이름으로 날씨 받는 함수
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

  //시작할때 실행되는 함수들
  useEffect(() => {
    getWeatherByCity();
    cityAirQuality();
  }, [city]);

  //선택하는 도시 정보 받는 함수
  const handleCityChange = (city) => {
    if (city === "current") {
      getCurrentLocation();
      currentAirQuality();

    } else {
      setCity(city);
      cityAirQuality(city);
    }
  };

  //대기질 상태 나타내는 함수
  const airLevel = (aqi)=>{
    let status = "";
    if(0<=aqi && aqi < 50){
      return status = "좋음"; 
    }else if(50<=aqi && aqi<100){
        return status = "보통"; 
    }else if(aqi<=100 && aqi<150){
        return status = "약간 좋지 않음"
    }else if(aqi<=150 && aqi<200){
        return status = "좋지 않음"
    }else if(aqi<=200 && aqi<300){
        return status = "매우 좋지 않음"
    }else if(aqi<=300 && aqi<500){
        return status = "위험함"
    }
  }


  return (
    <div className="cover">
      {loading ? (
        <div className="container">
          <div className="center">
            <ClipLoader color="#02343F" loading={loading} size={100} />
          </div> 
        </div>
      ) : !apiError ? (
        <div className="container">
          <div className="explain">🌞오늘의 날씨🌡️</div>
          <WeatherBox weather={weather} rainFall={rainFall} />
          <WeatherBtn
              cities={cities}
              handleCityChange={handleCityChange}/>
          <div className="explain">😷오늘의 대기상태💨</div>
          <AirBox air={air} airLevel={airLevel} condition={condition}/>

        </div>
      ) : (
        apiError
      )}
    </div>
  );
}
export default App;
