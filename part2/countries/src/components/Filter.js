import React from 'react'
import CountryView from './CountryView'

const Filter = (props) => {  
  const findCountries = () => {
    const results = props.countries.filter(country => country.name.toLowerCase().includes(props.search.toLowerCase()))
    if (results.length > 10) {
      return <p> Too many matches, specify another filter. </p>
    }
    else if (results.length === 1) {
      return <CountryView country={results[0]} />
    }
    else {
      return results.map((country) => 
        <div key={country.name}>
          <p> {country.name} <button onClick={() => props.change(country.name)}>show</button> </p> 
        </div>
      )
    }
  }
    
  return (
    <div>
      {findCountries()}
    </div> 
  )
}

export default Filter