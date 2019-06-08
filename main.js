const countriesList = document.querySelector('#countries');
const countriesPopulationList = document.querySelector('#countries-population');
const prevPageBtn = document.querySelector('#prevPage');
const nextPageBtn = document.querySelector('#nextPage');

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
    
    populationRankList ()
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

function populationRankList () {
    const populationListArr = [];

    countries.forEach(country => {
        const populationInfoObj = {};
        populationInfoObj.name = country.name;
        populationInfoObj.population = country.population;
        populationListArr.push(populationInfoObj);
    })
    
    sortedList = populationListArr.sort((a,b) => {
        if(a.population < b.population) {
            return 1;
        } else if (b.population < a.population) {
            return -1;
        } else {
            return 0;
        }
    })

    sortedList.forEach((item, index )=> {
        const li = document.createElement('li');
        li.innerHTML = `${index + 1}. ${item.name} <span>${item.population.toLocaleString()}</span>`;
        if (index <=49) {
            li.className ='page1 visible';
        } else if (index < 100) {
            li.classList.add('page2');
        } else if (index < 150) {
            li.classList.add('page3');
        } else if (index < 200) {
            li.classList.add('page4');
        } else {
            li.classList.add('page5');
        }
        countriesPopulationList.append(li);
        let counter = 1;
        const pages = 5;

        prevPageBtn.addEventListener('click', function() {
            if (counter <= pages && counter > 1) {
                counter--;
            } else {
                counter = 5;
            }
            if (li.className == `page${counter}`) {
                li.classList.add('visible');
            } else {
                li.classList.remove('visible');
            }
        })
        nextPageBtn.addEventListener('click', function() {
            if (counter < pages) {
                counter++;
            } else {
                counter = 1;
            }
            if (li.className == `page${counter}`) {
                li.classList.add('visible');
            } else {
                li.classList.remove('visible');
            }
        })
    }); 
}


// const input = document.querySelector('input');
// const spanPoints = document.querySelector('.points');

// function game (name) {
//     let points = 0;
//     let lifes = 3;
//     input.addEventListener('change', (e) => {    
        
//         if (e.target.value === countries.name); {
//             points++
//         }
//         console.log(points);
//         spanPoints.textContent = points;
//     })
// }
// game(countriesList[countriesList.selectedIndex].value)