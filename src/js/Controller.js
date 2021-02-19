import Map from "./Map";
import DetailCountryInfo from "./DetailCountryInfo";
import GetDataFromAPI from "./helpers/getDataFromAPI";
export default class Controller {
  constructor(root) {
    this.root = root;
    this.dataObj = null;
    this.targetCountry = null;
    this.defaultCountry = "Russian Federation (Moscow)";
  }

  getTargetCountry() {
    const list = document.querySelector(".nav__country-list");
    list.addEventListener("click", (e) => {
      if(e.target.classList.contains("country-list__item")) {
        const targetCountry = e.target.textContent;
        this.targetCountry = targetCountry;
        this.addDataToInfoObject(targetCountry);
      }
    });
  }

  loadDefaultCountryInfo() {
    this.targetCountry = this.defaultCountry;
    this.addDataToInfoObject(this.defaultCountry);
  }

  //use it to create block with detail info with elements
  addDataToInfoObject(targetCountry) {
    const getData = new GetDataFromAPI();
    const commonData = getData.getCountryInfo(targetCountry);
    const coordinates = getData.getTargetCountryCoordinates(targetCountry);        
    commonData.then((data)=>{                 
      this.dataObj = this.createInfoObject(data.data); 
      this.countryAQI = this.dataObj.aqi;
    }).then(()=>{
      coordinates.then((data)=> {
        this.lat = data[0];
        this.lng = data[1];
        const map = new Map();   
        map.LoadMap(this.lat, this.lng, this.countryAQI);
      }); 
    }).then(() => {
      this.outPutInfo();
    });
  }

  createInfoObject(indexData) {
    const obj = {};
    obj.aqi = indexData.aqi === "-" ? 0 : indexData.aqi;
    const indexArray = ["co", "o3", "no2", "so2", "pm10", "pm25"];
    indexArray.forEach((element) => {
      // eslint-disable-next-line no-unused-vars
      for (const key in indexData.iaqi) {
        if (Object.hasOwnProperty.call(indexData.iaqi, element)) {
          obj[element] = indexData.iaqi[element].v;
        } else {
          obj[element] = 0;
        }
      }
    });
    return obj;
  }

  outPutInfo() {
    const countryDetailsInfo = new DetailCountryInfo(this.targetCountry, this.dataObj, this.root);
    if (document.querySelector(".country-info")) {
      countryDetailsInfo.deleteInfoConteiner();
    }
    countryDetailsInfo.outPutcountryInfo();
    countryDetailsInfo.createGraphConteiner();
  }


}
