import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = (props) => {
  const [ weather, setWeather ] = useState(null)
  
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current` + 
    `?access_key=${api_key}` + 
    `&query=${props.country.capital}`
  
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)        
      })
  }, [])

  return (
    <div>
      <h1>{props.country.name}</h1>

      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>

      <h2>Spoken languages</h2>
      <ul>
        {props.country.languages.map(language => 
          <li key={language.name}>{language.name}</li>)}
      </ul>

      <img src={props.country.flag} alt='Country flag' width='150' height='100' />
    
      <h2>Weather in {props.country.capital}</h2>
      <div>
        <p><b>temperature: </b>{weather && weather.current.temperature} Celsius</p>
        <img src={weather && weather.current.weather_icons[0]} />
        <p><b>wind: </b>{weather && weather.current.wind_speed} mph direction {weather && weather.current.wind_dir}</p>  
      </div>
    </div>    
  )
}

export default CountryView