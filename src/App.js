import './App.css';
import { useEffect, useState } from 'react';
import { BASE_URL,CITY_1 } from './config/constants';

function App() {
  const [dayBaseData, setdayBaseData] = useState([]);
    useEffect(() => {
        let url = `${BASE_URL}/v1/forecast.json?key=698dc13c77094cf187695058201212&q=${CITY_1}&days=1`
        fetch(url)
        .then(response=>response.json())
        .then(data => {
            console.log(data,"data")
            setdayBaseData(data)
        });
    }, [])

  return (
    <>
    	<div>
        {dayBaseData.forecast.forecastday.map = (item, index) => {
          <div key={index}>
              <p>12PM</p>
              <img src={item.day.condition.icon} alt={item.day.condition.text}/>
              <p>{item.day.avgtemp_c}</p>
          </div>
        }}
    	</div>
    </>
  );
}
export default App;