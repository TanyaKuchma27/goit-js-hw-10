export function fetchCountries(name) {
    const searchParams = 'name,capital,population,flags,languages';
    const http = `https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`;
    return fetch(http)
    .then(response => response.json())
} 