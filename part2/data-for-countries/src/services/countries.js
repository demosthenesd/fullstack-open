import axios from 'axios'
const restCountriesURL = 'https://restcountries.com/v3.1';
const weatherURL = 'https://api.openweathermap.org/data/2.5';
const api_key = import.meta.env.VITE_SOME_KEY;


const getAll = () => {
  const request = axios.get(`${restCountriesURL}/all`)
  return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`${restCountriesURL}/name/${country}`)
    return request.then(response => response.data).catch(error =>{ console.log(error)})
  }


const getWeather = (country) => {
    const request = axios.get(`${weatherURL}/find?q=${country}&appid=${api_key}&units=metric`)
    return request.then(response => response.data).catch(error =>{ console.log(error)})

}


export default { getAll, getCountry,getWeather }
