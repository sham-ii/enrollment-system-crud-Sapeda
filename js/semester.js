document.addEventListener("DOMContentLoaded", loadSemesters);

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

function loadSemesters() {
  fetch("API/Semesters/getSemesters.php")
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(sem => {
        rows += `
          <tr>
            <td>${sem.sem_id}</td>
            <td>${sem.sem_name}</td>
            <td>${sem.year_id}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editSemester(${sem.sem_id}, '${sem.sem_name}', ${sem.year_id})">Update</button>
              <button class="btn btn-danger btn-sm" onclick="deleteSemester(${sem.sem_id})">Delete</button>
            </td>
          </tr>`;
      });
      document.getElementById("semesterTable").innerHTML = rows;
    });
}

document.getElementById("semesterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);
  let url = formData.get("sem_id") 
            ? "API/Semesters/updateSemester.php" 
            : "API/Semesters/addSemester.php";

  fetch(url, { method: "POST", body: formData })
    .then(res => res.text())
    .then(msg => {
      console.log("Server response:", msg);
      if (msg.includes("success")) {
        loadSemesters();
        this.reset();
        document.getElementById("sem_id").value = "";
        showAlert(formData.get("sem_id") ? "Semester updated successfully!" : "Semester added successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
});

function editSemester(sem_id, sem_name, year_id) {
  document.getElementById("sem_id").value = sem_id;
  document.getElementById("sem_name").value = sem_name;
  document.getElementById("year_id").value = year_id;
}

function deleteSemester(id) {
  if (!confirm("Delete this semester?")) return;
  let fd = new FormData();
  fd.append("sem_id", id);
  fetch("API/Semesters/deleteSemester.php", { method: "POST", body: fd })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) {
        loadSemesters();
        showAlert("Semester deleted successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
}
