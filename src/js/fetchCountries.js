export function fetchCountries(name) {
    const searchParams = 'name,capital,population,flags,languages';
    const https = `https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`;
    return fetch(https)
        .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })  
} 