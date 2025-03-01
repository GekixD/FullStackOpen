import { useState, useEffect } from "react";
import countryServices from './services/restCountries';
import weatherServices from './services/restWeather';

const Search = (props) => {
  return (
    <>
      find countries <input value={props.search} onChange={props.onChange} />
    </>
  );
};

const CountryWeather = (props) => {
  console.log(props.weather)

  const weather = props.weather.list[0]
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <>
      <h2>Weather in {props.city}</h2>
      <p>Temprature: {weather.main.temp}</p>
      <img src={iconUrl} alt='weather conditions icon' />
      <p>Wind: {weather.wind.speed}</p>
    </>
  );
}

const CountryDetails = (props) => {
  const country = props.country;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  console.log(`lat: ${lat}, lon: ${lon}`);

  return (
    <div style={{ border: 'solid 1px black', maxWidth: '50%' }}>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} | Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <CountryWeather
        city={country.capital[0]}
        weather={props.weather}
      />
    </div>
  );
};

const ShowDetails = (props) => {
  console.log(props.show + '|' + props.name);
  return (
    <button onClick={() => props.onClick(props.name)}>
      {props.show !== props.name ? 'Show' : 'Hide'}
    </button>
  );
};

const CountriesList = (props) => {
  const countries = props.countries;
  console.log(countries);

  if (countries.length > 10) {
    return <p>Too many matches, please specify another filter.</p>
  } else if (countries.length === 0) {
    return <p>No country matches this name, please specify another one.</p>
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} weather={props.weather} />
  }

  return (
    <>
      <ul>
        {countries.map(country =>
          <li key={country.tId} style={{ marginBottom: '1rem' }}>
            <span style={{ marginRight: '4px' }}>{country.name.common}</span>
            <ShowDetails onClick={props.onClick} name={country.name.common} show={props.showCountry} />
            {country.name.common === props.showCountry &&
              <CountryDetails
                country={country}
                weather={props.weather}
              />
            }
          </li>)}
      </ul>
    </>
  )
};

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryServices
      .getAll()
      .then(data => setCountries(data))
  }, [])

  useEffect(() => {
    if (!showCountry) {
      setWeather({
        'list': [
          {
            'main': { 'temp': `unable to get temprature data` },
            'weather': [{ 'icon': null }],
            'wind': { 'speed': `unable to get wind speed data` }
          }
        ]
      })
    }

    const country = countriesFiltered.find(c => c.name.common.includes(showCountry));
    if (!country) return;
    console.log('Top country name: ' + country.name.common);

    const { lat, lon } = country.capitalInfo.latlng;
    weatherServices
      .getOne(lat, lon)
      .then(data => setWeather(data))
      .catch(() => {
        setWeather({
          'list': [
            {
              'main': { 'temp': `unable to get temprature data for ${country.capital[0]}` },
              'weather': [{ 'icon': '01d' }],
              'wind': { 'speed': `unable to get wind speed data for ${country.capital[0]}` }
            }
          ]
        })
      });
    console.log(weather);
  }, [search, showCountry, countries]);

  const handleSearch = e => setSearch(e.target.value);

  const handleClick = (item) => {
    if (showCountry === item) {
      setShowCountry('');
    } else {
      setShowCountry(item);
    }
  };

  const countriesFiltered = countries.filter(
    item => item.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Search search={search} onChange={handleSearch} />
      <CountriesList
        countries={countriesFiltered}
        onClick={handleClick}
        showCountry={showCountry}
        weather={weather}
      />
    </>
  )
};

export default App;
