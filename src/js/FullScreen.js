export default class FullScreen {

  createButton(element) {
    const button = document.createElement("button");
    const icon =document.createElement("i");
    button.classList.add("button--full-screen", "full-screen--default");
    icon.classList.add("fas","fa-expand");
    button.append(icon);
    button.addEventListener("click", ()=>{
      this.elementToFullScreen(element);
      if(!element.classList.contains("country-info")){
        element.classList.toggle("element--full-screen");
      }else{
        element.classList.toggle("country-info--full-screen");
      }
      button.classList.toggle("display--none");
    });
    return button;
  }

  elementToFullScreen(element) {
    const filter = this.createFilter();
    const buttonFilter = this.createFilterButton();
    document.querySelector(".main-content").append(filter);
    filter.append(buttonFilter);
    const elementParent = element.parentNode;
    filter.append(element);
    buttonFilter.addEventListener("click", ()=>{
      elementParent.append(element);
      if(!element.classList.contains("country-info")){
        element.classList.toggle("element--full-screen");
      }else{
        element.classList.toggle("country-info--full-screen");
      }
      filter.remove();
      const fullScreenButtons = document.querySelectorAll(".button--full-screen");
      fullScreenButtons.forEach((button) =>{
        if(button.classList.contains("display--none")){
          button.classList.remove("display--none");
        }
      });
    });
  }

  createFilter() {
    const filter = document.createElement("div");
    filter.classList.add("full-screen__filter");
    return filter;
  }

  createFilterButton() {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    button.classList.add("filter-screen__button");
    icon.classList.add("fas","fa-compress");
    button.append(icon);
    return button;
  }


}
