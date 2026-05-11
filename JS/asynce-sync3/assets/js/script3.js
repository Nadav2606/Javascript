const countriesContainer = document.getElementById("countriesContainer");

const url =
  "https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital,languages,borders,currencies,timezones,latlng";

function fetchCountries() {
  return fetch(url).then((response) => response.json());
}

fetchCountries()
  .then((countries) => renderCountries(countries))
  .catch((error) => console.error(error));

function renderCountries(countries) {
  countries.forEach((country) => {
    const languages = country.languages
      ? Object.values(country.languages).join(" | ")
      : "No countries avaliable this moment,please try again later.";

    const currencies = country.currencies
      ? Object.values(country.currencies)
          .map((curr) => `${curr.name} ${curr.symbol}`)
          .join(" | ")
      : "No countries avaliable this moment,please try again later.";

    const latlng = country.latlng
      ? Object.values(country.latlng).join(" | ")
      : "No countries avaliable this moment,please try again later.";

    countriesContainer.innerHTML += `
<div class="card">

    <div class="flag">
    <img src="${country.flags.png}" alt="${country.flags.alt}">
    </div>

<div class="content">    
 <h2>${country.name.common}</h2>
<p>${country.population.toLocaleString()}</p> 
</div>
 

    <div class="stats">
    <p class="region">${country.region}</p>
    <p class="capital">${country.capital}</p>
    
    </div>


    <div class="tags">
     <p class="languages">${languages}</p>
    <p class="currencies">${currencies}</p>
    </div>

  <div>   
    <p>${country.timezones}</p>
    <p>${latlng}</p>
  </div>

</div>`;
  });
}
