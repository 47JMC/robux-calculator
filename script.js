const theme = localStorage.getItem("theme");
if (theme === "light") document.body.classList.add("light-theme");

const elements = {
  input: document.getElementById("robuxInput"),
  taxRate: document.getElementById("tax-rate-input"),
  dono: document.getElementById("robux-dono"),
  tax: document.getElementById("robux-tax"),
  got: document.getElementById("robux-got"),
  decimal: document.getElementById("decimalToggle"),
  error: document.getElementById("hidden-text"),
};

function resetCalculator() {
  elements.input.value = "";
  elements.taxRate.value = "";
  elements.dono.textContent = "";
  elements.tax.textContent = "";
  elements.got.textContent = "";
}

// 🔥 Error display with restartable animation
function showError() {
  const elem = elements.error;
  elem.classList.remove("error-show");
  void elem.offsetWidth; // force reflow
  elem.classList.add("error-show");

  setTimeout(() => elem.classList.remove("error-show"), 2500);
}

// Tax calculation
function calculateTax(amount, taxPercentage, decimal) {
  const tax = amount * (taxPercentage / 100);
  return decimal ? Number(tax.toFixed(2)) : Math.floor(tax);
}

// Format numbers (handles decimals properly)
function formatNumber(number) {
  return number.toLocaleString();
}

// 🔥 Core logic (reusable)
function calculateAndRender() {
  const raw = elements.input.value;

  if (raw.trim() === "") {
    showError();
    return;
  }

  const robux_amount = Number(raw);
  const robux_tax_percentage = Number(elements.taxRate.value || 30);

  if (
    !Number.isFinite(robux_amount) ||
    robux_amount < 0 ||
    !Number.isFinite(robux_tax_percentage) ||
    robux_tax_percentage < 0
  ) {
    showError();
    return;
  }

  const decimal = elements.decimal.checked;

  const robux_taxed = calculateTax(robux_amount, robux_tax_percentage, decimal);

  const robux_received = decimal
    ? Number((robux_amount - robux_taxed).toFixed(2))
    : robux_amount - robux_taxed;

  elements.dono.textContent = formatNumber(robux_amount);
  elements.tax.textContent = formatNumber(robux_taxed);
  elements.got.textContent = formatNumber(robux_received);
}

function handleSubmit(e) {
  e.preventDefault();
  calculateAndRender();
}

elements.input.addEventListener("input", calculateAndRender);
elements.taxRate.addEventListener("input", calculateAndRender);
elements.decimal.addEventListener("change", calculateAndRender);

// 🔥 Theme toggle
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle-span");
  const isLightMode = body.classList.toggle("light-theme");

  if (isLightMode) {
    themeToggle.textContent = "dark_mode";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "light_mode";
    localStorage.setItem("theme", "dark");
  }
}
