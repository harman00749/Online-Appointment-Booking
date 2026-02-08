const bookingForm = document.getElementById("bookingForm");
const dashboardBody = document.querySelector("#dashboard tbody");
const roleSelect = document.getElementById("role");
const nameSelect = document.getElementById("name");

const professionals = {
  Doctor: [
    { name: "Dr. Sharma", location: "Dehradun Hospital" },
    { name: "Dr. Mehta", location: "City Clinic" },
    { name: "Dr. Kapoor", location: "Wellness Center" }
  ],
  Teacher: [
    { name: "Prof. Singh", location: "Central School" },
    { name: "Prof. Verma", location: "City College" },
    { name: "Prof. Iyer", location: "Science Academy" }
  ]
};

let appointments = [];

roleSelect.addEventListener("change", function() {
  const role = roleSelect.value;
  nameSelect.innerHTML = '<option value="">--Select--</option>';

  if (role && professionals[role]) {
    professionals[role].forEach(prof => {
      const option = document.createElement("option");
      option.value = prof.name;
      option.textContent = `${prof.name} (${prof.location})`;
      nameSelect.appendChild(option);
    });
  }
});

bookingForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const role = roleSelect.value;
  const name = nameSelect.value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const selectedProf = professionals[role].find(prof => prof.name === name);
  const location = selectedProf ? selectedProf.location : "Unknown";

  const exists = appointments.some(app => app.date === date && app.time === time && app.name === name);

  if (exists) {
    alert("This slot is already booked with " + role + " " + name + "!");
    return;
  }

  const appointment = { role, name, location, date, time };
  appointments.push(appointment);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${role}</td>
    <td>${name}</td>
    <td>${location}</td>
    <td>${date}</td>
    <td>${time}</td>
  `;
  dashboardBody.appendChild(row);

  bookingForm.reset();
  nameSelect.innerHTML = '<option value="">--Select--</option>'; 
});