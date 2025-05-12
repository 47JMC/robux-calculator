const theme = localStorage.getItem("theme");
if (theme === "light") document.body.classList.add("light-theme");
else if (theme === "dark") document.body.classList.remove("light-theme");

function handleSubmit(e) {
  e.preventDefault();

  // Get value from param
  const searchParams = new URLSearchParams(window.location.search);
  const robux_tax_percentage =
    searchParams.get("percent") || searchParams.get("p") || 30;

  const robux_dono_elem = document.getElementById("robux-dono");
  const robux_tax_elem = document.getElementById("robux-tax");
  const robux_got_elem = document.getElementById("robux-got");

  const robux_amount = document.getElementById("robuxInput").value;
  const robux_taxed = parseInt(robux_amount * (robux_tax_percentage / 100));
  const robux_recieved = robux_amount - robux_taxed; // donated robux will always be higher than the robux taxed amount

  robux_dono_elem.textContent = formatNumberWithCommas(robux_amount);
  robux_tax_elem.textContent = formatNumberWithCommas(robux_taxed);
  robux_got_elem.textContent = formatNumberWithCommas(robux_recieved);
}

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
