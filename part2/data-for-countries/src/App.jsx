import { useEffect, useState } from 'react'
import CountryForm from './Components/CountryForm'
import countryService from './services/countries'
import Results from "./Components/Results"

function App() {

  const [countries, setCountries] = useState("");
  const [search, setSearch] = useState("");


  useEffect(() => {

    if (search !== null && search.trim() !== "") countryService.getCountry(search).then(res => {
      setCountries(res)
    }
    );
  }, [search]);



  const handleSearch = (e) => {
    setSearch(e.target.value);

  }


  return (
    <>
      <div>
        Find countries   <CountryForm onChange={handleSearch} />
      </div>
      <Results countries ={countries} setSearch ={setSearch} setCountries={ setCountries}/>
    </>
  )
}

export default App
