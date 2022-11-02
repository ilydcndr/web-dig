import './App.css';
import { useEffect, useState } from 'react';
import { BASE_URL,CITY_1 } from './config/constants';

function App() {
  const [data, setdata] = useState(null);
	const [filteredData, setfilteredData] = useState(null);
	const [temp, setTemp] = useState('°C');

    useEffect(() => {

        let url = `${BASE_URL}/v1/forecast.json?key=698dc13c77094cf187695058201212&q=${CITY_1}&days=1`

				setInterval(() => {
					fetch(url)
					.then(response=>response.json())
					.then(responsedData => {
						setdata(responsedData)
						gethourly(responsedData)
					});
				}, 10000);
			
    }, [])
     
		const gethourly = (data) => {
			setfilteredData(data?.forecast.forecastday[0].hour.filter((item) => new Date(item.time) >= new Date()).slice(0,8))
		}

		const selectTemp = (selectedTemp) => {
			if(selectedTemp !== temp ){
				setTemp(selectedTemp);
			}
		}

  return (
    <div className='weather'>
		  <div className='weather-header'>
				<div>
					<p className='weather-header__condition'>{data?.current?.condition.text}</p>
					<p >{data?.location?.name}, {data?.location?.country}</p>
				</div>
				<div className='weather-header__temp'>
					<span onClick={()=>selectTemp('°C')} className = {temp === '°C' ? 'activeTemp' : '' }>°C</span>
					<span onClick={()=>selectTemp('°F')} className = {temp !== '°C' ? 'activeTemp' : '' }>°F</span>
				</div>
			</div>
    	<div className='weather-content'>
        {filteredData?.map((item, index) => 
				  <div key={index} className="weather-content__icon-list">
						<p>{new Date(item.time).getHours()>= 12 ? `${new Date(item.time).getHours()} PM` : `${new Date(item.time).getHours()} AM`}</p>
						<img src={item.condition.icon} alt={item.condition.text}/>
						<p>{temp === '°C' ? `°C ${item.temp_c}` : `°F ${item.temp_f}`}</p>
					</div>
				)}
    	</div>
    </div>
  );
}
export default App;