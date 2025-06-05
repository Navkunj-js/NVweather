let btnfirst = document.querySelector(".btnfirst");
let start = document.querySelector(".start");
let weatherDiv = document.querySelector(".weather");
let forcast = document.querySelector("#forcastText div");
let windSpeed = document.querySelector(".speedData");
let div2 = document.querySelector(".div2");
let startBlur = document.querySelector(".startBlur");
let main = document.querySelector(".main");

btnfirst.addEventListener("click", () => {
  start.style.transform = "translateX(-100vw)";
  start.style.transition = "transform 0.3s ";
  setTimeout(() => {
   
  }, 300);
  setTimeout(() => {
    weatherDiv.style.transform = "translatey(0px)";
    weatherDiv.style.transition = "transform 0.3s";
  }, 300);
});
function createStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    weatherDiv.appendChild(star);

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let delay = Math.random() * 3;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationDelay = `${delay}s`;
  }
}
function rain(numberOfDrops) {
  main.classList.add("rain");
  main.id = "rain";
  const rainContainer = document.getElementById("rain");

  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    drop.style.animationDelay = Math.random() * 5 + "s";
    rainContainer.appendChild(drop);
  }
}

// createStars(150);
// time
function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let date = now.getDate();
  let dateDIv = document.querySelector(".date");
  let dayDiv = document.querySelector(".day");
  let monthDiv = document.querySelector(".month");

  let setDay = () => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    dayDiv.innerText = days[now.getDay()];
  };
  let setMonth = () => {
    let month = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    monthDiv.innerText = month[now.getMonth()];
  };

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  let timeString = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} ${ampm}`;
  dateDIv.innerText = `${date}`;

  setDay();
  setMonth();
}

setInterval(updateTime, 1000);

// Initial call to display time immediately
updateTime();
// fetch weather details from api
let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let temp = document.querySelector(".temperature");
let feel = document.querySelector(".feelData");
let humidity = document.querySelector(".humidityData");
let pressure = document.querySelector(".pressureData");
let weatherText = document.querySelector(".weatherText");
let locationName = document.querySelector(".locationName");
let locationDay = document.querySelector(".locationDay");
let locationTime = document.querySelector(".locationTime");
let icon = document.querySelector(".icon");

// Function to fetch weather data
async function fetchWeather() {
  const city = input.value.trim();
  const apiKey = "649f2cd429594ea1a0e82426252603"; // Replace with your actual API key

  if (!city) {
    console.log("Please enter a city name!");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    var data = await response.json();

    console.log(data); // Logs the entire response object
    
    // function of date

  

// Extract parts
const dateParts = data.location.localtime.split(" ")[0].split("-"); // ["2025", "06", "05"]
const year = parseInt(dateParts[0]);
const month = parseInt(dateParts[1], 10); // 6
const day = parseInt(dateParts[2], 10);   // 5
const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const dateObj = new Date(`${year}-${month}-${day}`);
const weekday = dayNames[dateObj.getDay()];
const monthName = monthNames[month - 1];
const formatted = `${weekday}, ${day} ${monthName}`;

// for extract time in 12 hour format

  // startBlur.style.display = "none";
// Extract hour and minute
const timePart =data.location.localtime.split(" ")[1]; // "21:29"
let [hour, minute] = timePart.split(":").map(Number); // [21, 29]

// Determine AM/PM
const period = hour >= 12 ? "PM" : "AM";

// Convert to 12-hour format
hour = hour % 12;
if (hour === 0) hour = 12; // 12 AM or 12 PM

// Final formatted time
const formattedTime = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;



    // Insert temperature from API response
    temp.innerText = ` ${data.current.temp_c}°C`;
    windSpeed.innerText = ` ${data.current.wind_kph} km/h`;
    feel.innerText = ` ${data.current.feelslike_c}°C`;
    humidity.innerText = ` ${data.current.humidity}%`;
    pressure.innerText = `${data.current.pressure_mb} mb`;
    weatherText.innerText = data.current.condition.text;
    locationName.innerText = data.location.name;
    locationDay.innerText = formatted;
    locationTime.innerText =formattedTime;
  } catch (error) {
    console.log("Error fetching data!", error);
  }

  input.value = ""; // Clear the input field after fetching

  const date = new Date();
  const hour = date.getHours();

  if (hour >= 6 && hour < 18) {
    // It's day time (6 AM to 6 PM)
    console.log("Day time detected");
    if ((data.current.condition.text = "Sunny")) {
      main.style.backgroundImage = "url('sunny.jpg')";
      icon.src = "sunny.png";
    } else if ((data.current.condition.text = "Cloudy")) {
      main.style.backgroundImage = "url('cloudy.jpg')";
      icon.src = "cloud.png";
    } else if ((data.current.condition.text = "Rainy")) {
      main.style.backgroundImage = "url('rainy.jpg')";
      icon.src = "rainy-day.png";
      rain(100);
    } else {
      main.style.backgroundImage = "url('day.jpg')";
    }
  } else {
    console.log("Night time detected");
    div2.style.objectFit = "cover";

    if (data.current.condition.text == "partly cloudy") {
      main.style.backgroundImage = "url('partlyCloud.jpg')";
    } else if (data.current.condition.text == "Rainy") {
      main.style.backgroundImage = "url('rainy.jpg')";
      icon.src = "raining.png";
    } else if (data.current.condition.text == "Clear") {
      main.style.backgroundImage = "url('clear.jpg')";
      icon.src = "moon.png";
      createStars(100);
    } else if (data.current.condition.text == "Patchy rain nearby") {
      main.style.backgroundImage = "url('rainy.jpg')";
      
    } else if ((data.current.condition.text = "Cloudy")) {
      main.style.backgroundImage = "url('cloudy.jpg')";
      icon.src = "cloudy-night.png";
     
    } else {
      main.style.backgroundImage = "url('night1.jpg')";
    }
  }
}
//automatic bg changer
let clouds = document.querySelector("#clouds");



function detectDayOrNight() {
  const date = new Date();
  const hour = date.getHours(); // Get current hour (0-23)

  if (hour >= 6 && hour < 18) {
    // It's day time (6 AM to 6 PM)
    clouds.src = "cloud.png";
    main.style.backgroundImage = "url('day.jpg')";
  } else {
    // It's night time
    clouds.src = "night.png";
    main.style.backgroundImage = "url('night1.jpg')";
  }
}

detectDayOrNight();
function focus() {
  input.focus();
}
temp.style.cursor = "pointer";
temp.addEventListener("click", focus);

// Event listener for button click
btn.addEventListener("click", function () {
  fetchWeather();
  temp.removeEventListener("click", focus);
 
});

// Event listener for Enter key press
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchWeather();
    temp.removeEventListener("click", focus);
     
  }
});

let nav = document.querySelector("nav");

let originalParent = nav.parentElement;

window.addEventListener("resize", function () {
  const width = window.innerWidth;

  if (width < 1150 && width > 550) {
    if (div2.contains(nav)) {
      div2.appendChild(nav);
    }
  } else {
    if (!originalParent.contains(nav)) {
      originalParent.appendChild(nav);
    }
  }
});

let weatherBox = document.querySelector(".weatherBox");
let div3 = document.querySelector(".div3");
let phoneWeather = document.querySelector(".phoneWeather");

function moveWeatherBox() {
  const width = window.innerWidth;

  if (width < 1150 && width > 550) {
    // Move to div3 when width is between 550px and 1150px
    if (!div3.contains(phoneWeather)) {
      div3.appendChild(phoneWeather);
    }
    temp.style.fontSize = "120px";
  } else {
    // Move back to div2 when width is outside the range
    if (!div2.contains(phoneWeather)) {
      div2.appendChild(phoneWeather);
    }
  }
}

// Trigger on page load and on resize
window.addEventListener("load", moveWeatherBox);
window.addEventListener("resize", moveWeatherBox);

// label for start
