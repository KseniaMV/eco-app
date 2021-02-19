export default class TopContriesPollution {
  constructor() {
    this._listContries = [];
    this.fetchAllAqiContries();
    this.createElements();
    this._topCleanContries = null;
    this._topDirtyContries = null;
  }
  async fetchAllAqiContries() {
    const req = await fetch("/countries.json");
    this._listContries = await req.json();
    this.fetchAllAqi();
  }
  fetchAllAqi() {
    Promise.all(this._listContries.map(item =>
      fetch(`https://api.waqi.info/feed/${item.name}/?token=703e3e7f4f8ffef686979528a294718f8e40c91f`)
        .then(res => res.json())
        .then(res => ({ aqi: res.data.aqi, name: item.name, flag: item.flag }))
        // eslint-disable-next-line no-console
        .catch(err => console.log("Error " + err))
    ))
      .then(data => {
        let res = data.filter(item => typeof item.aqi === "number")
          .sort((a, b) => a.aqi - b.aqi);
        this._topCleanContries = res.splice(0, 10);
        this._topDirtyContries = res.splice(-10, res.length);
        this.render(this._topCleanContries, this._topDirtyContries);
      });
  }
  createElements() {
    const mainContent = document.querySelector(".main__outPut-conteiner");
    const dirtyCountriesList = document.createElement("ul");
    const cleanCountriesList = document.createElement("ul");
    dirtyCountriesList.classList.add("list-dirtyCountries", "county-list--hidden");
    cleanCountriesList.classList.add("list-cleanCounturies");

    const outPutButtonConteiner = document.createElement("div");
    outPutButtonConteiner.classList.add("main__btn-conteiner");

    const cleanCountries_btn = document.createElement("button");
    cleanCountries_btn.classList.add("cleanList_btn", "button--active");
    cleanCountries_btn.textContent = "top 10 clean countries";
    
    const dirtyCountries_btn = document.createElement("button");
    dirtyCountries_btn.classList.add("dirtyList_btn");
    dirtyCountries_btn.textContent = "top 10 dirty countries";

    mainContent.append(outPutButtonConteiner);
    outPutButtonConteiner.append(cleanCountries_btn);
    cleanCountries_btn.after(dirtyCountries_btn);

    outPutButtonConteiner.after(dirtyCountriesList);
    outPutButtonConteiner.after(cleanCountriesList);
    this.showList (dirtyCountries_btn, cleanCountries_btn, dirtyCountriesList, cleanCountriesList);
  }

  render(topClean, topDirty) {
    const cleanCountriesList = document.querySelector(".list-cleanCounturies");
    const dirtyCountriesList = document.querySelector(".list-dirtyCountries");
    topClean.forEach(item => {
      this.createList (cleanCountriesList, item);
    });
    topDirty.forEach(item => {
      this.createList (dirtyCountriesList, item);
    });
  }

  createList (list, item) {
    const listItem = document.createElement("li");
    const imgFlag = document.createElement("img");
    imgFlag.src = item.flag;
    listItem.textContent = item.name + " " + item.aqi + " AQI";
    list.append(listItem);
    listItem.prepend(imgFlag);
  }

  showList (dirtyBtn, cleanBtn, dirtyCountriesList, cleanCountriesList) {
    dirtyBtn.addEventListener("click", ()=>{
      dirtyBtn.classList.add("button--active");
      cleanBtn.classList.remove("button--active");
      dirtyCountriesList.classList.toggle("county-list--hidden");
      cleanCountriesList.classList.toggle("county-list--hidden");
    });
    cleanBtn.addEventListener("click", ()=>{
      cleanBtn.classList.add("button--active");
      dirtyBtn.classList.remove("button--active");
      dirtyCountriesList.classList.toggle("county-list--hidden");
      cleanCountriesList.classList.toggle("county-list--hidden");
    });
  }
}
