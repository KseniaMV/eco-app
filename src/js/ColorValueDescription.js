import colors from "../assets/describe-air.json";
import FullScreen from "./FullScreen";
export default class ColorValueDescription {
  constructor() {
    this.root = document.querySelector(".map-conteiner");
    this.colorDescribeConteiner = null;
    this.buttonConteiner = null;
  }

  createCoverFilter() {
    const coverFilter = document.createElement("div");
    coverFilter.classList.add("coverFilter");
    this.root.append(coverFilter);
    return coverFilter;
  }

  createColorConteiner() {
    const colorDescribeConteiner = document.createElement("div");
    colorDescribeConteiner.classList.add("color-describe__conteiner");
    this.colorDescribeConteiner = colorDescribeConteiner;
    return colorDescribeConteiner;
  }

  createColorTitle(value, color) {
    const colorTitle = document.createElement("h3");
    colorTitle.classList.add("color-describe__title");
    colorTitle.textContent = value;
    colorTitle.style.color = color;
    this.colorDescribeConteiner.append(colorTitle);
  }

  createColorValue(min, max) {
    const colorValue = document.createElement("p");
    colorValue.classList.add("color-describe__value");
    colorValue.textContent = `Value: from ${min} to ${max}`;
    this.colorDescribeConteiner.append(colorValue);
  }

  createColorDescription(value) {
    const colorDescription = document.createElement("p");
    colorDescription.classList.add("color-describe__description");
    colorDescription.textContent = `Description: ${value}`;
    this.colorDescribeConteiner.append(colorDescription);

  }

  createRecomendation(value) {
    const recomendation = document.createElement("p");
    recomendation.classList.add("color-describe__recomendation");
    recomendation.textContent = `Recomendation: ${value}`;
    this.colorDescribeConteiner.append(recomendation);
  }

  createButtonConteiner() {
    const buttonConteiner = document.createElement("div");
    buttonConteiner.classList.add("button-conteiner");
    this.buttonConteiner = buttonConteiner;
    this.root.append(buttonConteiner);
    const fullscreenButton = new FullScreen();
    const button = fullscreenButton.createButton(this.root);
    buttonConteiner.append(button);
    this.createColorsButtons();
  }
  
  createColorsButtons() {
    const dataValues = colors;
    for (const key in dataValues) {
      const colorButton = document.createElement("button");
      colorButton.classList.add("color-button");
      colorButton.textContent = key;
      colorButton.style.backgroundColor = `${dataValues[key].color}`;
      this.buttonConteiner.append(colorButton);
    }
  }

  getValueInfo() {
    this.buttonConteiner.addEventListener("click", (e) => {
      if(!e.target.classList.contains("color-button")) return;
      const targetValue = e.target.textContent;
      const dataObj = this.getDataColorValue(targetValue);
      const filter = this.createCoverFilter();
      const conteiner = this.createColorConteiner();
      filter.append(conteiner);
      this.createColorTitle(targetValue, dataObj.color);
      this.createColorValue(dataObj.min, dataObj.max);
      this.createColorDescription(dataObj.describe);
      this.createRecomendation(dataObj.recomendation);
      this.createDeleteButton();
    });
  }

  getDataColorValue(targetValue) {
    const data = colors;
    for (const key in data) {
      if (key === targetValue) {
        return data[key];
      }
    }
  }


  createDeleteButton() {
    const delButton = document.createElement("button");
    delButton.classList.add("deleteButton");
    delButton.textContent = "close";
    this.colorDescribeConteiner.append(delButton);
    delButton.addEventListener("click", this.deleteColorDescribe);
  }

  deleteColorDescribe() {
    document.querySelector(".coverFilter").remove();
  }
}
