import { UI } from "./Ui";

const url =
  "https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital,languages,borders,currencies,timezones,latlng";

export class api {
  fetchCountries() {
    return fetch(url).then((response) => response.json());
  }
  sendCountires() {
    fetchCountries()
      .then((countries) => UI.renderCountries(countries))
      .catch((error) => console.error(error));
  }
}
