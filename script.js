// 1. Weather dataset mapping condition keys to icon, description, and background class
const weatherData = {
  sunny: {
    name: "Sunny",
    icon: "☀️",
    description: "Clear skies and bright sunshine. Perfect weather to go outside!",
    bgClass: "sunny-bg"
  },
  cloudy: {
    name: "Cloudy",
    icon: "☁️",
    description: "Overcast skies with gray clouds covering the sun.",
    bgClass: "cloudy-bg"
  },
  rainy: {
    name: "Rainy",
    icon: "🌧️",
    description: "Expect steady rain showers. Don't forget your umbrella!",
    bgClass: "rainy-bg"
  },
  snowy: {
    name: "Snowy",
    icon: "❄️",
    description: "Cold temperatures with gentle snowfall accumulating outside.",
    bgClass: "snowy-bg"
  },
  thunderstorm: {
    name: "Thunderstorm",
    icon: "⛈️",
    description: "Heavy downpours accompanied by lightning and thunder.",
    bgClass: "thunderstorm-bg"
  },
  windy: {
    name: "Windy",
    icon: "💨",
    description: "Breezy conditions with strong, gusty winds.",
    bgClass: "windy-bg"
  }
};

// 2. Default state when no condition is selected
const defaultState = {
  name: "No condition selected",
  icon: "🌤️",
  description: "Please choose a weather condition from the dropdown above.",
  bgClass: "default-bg"
};

// 3. Cache DOM element references
const weatherSelect = document.getElementById("weatherSelect");
const weatherIcon = document.getElementById("weatherIcon");
const weatherCondition = document.getElementById("weatherCondition");
const weatherDescription = document.getElementById("weatherDescription");
const bgEffects = document.getElementById("bgEffects");

// Custom dropdown elements
const customDropdown = document.getElementById("customDropdown");
const dropdownTrigger = document.getElementById("dropdownTrigger");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
const selectedLabel = document.getElementById("selectedLabel");

// 4. Function to generate animated background visuals matching the weather
function updateBackgroundEffects(conditionKey) {
  // Clear any existing background animation elements
  bgEffects.innerHTML = "";

  if (conditionKey === "sunny") {
    // Glowing sun element with rotating rays
    const sun = document.createElement("div");
    sun.className = "bg-sun";
    sun.innerHTML = '<div class="sun-rays"></div>';
    bgEffects.appendChild(sun);

    // Warm floating light orbs
    for (let i = 0; i < 5; i++) {
      const bokeh = document.createElement("div");
      bokeh.className = "sun-bokeh";
      const size = 25 + Math.random() * 40;
      bokeh.style.width = `${size}px`;
      bokeh.style.height = `${size}px`;
      bokeh.style.left = `${5 + Math.random() * 85}%`;
      bokeh.style.top = `${15 + Math.random() * 65}%`;
      bokeh.style.animationDelay = `${i * 0.9}s`;
      bgEffects.appendChild(bokeh);
    }
  } else if (conditionKey === "snowy") {
    // Falling snowflakes (contained safely within screen percentage)
    const flakeSymbols = ["❄", "❅", "❆", "•"];
    for (let i = 0; i < 26; i++) {
      const flake = document.createElement("span");
      flake.className = "snowflake";
      flake.textContent = flakeSymbols[i % flakeSymbols.length];
      flake.style.left = `${Math.random() * 94}%`;
      flake.style.fontSize = `${14 + Math.random() * 18}px`;
      flake.style.animationDuration = `${3.5 + Math.random() * 4}s`;
      flake.style.animationDelay = `${Math.random() * 4.5}s`;
      flake.style.opacity = (0.5 + Math.random() * 0.5).toString();
      bgEffects.appendChild(flake);
    }
  } else if (conditionKey === "rainy") {
    // Falling raindrops
    for (let i = 0; i < 35; i++) {
      const drop = document.createElement("div");
      drop.className = "raindrop";
      drop.style.left = `${Math.random() * 98}%`;
      drop.style.height = `${18 + Math.random() * 22}px`;
      drop.style.animationDuration = `${0.5 + Math.random() * 0.4}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      drop.style.opacity = (0.4 + Math.random() * 0.6).toString();
      bgEffects.appendChild(drop);
    }
  } else if (conditionKey === "cloudy") {
    // Drifting clouds across the sky
    for (let i = 0; i < 4; i++) {
      const cloud = document.createElement("div");
      cloud.className = "bg-cloud";
      cloud.style.top = `${8 + i * 18}%`;
      cloud.style.width = `${120 + Math.random() * 110}px`;
      cloud.style.height = `${40 + Math.random() * 28}px`;
      cloud.style.animationDuration = `${16 + Math.random() * 12}s`;
      cloud.style.animationDelay = `${i * 3.5}s`;
      bgEffects.appendChild(cloud);
    }
  } else if (conditionKey === "thunderstorm") {
    // Lightning flash overlay
    const flash = document.createElement("div");
    flash.className = "lightning-flash";
    bgEffects.appendChild(flash);

    // Heavy rain
    for (let i = 0; i < 35; i++) {
      const drop = document.createElement("div");
      drop.className = "raindrop";
      drop.style.left = `${Math.random() * 98}%`;
      drop.style.height = `${22 + Math.random() * 26}px`;
      drop.style.animationDuration = `${0.4 + Math.random() * 0.3}s`;
      drop.style.animationDelay = `${Math.random() * 1.5}s`;
      bgEffects.appendChild(drop);
    }
  } else if (conditionKey === "windy") {
    // Wind gust streaks
    for (let i = 0; i < 6; i++) {
      const streak = document.createElement("div");
      streak.className = "wind-streak";
      streak.style.top = `${15 + i * 12}%`;
      streak.style.width = `${100 + Math.random() * 140}px`;
      streak.style.animationDuration = `${1.8 + Math.random() * 1.5}s`;
      streak.style.animationDelay = `${Math.random() * 2}s`;
      bgEffects.appendChild(streak);
    }

    // Swirling leaves
    const leaves = ["🍃", "🍂"];
    for (let i = 0; i < 6; i++) {
      const leaf = document.createElement("span");
      leaf.className = "wind-leaf";
      leaf.textContent = leaves[i % leaves.length];
      leaf.style.top = `${10 + Math.random() * 70}%`;
      leaf.style.animationDuration = `${3 + Math.random() * 2.5}s`;
      leaf.style.animationDelay = `${Math.random() * 3}s`;
      bgEffects.appendChild(leaf);
    }
  }
}

// 5. Function to update UI based on selected condition
function updateWeatherDisplay(conditionKey) {
  // Use object lookup or fall back to default state
  const selectedWeather = weatherData[conditionKey] || defaultState;

  // Update text and icon
  weatherIcon.textContent = selectedWeather.icon;
  weatherCondition.textContent = selectedWeather.name;
  weatherDescription.textContent = selectedWeather.description;

  // Update background styling and animated visual effects
  document.body.className = selectedWeather.bgClass;
  updateBackgroundEffects(conditionKey);
}

// 6. Custom Dropdown interactions
function closeCustomDropdown() {
  customDropdown.classList.remove("open");
  dropdownTrigger.setAttribute("aria-expanded", "false");
}

function openCustomDropdown() {
  customDropdown.classList.add("open");
  dropdownTrigger.setAttribute("aria-expanded", "true");
}

// Toggle dropdown when trigger button is clicked
dropdownTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = customDropdown.classList.contains("open");
  if (isOpen) {
    closeCustomDropdown();
  } else {
    openCustomDropdown();
  }
});

// Close when clicking anywhere outside
document.addEventListener("click", (e) => {
  if (!customDropdown.contains(e.target)) {
    closeCustomDropdown();
  }
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && customDropdown.classList.contains("open")) {
    closeCustomDropdown();
    dropdownTrigger.focus();
  }
});

// Handle custom item clicks
dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.getAttribute("data-value");

    // Update active item classes
    dropdownItems.forEach((i) => i.classList.remove("selected"));
    item.classList.add("selected");

    // Update trigger label
    selectedLabel.textContent = item.textContent.trim();

    closeCustomDropdown();

    // Sync underlying native select and trigger update
    if (weatherSelect.value !== value) {
      weatherSelect.value = value;
      weatherSelect.dispatchEvent(new Event("change"));
    } else {
      updateWeatherDisplay(value);
    }
  });

  // Support pressing Enter on focused list item
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });
});

// 7. Event listener for native select changes (for programmatic tests)
weatherSelect.addEventListener("change", (event) => {
  const selectedKey = event.target.value;

  // Sync custom dropdown active item and label
  dropdownItems.forEach((item) => {
    if (item.getAttribute("data-value") === selectedKey) {
      item.classList.add("selected");
      selectedLabel.textContent = item.textContent.trim();
    } else {
      item.classList.remove("selected");
    }
  });

  updateWeatherDisplay(selectedKey);
});

// Set initial default view
updateWeatherDisplay("");
