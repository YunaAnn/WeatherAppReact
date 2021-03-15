import './App.css';
import React, { useState } from 'react';
const api = 
{
  key: "f8aba5735fc5204fde995c0bb04e6f84",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() 
{
  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = event =>
  {
    if(event.key === "Enter")
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => 
        {
        setWeather(result);
        setQuery('');
        console.log(result);
        });
    }
  }

  const dateBuilder = (d) => 
  {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">
        <main>
              <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
              </div>
              {(typeof weather.main != "undefined") ? (
                  <div>
                        <div className="location-box">
                            <div className="location"> 
                                  {weather.name}, {weather.sys.country} 
                            </div>
                            <div className="date"> {dateBuilder(new Date())}</div>
                            <div className="weather-box"> 
                                <div className="temperature"> 
                                    {Math.round(weather.main.temp)}°C
                                </div>  
                                <div className="weather"> 
                                  {weather.weather[0].main}
                                </div>   
                            </div>    
                        </div>
                  </div>
              ) : ('')}
              <div className="footer">
              <a  target="_blank" rel="noopener noreferrer" href="https://github.com/YunaAnn"><i className="fab fa-github"></i></a>
              </div>



        </main>
    </div>
  );
}

export default App;
