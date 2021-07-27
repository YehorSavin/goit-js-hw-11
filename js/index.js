class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.selector = selector;
      this.targetDate = targetDate;
  
      this.refs = {
        daysElem: document.querySelector(
          `${this.selector} span[data-value="days"]`
        ),
        hoursElem: document.querySelector(
          `${this.selector} span[data-value="hours"]`
        ),
        minsElem: document.querySelector(
          `${this.selector} span[data-value="mins"]`
        ),
        secsElem: document.querySelector(
          `${this.selector} span[data-value="secs"]`
        ),
      };
    }
    changeDate() {
      const time = this.targetDate.getTime() - new Date().getTime();
      if (time > 0) {
        this.calculateTime(time);
      } else {
        this.viewError();
      }
    }
    calculateTime(time) {
      const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const secs = Math.floor((time % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");
      this.changeElems(days, hours, mins, secs);
    }
    changeElems(days, hours, mins, secs) {
      this.refs.daysElem.textContent = days;
      this.refs.hoursElem.textContent = hours;
      this.refs.minsElem.textContent = mins;
      this.refs.secsElem.textContent = secs;
    }
    run() {
      this.changeDate();
      setInterval(() => {
        this.changeDate();
      }, 1000);
    }
    viewError() {
      document.querySelector(this.selector).textContent = "sorry!";
    }
  }
  const timer = new CountdownTimer({
    selector: "#timer-1",
    targetDate: new Date("april.27.2022"),
  });
  timer.run();