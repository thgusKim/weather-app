import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox1";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton1";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
//2. 도시, 섭씨, 화씨, 날씨 상태정보가 보인다.
//3. 5개의 버튼이 있다.(1개 현재위치, 4개는 다른 도시)
//4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재 위치 기반으로 돌아온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [loading, setLoading] = useState(false);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c9f1c1306a6494232fe39905e5f8b83a&units=metric`
    );
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9f1c1306a6494232fe39905e5f8b83a&units=metric`
    );
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </div>
  );
}

export default App;
