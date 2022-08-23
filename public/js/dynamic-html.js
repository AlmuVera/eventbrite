document
  .getElementById("id-ticket-cost")
  .addEventListener("click", function (e) {
    console.log(e.target.value);
    if (e.target.value === '1') {
      document.getElementById("new-gratis").classList.add("hidden");
    } else if (e.target.value === '2') {
      document.getElementById("new-gratis").classList.remove("hidden");
    }
  });


  document
  .getElementById("id-location-selection")
  .addEventListener("click", function (e) {
    console.log(e.target.value);
    if (e.target.value === '1') {
      document.getElementById("new-address").classList.add("hidden");
    } else if (e.target.value === '2') {
      document.getElementById("new-address").classList.remove("hidden");
    }
  });