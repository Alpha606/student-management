import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeactivateStudent.css";

const DeactivateStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [deactivatedStudents, setDeactivatedStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/students")
      .then((response) => {
        const students = response.data;
        setStudents(students);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleDeactivateSelected = () => {
    selectedStudents.forEach((studentId) => {
      axios
        .put(`http://localhost:6969/api/students/${studentId}/deactivate`)
        .then(() => {
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student._id === studentId ? { ...student, active: false } : student
            )
          );
          setDeactivatedStudents((prevDeactivated) => [...prevDeactivated, studentId]);
          setSuccessMessage("Selected students have been deactivated.");
          setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
        })
        .catch((error) => console.error(error));
    });
    setSelectedStudents([]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header>
        <h1>Deactivate Student</h1>
      </header>
      <main>
        <div className="actions">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button className="deactivate-button" onClick={handleDeactivateSelected} disabled={!selectedStudents.length}>
            Deactivate Selected
          </button>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="student-list">
          <div className="student-item student-header">
            <div>Select</div>
            <div>Photo</div>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Grade</div>
            <div>Date of Birth</div>
            <div>Gender</div>
            <div>Email</div>
            <div>Phone</div>
          </div>
          {filteredStudents.map((student) =>
            !student.active ? null : (
              <div key={student._id} className={`student-item ${student.active ? '' : 'inactive-student'}`}>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleCheckboxChange(student._id)}
                    disabled={!student.active} // Disable checkbox for inactive students
                  />
                </div>
                <div>
                  <img
                    src={`http://localhost:6969${student.photograph}`} // Ensure correct URL
                    alt={`${student.firstName} ${student.lastName}`}
                    className="student-photo"
                  />
                </div>
                <div>{student.firstName}</div>
                <div>{student.lastName}</div>
                <div>{student.grade}</div>
                <div>{new Date(student.dateOfBirth).toLocaleDateString()}</div>
                <div>{student.gender}</div>
                <div>{student.email}</div>
                <div>{student.phone}</div>
              </div>
            )
          )}
        </div>
        <h2>Deactivated Students</h2>
        <div className="deactivated-students">
          {deactivatedStudents.length > 0 ? (
            deactivatedStudents.map((id) => {
              const deactivatedStudent = students.find((student) => student._id === id);
              if (!deactivatedStudent) return null; // If student not found, skip
              return (
                <div key={id}>
                  Deactivated {deactivatedStudent.firstName} {deactivatedStudent.lastName} from Grade {deactivatedStudent.grade}
                </div>
              );
            })
          ) : (
            <div>No students have been deactivated yet.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DeactivateStudent;
