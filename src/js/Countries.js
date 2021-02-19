export default class Countries {
  constructor() {
    this._data;
    this._searchTerm = "";
    this.fetchCountriesAndFlag();
  }
  
  async fetchCountriesAndFlag() {
    const req = await fetch("/countries.json");
    this._data = await req.json();
    this._data.sort((a, b) => a.name > b.name ? 1 : -1);
    this.render(this._data);
  }

  searchCountry() {
    const inputSearch = document.querySelector(".nav__search-input");
    inputSearch.addEventListener("input", (e) => {
      this._searchTerm = e.target.value.toLowerCase();
      if (this._searchTerm.length > 0) {
        let reg = new RegExp(`${this._searchTerm}{0,}`);
        const result = this._data.filter(item => reg.test(item.name.toLowerCase()));
        this.render(result);
      }
    });
  }
  render(data) {
    const nav = document.querySelector(".nav__country-list");
    while (nav.firstChild) {
      nav.firstChild.remove();
    }
    data.map(item => {
      const list = document.createElement("li");
      list.classList.add("country-list__item");
      const flagImg = document.createElement("img");
      flagImg.src = item.flag;
      list.textContent = item.name;
      nav.append(list);
      list.prepend(flagImg);
    });
  }
}
