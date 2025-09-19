document.addEventListener("DOMContentLoaded", loadStudents);

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

function loadStudents() {
  fetch("API/Students/getStudents.php")
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(s => {
        rows += `
          <tr>
            <td>${s.stud_id}</td>
            <td>${s.last_name}</td>
            <td>${s.first_name}</td>
            <td>${s.mid_init}</td>
            <td>${s.program_id}</td>
            <td>${s.allowance}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editStudent(${s.stud_id}, '${s.last_name}', '${s.first_name}', '${s.mid_init}', '${s.program_id}', '${s.allowance}')">Update</button>
              <button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.stud_id})">Delete</button>
            </td>
          </tr>`;
      });
      document.getElementById("studentTable").innerHTML = rows;
    });
}

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);
  let url = formData.get("stud_id") 
            ? "API/Students/updateStudent.php" 
            : "API/Students/addStudent.php";
  
  fetch(url, { method: "POST", body: formData })
    .then(res => res.text())
    .then(msg => {
      console.log("Server response:", msg); 
      if (msg.includes("success")) {
        loadStudents();
        this.reset();
        document.getElementById("stud_id").value = "";
        showAlert(formData.get("stud_id") ? "Student updated successfully!" : "Student added successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
});

function editStudent(id, lname, fname, mname, prog, allow) {
  document.getElementById("stud_id").value = id;
  document.getElementById("last_name").value = lname;
  document.getElementById("first_name").value = fname;
  document.getElementById("mid_init").value = mname;
  document.getElementById("program_id").value = prog;
  document.getElementById("allowance").value = allow;
}

function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;
  let fd = new FormData();
  fd.append("stud_id", id);
  fetch("API/Students/deleteStudent.php", { method: "POST", body: fd })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) {
        loadStudents();
        showAlert("Student deleted successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
}


