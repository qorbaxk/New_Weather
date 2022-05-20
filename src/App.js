import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBtn from './component/WeatherBtn';
import WeatherBox from './component/WeatherBox';

  //1.앱이 실행되자마자 현재 위치기반의 날씨가 보인다
  //2.날씨정보에는 도시, 섭씨, 상태
  //3.버튼이 있어서 (1개는 현재위치 4개는 다른도시)
  //4.도시버튼 누를때마다 도시별 날씨가 보인다
  //5.현재위치 기반 날시를 클릭하면 다시 현재위치 기반으로 돌아온다
  //6.데이터 가져오는 동안 로딩스피너

function App() {

  const [weather,setWeather]=useState(null);

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat=position.coords.latitude;
      let lon=position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon);
    });
  }

  const getCity=async(city)=>{
    console.log("도시는?",city);
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=kr&q=${city}&appid=ef710ba10aec5ee8c5ce8f984a15dff0`);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  const getWeatherByCurrentLocation=async(lat,lon)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=ef710ba10aec5ee8c5ce8f984a15dff0`);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
   
  }

  useEffect(()=>{
    getCurrentLocation()
  
  },[]);
  
  return (
    <div>
      <div className='container'>
        <WeatherBox weather={weather}/>
        <div className='selectbox'>
         <WeatherBtn onClick={()=>getCurrentLocation()}title="Current Location"/>
         <WeatherBtn onClick={()=>getCity('seoul')} title="Seoul"/>
         <WeatherBtn onClick={()=>getCity('new york')} title="New York"/>
         <WeatherBtn onClick={()=>getCity('london')} title="London"/>
         <WeatherBtn onClick={()=>getCity('paris')} title="Paris"/>
         <WeatherBtn onClick={()=>getCity('hong kong')} title="Hong Kong"/>
         <WeatherBtn onClick={()=>getCity('tokyo')} title="Tokyo"/>
         <WeatherBtn onClick={()=>getCity('sydney')} title="Sydney"/>
        </div>
      </div>
    </div>
  );
}

export default App;
