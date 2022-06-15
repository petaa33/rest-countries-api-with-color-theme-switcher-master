const filter = document.querySelector('.filterRegion');
const region = document.querySelectorAll('.region');
const countries = document.querySelector('.countries-list');
const countrySearch = document.getElementById('countrySearch');
const country = document.querySelectorAll('.country');
const countryArray = [];
const themeButton = document.getElementById('theme');
const searchIcon = document.getElementById('searchIcon');

const API_URL = "https://restcountries.com/v2/all";

async function getCountryData() {
    const res = await fetch(API_URL);
    const data = await res.json();
    for(let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        li.classList.add('country');
        countryArray.push(li);
        li.innerHTML = `
        ${setShortInfo(data[i])}
        ${setDetailedInfo(data[i])} 
        `
        li.addEventListener('click', ()=>{
            getDetails(i);
        })
        countries.appendChild(li);
    }
}

//Set Short info & Detailefd info
function setShortInfo(data){
    return `
    <div class="short-info">
          <img src="${data.flag}" alt="${data.name}" class="flag">
          <span class="countryName"><strong>${data.name}</strong></span>
          <span class="countrySpanShort">Population: <span id="population">${data.population.toLocaleString('en-US')}</span></span>
          <span class="countrySpanShort">Region: <span id="region">${data.region}</span></span>
          <span class="countrySpanShort">Capital: <span id="capital">${data.capital}</span></span>
        </div>
        `
}
function setDetailedInfo(data) {
    return `
    <div class="detailed-info hidden">
           <button class="backbutton">
              <i class="fas fa-arrow-left"></i>Back
           </button>
          <img src="${data.flag}" alt="${data.name}" class="flagTwo">
          <div class="country-span-container">
            <h2>${data.name}</h2>
            <span class="countrySpan">Native name: <span class="country-info">${data.name}</span></span>
            <span class="countrySpan">Population: <span class="country-info">${data.population.toLocaleString('en-US')}</span></span>
            <span class="countrySpan">Region: <span class="country-info">${data.region}</span></span>
            <span class="countrySpan">Subregion: <span class="country-info">${data.subregion}</span></span>
            <span class="countrySpan">Capital: <span class="country-info">${data.capital}</span></span>
            <span class="countrySpan">Top level domain: <span class="country-info">${data.topLevelDomain[0]}</span></span>
            <span class="countrySpan">Currencies: <span class="country-info">${data.hasOwnProperty('currencies') ? data.currencies.map((currency)=>{
                return currency.code + " " + currency.name;
            }).join(" ") : "No currency"} </span></span>
            <span class="countrySpan">Languages: <span class="country-info">${data.languages.map((language)=>{
                return language.name;
            }).join(" ")}</span></span>
            <span class="border-container">Border countries: <span class="country-info"><span class = "borderCountry">${data.hasOwnProperty('borders') ? data.borders.map((border)=>{
                return border;
            }).join(" "): "No borders" }</span></span></span>
           </div>
        </div>`
}

// Onclick displays detailed info about country 
function getDetails(x){
    countryArray[x].children[1].classList.toggle('hidden');
    searchIcon.classList.toggle('hidden');
    scroll(0,0)
}

getCountryData();

//Input Filter
countrySearch.addEventListener('input', (country) => {
    filterCountry(country.target.value);
})
function filterCountry(country) {
    countryArray.forEach(countryX => {
        if(countryX.innerText.toLowerCase().includes(country.toLowerCase())) {
            countryX.classList.remove('hidden');
        } else countryX.classList.add('hidden');
    }) 
}

//Navigation Region Filter
filter.addEventListener('click', ()=>{
    region.forEach((regionX) => {
        regionX.addEventListener('click', ()=>{
            filterByRegion(regionX.innerHTML);
        })    
        regionX.classList.toggle('hidden');
        filter.classList.toggle('active');
    });
});

function filterByRegion(regionX) {
    countryArray.forEach(countryX =>{
        if(!countryX.innerText.includes(regionX)) {
            countryX.classList.add('hidden');
        } else countryX.classList.remove('hidden');
    });
}

// Theme change function
let lightTheme = true;
themeButton.addEventListener('click', ()=>{
    const theme = document.getElementsByTagName('link')[0];
    lightTheme ? theme.setAttribute('href', 'style.css') : theme.setAttribute('href', 'light.css');
    lightTheme = !lightTheme; 
})

