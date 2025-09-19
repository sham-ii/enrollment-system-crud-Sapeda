document.addEventListener("DOMContentLoaded", loadPrograms);

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

function loadPrograms() {
  fetch("API/Programs/getPrograms.php")
    .then(res => res.json())
    .then(data => {
      let rows = "";
      data.forEach(p => {
        rows += `
          <tr>
            <td>${p.program_id}</td>
            <td>${p.program_name}</td>
            <td>${p.ins_id}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editProgram(${p.program_id}, '${p.program_name}')">Update</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProgram(${p.program_id})">Delete</button>
            </td>
          </tr>`;
      });
      document.getElementById("programTable").innerHTML = rows;
    });
}

document.getElementById("programForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);
  let url = formData.get("program_id") 
            ? "API/Programs/updateProgram.php" 
            : "API/Programs/addProgram.php";
  
  fetch(url, { method: "POST", body: formData })
    .then(res => res.text())
    .then(msg => {
      console.log("Server response:", msg);
      if (msg.includes("success")) {
        loadPrograms();
        this.reset();
        document.getElementById("program_id").value = "";
        showAlert(formData.get("program_id") ? "Program updated successfully!" : "Program added successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
});

function editProgram(id, name) {
  document.getElementById("program_id").value = id;
  document.getElementById("program_name").value = name;
}

function deleteProgram(id) {
  if (!confirm("Delete this program?")) return;
  let fd = new FormData();
  fd.append("program_id", id);
  fetch("API/Programs/deleteProgram.php", { method: "POST", body: fd })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) {
        loadPrograms();
        showAlert("Program deleted successfully!", "success");
      } else {
        showAlert("Error: " + msg, "danger");
      }
    });
}
