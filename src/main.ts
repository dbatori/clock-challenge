import "./style.css";

// DOM elem refs
const hourQuarter = queryP(".hour-quarter");
const hourHalf = queryP(".hour-half");
const face = queryDiv(".face");
const hoursHand = queryDiv(".hours-hand");
const minutesHand = queryDiv(".minutes-hand");
const secondsHand = queryDiv(".seconds-hand");
const timeShiftDec = queryButton(".time-shift-dec");
const timeShift = queryDiv(".time-shift");
const timeShiftInc = queryButton(".time-shift-inc");

// init time shift
let timeShiftMinutes = parseInt(localStorage.getItem("time-shift") ?? "0", 10);
timeShift.textContent = timeShiftInfo();
timeShiftDec.addEventListener("click", () => updateTimeShift(-10));
timeShiftInc.addEventListener("click", () => updateTimeShift(5));

// init clock
addNumbersToClock();
updateClock();
setInterval(updateClock, 1000);

// DOM query utils
function queryP(selector: string): HTMLParagraphElement {
  return document.querySelector(selector) as HTMLParagraphElement;
}

function queryDiv(selector: string): HTMLDivElement {
  return document.querySelector(selector) as HTMLDivElement;
}

function queryButton(selector: string): HTMLButtonElement {
  return document.querySelector(selector) as HTMLButtonElement;
}

// draw numbers on clock
function addNumbersToClock() {
  for (const n of [...Array(12)].map((_, i) => i + 1)) {
    const numberDirection = document.createElement("div");
    numberDirection.className = "direction";
    numberDirection.style.cssText = `--rotation: ${30 * n}deg;`;
    const number = document.createElement("div");
    number.className = "number";
    number.textContent = n.toString();
    numberDirection.appendChild(number);
    face.appendChild(numberDirection);
  }
}

// update hands and textual infos
function updateClock() {
  const date = new Date(Date.now() + 60000 * timeShiftMinutes);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  hourQuarter.textContent = quarterInfo(minutes);
  hourHalf.textContent = halfInfo(minutes);
  hoursHand.style.cssText = `--rotation: ${30 * (hours + minutes / 60)}deg;`;
  minutesHand.style.cssText = `--rotation: ${6 * minutes}deg;`;
  secondsHand.style.cssText = `--rotation: ${6 * seconds}deg;`;
}

// update time shift
function updateTimeShift(shift: number) {
  timeShiftMinutes += shift;
  timeShift.textContent = timeShiftInfo();
  localStorage.setItem("time-shift", timeShiftMinutes.toString());
  updateClock();
}

// formatting utils
function quarterInfo(minutes: number): string {
  if (minutes < 15) return "1st quarter";
  if (minutes < 30) return "2nd quarter";
  if (minutes < 45) return "3rd quarter";
  return "4th quarter";
}

function halfInfo(minutes: number): string {
  if (minutes < 30) return "1st half";
  return "2nd half";
}

function timeShiftInfo(): string {
  return timeShiftMinutes > 0
    ? `+${timeShiftMinutes}`
    : timeShiftMinutes.toString();
}
