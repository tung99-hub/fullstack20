import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)    
  }
  
  return (
    <div>
      find countries <input value={search} onChange={handleSearch} /> 
      <button onClick={() => setSearch('')}>redo search</button>
      <Filter search={search} countries={countries} change={setSearch}/>
    </div>
  );
}

export default App;
