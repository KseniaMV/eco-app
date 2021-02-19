/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import colorData from "../assets/describe-air.json";
import GetDataFromAPI from "./helpers/getDataFromAPI";
export default class DetailCountryInfo {
  constructor(country, dataElements, root) {
    this.country = country;
    this.data = dataElements;
    this.root = root;
    this.conteiner = null;
    this.title = null;
    this.dataList = null;
    this.delete_button = null;
    this.graphConteiner = null;
    this.colorsBackground = [];
    this.forecastConteiner = null;
    this.forecastData = [];
    this.forecastElements = [];
    this.forecastNumbers = {};
  }

  outPutcountryInfo() {
    this.createInfoConteiner();
    this.createTitle();
    this.createElementsDataList();
    this.createDeleteButton();
    this.outPutData();
    this.createForecastConteiner();
  }

  createInfoConteiner() {
    const conteiner = document.createElement("div");
    this.conteiner = conteiner;
    conteiner.classList.add("country-info");
    this.root.append(conteiner); 
  }

  createTitle() {
    const title = document.createElement("h3");
    title.classList.add("country-info__title");
    if(this.country === "Russian Federation (Moscow)"){
      title.textContent = "Russian Federation";
    }else{
      title.textContent = this.country;
    }
    this.conteiner.append(title);
    this.title  = title;
  }

  createElementsDataList() {
    const dataList = document.createElement("div");
    dataList.classList.add("country-info__elements-list");
    this.title.after(dataList);
    const timeConteiner = this.createCurrentDateConteiner();
    this.title.after(timeConteiner);
    this.dataList = dataList;
  }

  createCurrentDateConteiner() {
    const currentDateConteiner = document.createElement("div");
    currentDateConteiner.classList.add("current-date__conteiner");
    const getDate = new GetDataFromAPI();

    const currentDate = getDate.getCountryInfo(this.country);
    currentDate.then((data)=>{
      currentDateConteiner.textContent = (data.data.time.s ?data.data.time.s : "--.--.--");
    });
    return currentDateConteiner;
  }

  createElement(element, value) {
    const elementData = document.createElement("div");
    elementData.classList.add("elements-list__element");
    const elementName = document.createElement("p");
    elementName.classList.add("element", "element-name");
    elementName.textContent = element === 0 ? "-" : element;
    const elementValue = document.createElement("p");
    elementValue.classList.add("element", "element-value");
    elementValue.textContent = value === 0 ? "-" : value;
    elementData.append(elementName);
    elementData.append(elementValue);
    return elementData;
  }

  outPutData() {
    for (const key in this.data) {
      const element = this.createElement(key, this.data[key]);
      this.dataList.append(element);
    }
  }

  createDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("country-info__del-button");
    this.conteiner.append(deleteButton);
    deleteButton.textContent = "close";
    this.delete_button = deleteButton;
    deleteButton.addEventListener("click", this.deleteInfoConteiner);
  }

  deleteInfoConteiner() {
    document.querySelector(".country-info").remove();
  }

  createGraphConteiner() {
    const craphConteiner = document.createElement("canvas");
    craphConteiner.classList.add("country-info__graph");
    craphConteiner.setAttribute("width", "90%");
    craphConteiner.setAttribute("id", "info-graph");
    craphConteiner.textContent = "Your browser does not support the canvas element.";
    this.conteiner.append(craphConteiner);
    this.graphConteiner = craphConteiner;
    this.createGraph();
  }

  createBackGrounds(data) {
    const dataNumbers = Object.values(data);
    dataNumbers.forEach(number => {
      for (const key in colorData) {
        const min = colorData[key].min;
        const max = colorData[key].max;
        if(number >= min && number <= max) {
          if(number === "-"){
            this.colorsBackground.push("rgba(0,0,0,.1)");
          } 
          this.colorsBackground.push(colorData[key].color);
        }
      }
    });
  }

  createGraph() {
    this.createBackGrounds(this.data);
    var ctx = this.graphConteiner.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["AQI", "CO", "O3", "NO2", "SO2", "PM10", "PM2.5"],
        datasets: [{
          label: "Air polution",
          data: Object.values(this.data),
          backgroundColor: this.colorsBackground,
          borderColor: this.colorsBackground,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    });
  }

  //use it to create forecast for target country
  getForecastData() {
    const getData = new GetDataFromAPI();
    const commonData = getData.getCountryInfo(this.country);
    commonData.then((data) => {
      const forecastData = data.data.forecast.daily;
      this.forecastData  = forecastData;
      for (const key in forecastData) {
        this.forecastNumbers = forecastData[key].map((element) => element.avg);
        this.forecastElements.push({
          "element": key,
          "days" : forecastData[key].map((element) => element.day),
          "avg" : forecastData[key].map((element) => element.avg)
        });
      }
    }).then(()=> this.createForecastCanva()).then(() => this.createForecast());
  }

  createForecastConteiner() {
    const forecastConteiner = document.createElement("div");
    forecastConteiner.classList.add("country-info__forecast-conteiner");
    this.conteiner.append(forecastConteiner);
    this.forecastConteiner = forecastConteiner;
    this.getForecastData();
  }

  createForecastCanva() {
    this.forecastElements.forEach((element) => {
      const forecastCanva = document.createElement("canvas");
      forecastCanva.classList.add("country-info__forecast-canvas");
      forecastCanva.setAttribute("id", `info-forecast-${element.element}`);
      forecastCanva.textContent = "Your browser does not support the canvas element.";
      this.forecastConteiner.append(forecastCanva);
    });
  }

  createForecast() {
    this.createBackGrounds(this.forecastNumbers);
    this.forecastElements.forEach((element) =>{
      for (const key in element) {
        var ctx = document.querySelector(`#info-forecast-${element.element}`).getContext("2d");
        const avg = element.avg;
        const days = element.days;
        const el = element.element;
        var myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: days,
            datasets: [{
              label: "forecast: " + el,
              data: avg,
              backgroundColor: this.colorsBackground,
              borderColor: this.colorsBackground,
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
          }
        });
      }
    });
  }
}