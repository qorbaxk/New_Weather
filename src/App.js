import { useEffect, useState } from 'react';
import './App.css';
import Btn from './component/Btn';

  //1.앱이 실행되자마자 현재 위치기반의 날씨가 보인다
  //2.날씨정보에는 도시, 섭씨, 상태
  //3.버튼이 있어서 (1개는 현재위치 4개는 다른도시)
  //4.도시버튼 누를때마다 도시별 날씨가 보인다
  //5.현재위치 기반 날시를 클릭하면 다시 현재위치 기반으로 돌아온다
  //6.데이터 가져오는 동안 로딩스피너

function App() {

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat=position.coords.latitude;
      let lon=position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon);
    });
  }

  const getWeatherByCurrentLocation=async(lat,lon)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=ef710ba10aec5ee8c5ce8f984a15dff0`);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
   
  }

  useEffect(()=>{
    getCurrentLocation()
  
  },[]);
  
  return (
    <div>
      <div className='container'>
        <div className='box'>
          <p>London</p>
          <h1>22 &#8451;</h1>
          <p>clear sky</p>
        </div>
        <div className='selectbox'>
         <Btn title="Current Location"/>
         <Btn title="New York"/>
         <Btn title="Los Angeles"/>
         <Btn title="London"/>
         <Btn title="Sydney"/>
        </div>
      </div>
    </div>
  );
}

export default App;
