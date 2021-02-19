export default class CreateContentPage {
  constructor(root) {
    this.root = root;
    this.header = null;
    this.nav = null;
    this.map = null;
    this.mapConteiner = null;
  }
  createHeader() {
    const mainHeader = document.createElement("header");
    mainHeader.classList.add("main__header");
    this.header = mainHeader;
    this.root.append(mainHeader);
  }

  createNavigation() {
    const mainNav = document.createElement("nav");
    mainNav.classList.add("main__navigation" ,"full-screen");
    //this.createFullScreenButton(mainNav);
    this.nav = mainNav;
    this.header.after(mainNav);
  }
  createSearchInput() {
    const wrapper = document.createElement("div");
    const createSearchInput = document.createElement("input");
    wrapper.classList.add("nav__wrapper-input");
    createSearchInput.classList.add("nav__search-input");
    this.nav.append(wrapper);
    wrapper.append(createSearchInput);
  }
  createList() {
    const createList = document.createElement("ul");
    createList.classList.add("nav__country-list");
    this.nav.append(createList);
  }

  createMap() {
    const conteinerMap = document.createElement("div");
    conteinerMap.classList.add("map-conteiner");
    const map = document.createElement("article");
    map.classList.add("main___map" , "full-screen");
    this.map = map;
    this.mapConteiner = conteinerMap;
    this.nav.after(conteinerMap);
    conteinerMap.append(map);
  }

  createOutPutConteiner() {
    const outPutConteiner = document.createElement("aside");
    outPutConteiner.classList.add("main__outPut-conteiner");
    this.mapConteiner.after(outPutConteiner);
  }

  initCreateContentPage() {
    this.createHeader();
    this.createNavigation();
    this.createMap();
    this.createOutPutConteiner();
    this.createSearchInput();
    this.createList();
  }
}
