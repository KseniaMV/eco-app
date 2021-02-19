export default class TimeTillEnd {
  constructor() {
    this.timeConteiner = null;
    this._endDate = new Date("December 31, 2050 23:59:59").getTime();
    new Date().getTime();
  }

  createTimeConteiner() {
    const root = document.querySelector(".header");
    const timeConteiner = document.createElement("div");
    timeConteiner.classList.add("header__time-conteiner");
    timeConteiner.id = "countdown";
    root.append(timeConteiner);
  }
  countTime() {
    const timer = setInterval(() => {
      let timeNow = new Date().getTime();
      let diff = this._endDate - timeNow;
      let year = Math.floor(diff / 31104000000);
      let month = Math.floor((diff / 2592000000) % 12) > 9 ? Math.floor((diff / 2592000000) % 12) : "0" +  Math.floor((diff / 2592000000) % 12);
      let hour = Math.floor((diff / 3600000) % 24) > 9 ? Math.floor((diff / 3600000) % 24) :  "0" + Math.floor((diff / 3600000) % 24);
      let min = Math.floor((diff / 60000) % 60) > 9 ? Math.floor((diff / 60000) % 60) : "0" + Math.floor((diff / 60000) % 60);
      let sec = Math.floor((diff / 1000) % 60) > 9 ? Math.floor((diff / 1000) % 60) : "0" + Math.floor((diff / 1000) % 60);
      this.render({ year, month, hour, min, sec });
      if (diff < 0) {
        clearInterval(timer);
        this.timeConteiner.textContent = "Time is over";
      }
    }, 1000);
  }
  render(data) {
    document.getElementById("countdown").innerHTML = `Left before global pollution: ${data.year} years, ${data.month} month(s), ${data.hour} h : ${data.min} min : ${data.sec} sec`;
  }
}
