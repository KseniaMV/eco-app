/* eslint-disable no-unused-vars */
import "./assets/css/main.css";
import "./assets/scss/main.scss";
import CreateContentPage from "./js/CreateContentPage";
import TimeTillEnd from "./js/TimeTillEnd.js";
import Countries from "./js/Countries";
import Controller from "./js/Controller.js";
import CreateMap from "./js/Map.js";
import ElementDescription from "./js/ElementDescription.js";
import ColorValueDescription from "./js/ColorValueDescription.js";
import TopContriesPollution from "./js/TopContriesPollution";

const root = document.querySelector("#root");

const contentPage = new CreateContentPage(root);
contentPage.initCreateContentPage();

const timeTillEnd = new TimeTillEnd();
timeTillEnd.createTimeConteiner();
timeTillEnd.countTime();

const countries = new Countries();
countries.fetchCountriesAndFlag();
countries.searchCountry();

const topContriesPollution = new TopContriesPollution();

const controller = new Controller(root);
controller.loadDefaultCountryInfo();
controller.getTargetCountry();


const newMap = new CreateMap();

const elementDescription = new ElementDescription();
elementDescription.createDescriptionConteiner();
elementDescription.createElement();


const colorValueDescription = new ColorValueDescription();
colorValueDescription.createButtonConteiner();
colorValueDescription.getValueInfo();
