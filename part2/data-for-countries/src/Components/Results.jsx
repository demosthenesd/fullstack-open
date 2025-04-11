import countryService from '../services/countries'
import Weather from './Weather';



const Results = ({ countries, setSearch }) => {





    if (!countries || countries.length === 0) {
        return <></>;
    }


    if (countries.length === 1) {

        return (
            <div>
                <h1>{countries[0].name.common}</h1>
                <p>Capital: {countries[0].capital}</p>
                <p>Area: {countries[0].area}</p>
                <h1>Languages</h1>
                <ul>
                    {Object.entries(countries[0].languages).map(([code, language]) => (
                        <li key={code}>{language}</li>
                    ))}
                </ul>
                <div>
                    <img style={{ height: "50%", width: "50%" }}
                        src={countries[0].flags.svg} alt={countries[0].flags.alt} />
                </div>

                <Weather countryName={countries[0].name.common} />
            </div>
        )
    }


    return (
        <div>
            {countries.length > 10 ? (
                <p>Too many countries, be more specific please</p>
            ) : (
                <ul>
                    {countries.map((country) => (
                        <li key={country.cca3}>{country.name.common} <button onClick={() => setSearch(country.name.common)}>Show</button></li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Results;
