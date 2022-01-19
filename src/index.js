import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { fetchCountries } from './js/fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const country = evt.target.value.trim();
    
    if (!country) {
        clearData();
        return;
    }

    fetchCountries(country)
        .then((names) => {
            clearData();
            if (names.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (names.length === 1) {
                renderCountry(names);
            } else {
                renderCountries(names);
            }
        })
        .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
};

function renderCountry(names) {
    const markup = names
        .map(({ flags, name, capital, population, languages }) => {    
            return `<div class="country-item">
                <img class="flag" src="${flags.svg}" alt="flag of ${name.official}" width="30"> 
                <p class="title-big">${name.official}</p>
                </div>
                <p><span class="list-text">Capital: </span>${capital}</p>
                <p><span class="list-text">Population: </span>${population}</p>
                <p><span class="list-text">Languages: </span>${Object.values(languages)} </p>`;
            })
        .join("");
    
    refs.countryInfo.innerHTML = markup;  
};

function renderCountries(names) {
    const markup = names
        .map(({flags, name}) => {
            return `<li class="country-item">
            <img class="flag" src="${flags.svg}" alt="flag of ${name.official}" width="30"> 
            <p class="title">${name.official}</p>           
            </li>`;
        })
        .join("");
    
    refs.countryList.innerHTML = markup;        
};

function clearData() {
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = "";
}