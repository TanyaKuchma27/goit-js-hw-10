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
    if (!evt.target.value) {
        refs.countryList.innerHTML = '';
        return;
    }

    const country = evt.target.value.trim();
    fetchCountries(country)
        .then((names) => {
            if (names.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (names.length > 10) {
                refs.countryInfo.innerHTML = "";
                refs.countryList.innerHTML = "";
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (names.length === 1) {
                refs.countryList.innerHTML = "";
                renderCountry(names);
            } else {
                refs.countryInfo.innerHTML = "";
                renderCountries(names);
            }
        })
    .catch((error) => console.log(error));
};

function renderCountry(names) {
    const markup = names.map(name => {
    return `<div class="country-item">
        <img class="flag" src="${name.flags.svg}" alt="flag of ${name.name.common}" width="30"> 
        <p class="title-big">${name.name.common}</p>
        </div>
        <p><span class="list-text">Capital: </span>${name.capital}</p>
        <p><span class="list-text">Population: </span>${name.population}</p>
        <p><span class="list-text">Languages: </span>${Object.values(name.languages)} </p>`;
    });
    refs.countryInfo.innerHTML = markup; 
};

function renderCountries(names) {
    const markup = names
        .map(name => {
            return `<li class="country-item">
            <img class="flag" src="${name.flags.svg}" alt="flag of ${name.name.common}" width="30"> 
            <p class="title">${name.name.common}</p>           
            </li>`;
        })
        .join("");
    
    refs.countryList.innerHTML = markup;        
};