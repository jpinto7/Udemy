const axios = require('axios');

const FIXER_ACCESS_KEY = '28211b204c5effb309e13c3134efb904';
const FIXER_API_URL = `http://data.fixer.io/api/latest?access_key=${FIXER_ACCESS_KEY}`;
const REST_COUNTRIES_API_URL = 'https://restcountries.eu/rest/v2/currency';

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(FIXER_API_URL);
    const rate = response.data.rates[to] / response.data.rates[from];
    if (isNaN(rate)) {
      throw new Error();
    }
    return rate;
  } catch(e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(`${REST_COUNTRIES_API_URL}/${currencyCode}`);
    return response.data.map(data => data.name);  
  } catch(e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const conversion =  (rate * amount).toFixed(2);
  return `${amount} ${from} is worth ${conversion} ${to}. You can spend these in the following countries: ${countries.join(', ')}.`;
};

//getExchangeRate('EUR', 'GTQ').then(rate => console.log(rate));

//getCountries('EUR').then(countries => console.log(countries));

convertCurrency('GTQY', 'GTQ', 20)
  .then(result => console.log(result))
  .catch(e => console.log(e.message));