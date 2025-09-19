document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
  loadEnrollments(); 
});

function loadStudents() {
  fetch("API/Students/getStudents.php")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("stud_id");
      data.forEach(s => {
        select.innerHTML += `<option value="${s.stud_id}">${s.last_name}, ${s.first_name}</option>`;
      });
    });
}

function loadEnrollments() {
  fetch("API/Enrollments/getEnrollments.php")
    .then(res => res.json())
    .then(data => {
      const studentId = document.getElementById("stud_id").value;
      const filtered = studentId ? data.filter(e => e.stud_id == studentId) : data;

      let rows = "";
      filtered.forEach(e => {
        rows += `
          <tr>
            <td>${e.enroll_id}</td>
            <td>${e.stud_id}</td>
            <td>${e.last_name}</td>
            <td>${e.first_name}</td>
            <td>${e.mid_init}</td>
            <td>${e.program_name}</td>
            <td>${e.allowance}</td>
            <td>${e.subject_name}</td>
            <td>${e.sem_name}</td>
            <td>${e.year_from}-${e.year_to}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteEnrollment(${e.enroll_id})">Delete</button>
            </td>
          </tr>
        `;
      });
      document.getElementById("enrollmentTable").innerHTML = rows;
    });
}

document.getElementById("stud_id").addEventListener("change", loadEnrollments);

function deleteEnrollment(id) {
  if (!confirm("Delete this enrollment?")) return;
  let fd = new FormData();
  fd.append("enroll_id", id);
  fetch("API/Enrollments/deleteEnrollment.php", { method: "POST", body: fd })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("success")) loadEnrollments();
      else alert("Error: " + msg);
    });
}
