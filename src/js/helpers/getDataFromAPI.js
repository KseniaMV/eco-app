import countries from "../../static/countries.json";
export default class GetDataFromAPI {
  constructor() {
    this.data = null;
  }
  //use it to get data object by coordinates
  getDataByCoordinates(lat, lng) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", `https://api.waqi.info/feed/geo::${lat}:${lng}/?token=703e3e7f4f8ffef686979528a294718f8e40c91f`);
      request.onload = function () {
        if (request.status === 200) {
          resolve(JSON.parse(request.response));
        } else {
          reject("file nor found");
        }
      };
      request.send();
    });
  }
   
  //use it to get data object for target country name
  getCountryInfo(country) {
    if (country === "Russian Federation (Moscow)") country = "moscow";
    if (country=== "belarus") country= "lithuania";
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", `https://api.waqi.info/feed/${country}/?token=703e3e7f4f8ffef686979528a294718f8e40c91f`);
      request.onload = function () {
        if (request.status === 200) {
          resolve(JSON.parse(request.response));
        } else {
          reject("file nor found");
        }
      };
      request.send();
    });
  }
 
  //use it to get AQI data for target country
  //const a = getDate.getAQIdataForCountry(this.country);
  // a.then((data) => console.log(data));   ==> aqi
  getAQIdataForCountry(targetCountry) {
    const commonData = this.getCountryInfo(targetCountry);
    return commonData.then((data) => data.data.aqi);
  }

  getTargetCountryCoordinates(targetCountry) {
    const commonData = this.getCountryInfo(targetCountry);
    return commonData.then((data) => data.data.city.geo);
  }

  //use it to get element data for target country
  getElementDataForCountry(targetCountry, targetElement) {
    const commonData = this.getCountryInfo(targetCountry);
    let values = {}; 
    return commonData.then((data) => {
      const elementsData = data.data.iaqi;
      for (const key in elementsData) {
        if(key === targetElement) {
          values.value = elementsData[key].v !== "" ? elementsData[key].v : "--";
          values.country = targetCountry;
        }
      }
      return values;
    });
  }

  //use it to get element value
  getElementValue(targetElement) {
    const countriesData = countries;   //json file added in top
    for (const key in countriesData) {
      const keyData = this.getElementDataForCountry(countriesData[key].name, targetElement.toLowerCase());
      keyData.then((data) =>{
        if(data.value != "undefined"){
          console.log(data.value + " / " + data.country);
        }
      }); 
    }
  }
}