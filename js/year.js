document.addEventListener("DOMContentLoaded", loadYears);

// Alert function
function showAlert(message, type = 'success') {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  setTimeout(() => { alertContainer.innerHTML = ''; }, 3000);
}

// Load Years
function loadYears() {
  fetch("API/Years/getYears.php")
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(y => {
        rows += `
          <tr>
            <td>${y.year_id}</td>
            <td>${y.year_from}</td>
            <td>${y.year_to}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editYear(${y.year_id}, ${y.year_from}, ${y.year_to})">Update</button>
              <button class="btn btn-danger btn-sm" onclick="deleteYear(${y.year_id})">Delete</button>
            </td>
          </tr>`;
      });
      document.getElementById("yearTable").innerHTML = rows;
    });
}

// Add/Update Year
document.getElementById("yearForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);
  let url = formData.get("year_id") 
            ? "API/Years/updateYear.php" 
            : "API/Years/addYear.php";

  fetch(url, { method: "POST", body: formData })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) {
        loadYears();
        this.reset();
        document.getElementById("year_id").value = "";
        showAlert(formData.get("year_id") ? "Year updated successfully!" : "Year added successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
});

// Edit Year
function editYear(id, from, to) {
  document.getElementById("year_id").value = id;
  document.getElementById("year_from").value = from;
  document.getElementById("year_to").value = to;
}

// Delete Year
function deleteYear(id) {
  if (!confirm("Delete this year?")) return;
  let fd = new FormData();
  fd.append("year_id", id);
  fetch("API/Years/deleteYear.php", { method: "POST", body: fd })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) {
        loadYears();
        showAlert("Year deleted successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
}
