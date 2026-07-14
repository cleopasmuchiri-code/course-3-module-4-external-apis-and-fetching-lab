// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!
const input = document.getElementById("state-input");
const alertDisplay = document.getElementById("alerts-display");
const errorDisplay = document.getElementById("error-message");

function displayAlerts(data) {
  alertDisplay.innerHTML = "";

  // Hide the error container if a previous search failed
  errorDisplay.classList.add("hidden");
  errorDisplay.innerHTML = "";

  if (data) {
    const title = data.title;
    const numberOfAlerts = data.features.length;
    const summaryHeader = document.createElement("h3");
    const summaryMessage = `${title}: ${numberOfAlerts}`;
    summaryHeader.textContent = summaryMessage;
    alertDisplay.appendChild(summaryHeader);

    const features = data.features;
    features.forEach((element) => {
      const headline = element.properties.headline;
      const headlineUpdate = document.createElement("p");
      headlineUpdate.textContent = headline;
      alertDisplay.appendChild(headlineUpdate);
    });
  } else {
    console.log("No data found");
  }
}

async function fetchWeatherAlerts(state) {
  const STATE_ABBR = state;
  try {
    const response = await fetch(`${weatherApi}${STATE_ABBR}`);
    const data = await response.json();
    console.log(data);
    displayAlerts(data);
  } catch (error) {
    console.log(error);
    errorDisplay.innerHTML = "";

    const errorParagraph = document.createElement("p");

    if (error.message) {
      const errorMessage = error.message;
      errorParagraph.textContent = errorMessage;
      errorDisplay.appendChild(errorParagraph);
      errorDisplay.classList.remove = "hidden";
    }
  }
}

const button = document.getElementById("fetch-alerts");

button.addEventListener("click", () => {
  const state = input.value.trim();
  console.log(state);

  if (state) {
    fetchWeatherAlerts(state);
  } else {
    alert("Please enter a state abbreviation.");
  }

  input.value = "";
});
