document.addEventListener('DOMContentLoaded', function() {
    // Initialize student data from local storage
    loadStudents();

    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let studentName = document.getElementById('studentName').value.trim();
        let studentId = document.getElementById('studentId').value.trim();
        let email = document.getElementById('email').value.trim();
        let contactNo = document.getElementById('contactNo').value.trim();

        if (validateInputs(studentName, studentId, email, contactNo)) {
            addStudent(studentName, studentId, email, contactNo);
            clearForm();
            saveStudents();
        }
    });
});

function validateInputs(name, id, email, contact) {
    let namePattern = /^[A-Za-z\s]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let contactPattern = /^[0-9]+$/;

    if (!name || !id || !email || !contact) {
        alert("All fields are required.");
        return false;
    }
    if (!namePattern.test(name)) {
        alert("Invalid name. Only characters are allowed.");
        return false;
    }
    if (!contactPattern.test(id) || !contactPattern.test(contact)) {
        alert("Invalid ID or contact number. Only numbers are allowed.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Invalid email address.");
        return false;
    }
    return true;
}

function addStudent(name, id, email, contact) {
    let studentTableBody = document.getElementById('studentTableBody');

    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td class="actions">
            <button class="edit" onclick="editStudent(this)">Edit</button>
            <button class="delete" onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

    studentTableBody.appendChild(row);
}

function clearForm() {
    document.getElementById('studentForm').reset();
}

function editStudent(button) {
    let row = button.parentElement.parentElement;
    let cells = row.getElementsByTagName('td');

    document.getElementById('studentName').value = cells[0].innerText;
    document.getElementById('studentId').value = cells[1].innerText;
    document.getElementById('email').value = cells[2].innerText;
    document.getElementById('contactNo').value = cells[3].innerText;

    deleteStudent(button);
    saveStudents();
}

function deleteStudent(button) {
    let row = button.parentElement.parentElement;
    row.remove();
    saveStudents();
}

function saveStudents() {
    let studentTableBody = document.getElementById('studentTableBody');
    let students = [];

    for (let row of studentTableBody.rows) {
        let student = {
            name: row.cells[0].innerText,
            id: row.cells[1].innerText,
            email: row.cells[2].innerText,
            contact: row.cells[3].innerText
        };
        students.push(student);
    }

    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    for (let student of students) {
        addStudent(student.name, student.id, student.email, student.contact);
    }
}