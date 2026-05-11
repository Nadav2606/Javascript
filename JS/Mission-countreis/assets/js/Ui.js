export class Country {
  name;
  region;
  flags;
  population;
  capital;

  constructor(name, region, flags, population, capital) {
    this.name = name;
    this.region = region;
    this.flags = flagsSrc;
    this.population = population;
    this.capital = capital;
  }
}

export class UI {
  Allcountries = [];
  likeCountries = [];

  static renderCountries(countries) {
    countriesContainer = document.getElementById("countriesContainer");
    countries.forEach((country) => {
      const currentCountry = new Country(
        country.name.common,
        country.region,
        country.flags.png,
        country.population,
        country.capital,
      );

      this.Allcountries.push(0, currentCountry);

      countriesContainer.innerHTML += `
<div class="card">

    <div class="flag">
    <img src="${currentCountry.flagsSrc}" alt="${country.flags.alt}">
    </div>

<div class="content">    
 <h2>${currentCountry.name}</h2>
<p>${currentCountry.population}</p> 
</div>
 

    <div class="stats">
    <p class="region">${currentCountry.region}</p>
    <p class="capital">${currentCountry.capital}</p>
    </div>
</div>`;
    });
  }
}
