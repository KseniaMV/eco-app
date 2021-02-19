import elementsData from "../assets/describe-elements.json";
import GetDataFromAPI from "./helpers/getDataFromAPI";
export default class ElementDescription {
  constructor() {
    this.element = null;
    this.root = document.querySelector(".map-conteiner");
    this.elementsConteiner = null;
  }

  createDescriptionConteiner() {
    const elementsConteiner = document.createElement("div");
    elementsConteiner.classList.add("elementInfo-conteiner");
    this.elementsConteiner = elementsConteiner;
    this.root.append(elementsConteiner);
  }

  createElementName(value) {
    const elementName = document.createElement("p");
    elementName.classList.add("elementInfo-name");
    elementName.textContent = value;
    return elementName;
  }

  createElementDescription(value, title) {
    const elementDesc = document.createElement("p");
    elementDesc.classList.add("elementInfo-desc");
    elementDesc.textContent = value;
    const elementTitle = document.createElement("p");
    elementTitle.classList.add("elementInfo-title");
    elementTitle.textContent = title;
    elementDesc.prepend(elementTitle);
    return elementDesc;
  }

  createElement() {
    const data = elementsData;
    for (const key in data) {
      const element = document.createElement("div");
      element.classList.add("elementInfo");
      const name = this.createElementName(key);
      const desc = this.createElementDescription(data[key].desc, data[key].title);
      element.append(name);
      name.after(desc);
      this.elementsConteiner.append(element);
      this.getElemetDataByClick(desc);
    }
  }

  getElemetDataByClick(name) {
    name.addEventListener("click", (e)=>{
      const targetElement = e.target.previousSibling.textContent;
      const a = new GetDataFromAPI();
      a.getElementValue(targetElement);
    });
  }

}