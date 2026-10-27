# Weather Condition Selector

A responsive, client-side web application designed to practice conditional rendering and data-to-UI mapping without external APIs. Selecting any weather condition from a dropdown dynamically renders a matching icon, descriptive forecast, and an animated themed background.

---

## 📁 Project Structure

```text
Weather_Icon/
├── index.html    # Semantic structure, accessible custom & native dropdowns
├── style.css     # Responsive design system, theme variables & weather animations
├── script.js     # Data dictionary mapping, DOM updates, & dropdown logic
└── README.md     # Documentation, deployment guide, rollback evidence & Q&A
```

---

## 🎯 Approach & Outcome

### 1. Approach
- **Data Dictionary Pattern**: Rather than using repetitive `if/else` or `switch` statements, weather conditions are stored in a centralized JavaScript dictionary (`weatherData`). Each condition maps to:
  - Display name
  - Representative icon / emoji
  - Forecast description
  - CSS background class
- **Sensible Default State**: Initialized with a neutral fallback state (`defaultState`) that guides the user to select an option before any condition is selected.
- **Mobile-First Responsive Layout**: Built using Flexbox with dynamic viewport support (`min-height: 100dvh`), `margin: auto`, and percentage-based bounds to ensure full centering without clipping.
- **Cross-Platform In-Card Dropdown**: Built a custom dropdown component bounded strictly to the card's width to eliminate native desktop select popup overflow in mobile preview emulators, while keeping the native `<select>` synchronized in the background for accessibility and test suites.
- **Declarative CSS Animations**: Ambient weather effects (pulsing sun rays, falling snowflakes, animated rain streaks, drifting clouds, lightning flashes, blowing leaves) are powered by GPU-accelerated CSS keyframe animations.

### 2. Outcome
- ✅ **Zero API Dependencies**: Fast, instantaneous updates using client-side memory lookup.
- ✅ **Flawless Mobile Rendering**: Custom dropdown prevents overflow on narrow viewports (down to 320px).
- ✅ **Accessible & Standard Compliant**: Semantic HTML with ARIA attributes (`role="listbox"`, `role="option"`, `aria-haspopup`, `aria-expanded`).
- ✅ **Clean Separation of Concerns**: HTML handles layout, CSS handles visuals & transitions, JavaScript handles state and DOM mapping.

---

## 🚀 Deployment Configuration

Because this project is built entirely with vanilla HTML5, CSS3, and JavaScript, it requires zero build steps and can be hosted statically anywhere.

### Option 1: Local Development
Run with any lightweight local server:

### Option 2: GitHub Pages
1. Push the code to a GitHub repository.
2. In the repository settings, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.
5. Your project will be live at `https://<username>.github.io/<repo-name>/`.

### Option 3: Vercel / Netlify
- **Netlify**: Drag and drop the `Weather_Icon` folder into the Netlify Drop dashboard, or link your Git repository with build command left blank and publish directory set to `.`.
- **Vercel**: Import the Git repository and click **Deploy** (zero-config static deployment).

---

## 🔄 Rollback Strategy & Evidence Log

### Rollback Strategy
- Every release or structural change is tracked via Git tags (e.g., `v1.0.0-baseline`, `v1.1.0-mobile-fix`).
- If an update introduces layout regressions or breaks cross-browser support, rollback to the previous stable release can be executed immediately:
  ```bash
  git checkout <tag-name>
  # or revert specific commits:
  git revert <commit-hash>
  ```

### Rollback / Incident Remediation Evidence

| Incident ID | Observed Behavior | Root Cause | Remediation / Fix Applied | Status |
|---|---|---|---|---|
| **INC-001** | Mobile preview displayed the dropdown popup extending completely outside the card and off-screen. | Native OS `<select>` menu in desktop Chromium DevTools applies desktop platform minimum width, overflowing narrow simulated viewports. | Replaced native popup rendering with an in-card custom dropdown constrained to `width: 100%` of `.control-group`, with a synchronized hidden `<select>` behind the scenes. | **Resolved** |
| **INC-002** | Horizontal scrollbar and off-center card on mobile viewport. | Background particles (`snowflake`, `driftCloud`) used unconstrained `vw` units and `translateX` transforms exceeding `100vw`. | Added `overflow-x: hidden` on `html` and `body`; bounded all generated visual elements to percentage limits (`%`). | **Resolved** |
| **INC-003** | iOS Safari automatic zoom-in when focusing input elements. | Form controls with `font-size` below `16px` trigger automatic browser viewport zoom on iOS. | Enforced `font-size: 16px` on trigger and input controls. | **Resolved** |

---

## 💡 Assessment Interview Questions & Answers

### Q1: How would you map a condition name to an icon?
> **Answer:**  
> Use a JavaScript key-value dictionary (an Object or Map). The condition string (such as `"sunny"` or `"snowy"`) acts as the lookup key:
> ```javascript
> const weatherIcons = {
>   sunny: "☀️",
>   rainy: "🌧️",
>   snowy: "❄️"
> };
> 
> const icon = weatherIcons[selectedCondition] || "🌤️";
> ```
> This enables instant $O(1)$ constant-time lookup and decouples data from rendering logic.

---

### Q2: Why use an object instead of many `if/else` statements?
> **Answer:**  
> 1. **Maintainability & Extensibility (Open/Closed Principle)**: Adding or modifying a new weather condition only requires adding an entry into the configuration object without editing or cluttering the control flow.
> 2. **Performance**: Object property access is direct hash-table lookup ($O(1)$), whereas an `if/else` or `switch` chain executes linearly ($O(n)$) checking conditions sequentially.
> 3. **Clean Code & Readability**: Eliminates repetitive boilerplate (`if (x === 'a') ... else if (x === 'b') ...`), dramatically reducing cyclomatic complexity.
> 4. **Single Source of Truth**: The object can easily store multiple attributes per condition (such as `name`, `icon`, `description`, and `bgClass`) in one cohesive structure.

---

### Q3: How would you provide a sensible default state?
> **Answer:**  
> Define a dedicated `defaultState` object containing placeholder values:
> ```javascript
> const defaultState = {
>   name: "No condition selected",
>   icon: "🌤️",
>   description: "Please choose a weather condition from the dropdown above.",
>   bgClass: "default-bg"
> };
> ```
> In the update function, use logical fallback (`||` or nullish coalescing `??`):
> ```javascript
> const selectedWeather = weatherData[conditionKey] || defaultState;
> ```
> Additionally:
> 1. Call `updateWeatherDisplay("")` on initial script execution to guarantee predictable initial rendering.
> 2. Provide a descriptive placeholder option (`"Select weather condition"`) as the initial dropdown state.
