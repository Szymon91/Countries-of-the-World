const countriesList = document.querySelector('#countries');
let countries;

countriesList.addEventListener('change', e => countryInfo(e.target.value))

fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => getData(data))
    .catch(err => console.log(`Error: ${err}`))

function getData(countriesData) {
    countries = countriesData;
    let options = '';
       
    countries.forEach(country => options += `<option value="${country.name}">${country.name}</option>`);
    countriesList.innerHTML = options;
    countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);
    countryInfo(countriesList[countriesList.selectedIndex].value);
}

function countryInfo(countryId) {
    const countryData = countries.find(country => country.name === countryId);
    document.querySelector('#flag img').src = countryData.flag;
    document.querySelector('#flag img').alt = `Flag of ${countryData.name}`;
    document.querySelector('#capital').innerHTML = countryData.capital;
    document.querySelector('#population').innerHTML = countryData.population.toLocaleString();
    document.querySelector('#languages').innerHTML = countryData.languages.map(language => language.name).join(', ');
    document.querySelector('#currencies').innerHTML = countryData.currencies.map(currency => `${currency.name} (${currency.code})`).join(', ');
    document.querySelector('#timezones').innerHTML = countryData.timezones.map(timezone => timezone.slice(3, timezones.lenght)).join(', ');
}