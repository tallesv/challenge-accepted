import { useState } from 'react';
import { AutoComplete, Input } from 'antd';

import Header from './components/Header';

import localesJSON from './assets/locales.json';
import weatherJSON from './assets/weather.json';
import './styles/global.css';
import WeatherCard from './components/WeatherCard';

function App() {
  const [locale, setLocale] = useState();
  const [weather, setWeather] = useState();

  function handleSearch(formData) {
    const searchValue = formData;
    const findLocale = localesJSON.find(
      localeItem => localeItem.name.toLowerCase() === searchValue.toLowerCase(),
    );
    setLocale(findLocale);
    if (findLocale) {
      const weatherFromLocale = weatherJSON.find(
        weatherItem => weatherItem.locale.id === findLocale.id,
      );
      setWeather(weatherFromLocale);
    }
  }

  return (
    <>
      <Header />
      <div className="containerInput">
        <div>
          <AutoComplete
            className="input"
            options={[{ value: 'Osasco' }, { value: 'São Paulo' }]}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            backfill
          >
            <Input.Search
              name="inputSearch"
              size="large"
              placeholder="Digite uma localização"
              enterButton
              onSearch={e => handleSearch(e)}
            />
          </AutoComplete>
        </div>
      </div>

      <main>
        {locale ? (
          <>
            <div>
              <span>{`Previsão para ${locale.name} - ${locale.state}`}</span>
            </div>
            <div>
              {weather.weather.map(weatherItem => (
                <div key={weatherItem.date}>
                  <WeatherCard weather={weatherItem} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <p>Sem resultados, faça uma nova busca</p>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
