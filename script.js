function handleSubmit(e) {
  e.preventDefault();

  const robux_amount = document.getElementById("robuxInput").value;
  const robux_tax_percentage = 30;
  const robux_taxed = parseInt(robux_amount * (robux_tax_percentage / 100));
  const robux_recieved = robux_amount - robux_taxed; // donated robux will always be higher than the robux taxed amount

  const robux_dono_elem = document.getElementById("robux-dono");
  const robux_tax_elem = document.getElementById("robux-tax");
  const robux_got_elem = document.getElementById("robux-got");

  robux_dono_elem.textContent = robux_amount;
  robux_tax_elem.textContent = robux_taxed;
  robux_got_elem.textContent = robux_recieved;
  
  robux_dono_elem.classList.add("opac-animation")
  robux_tax_elem.classList.add("opac-animation")
  robux_got_elem.classList.add("opac-animation")
}
