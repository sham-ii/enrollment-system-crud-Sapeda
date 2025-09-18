document.addEventListener("DOMContentLoaded", loadSubjects);

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

// Load subjects and display in table
function loadSubjects() {
  fetch("API/Subjects/getSubjects.php")
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(sub => {
        rows += `
          <tr>
            <td>${sub.subject_id}</td>
            <td>${sub.subject_name}</td>
            <td>${sub.sem_id}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editSubject(${sub.subject_id}, '${sub.subject_name}', ${sub.sem_id})">Update</button>
              <button class="btn btn-danger btn-sm" onclick="deleteSubject(${sub.subject_id})">Delete</button>
            </td>
          </tr>`;
      });
      document.getElementById("subjectTable").innerHTML = rows;
    });
}

// Handle Add/Update
document.getElementById("subjectForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);
  let url = formData.get("subject_id") 
            ? "API/Subjects/updateSubject.php" 
            : "API/Subjects/addSubject.php";

  fetch(url, { method: "POST", body: formData })
    .then(res => res.text())
    .then(msg => {
      console.log("Server response:", msg);
      if (msg.includes("success")) {
        loadSubjects();
        this.reset();
        document.getElementById("subject_id").value = "";
        showAlert(formData.get("subject_id") ? "Subject updated successfully!" : "Subject added successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
});

// Edit Subject
function editSubject(subject_id, subject_name, sem_id) {
  document.getElementById("subject_id").value = subject_id;
  document.getElementById("subject_name").value = subject_name;
  document.getElementById("sem_id").value = sem_id;
}

// Delete Subject
function deleteSubject(id) {
  if (!confirm("Delete this subject?")) return;
  let fd = new FormData();
  fd.append("subject_id", id);
  fetch("API/Subjects/deleteSubject.php", { method: "POST", body: fd })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) {
        loadSubjects();
        showAlert("Subject deleted successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
}
