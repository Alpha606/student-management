import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
  });
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    photograph: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/students")
      .then((response) => {
        const students = response.data;
        setStudents(students);
        setMetrics({
          totalStudents: students.length,
          activeStudents: students.filter((s) => s.active).length,
          inactiveStudents: students.filter((s) => !s.active).length,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const handleExpandClick = (student) => {
    if (expandedStudentId === student._id) {
      setExpandedStudentId(null); // Collapse if already expanded
    } else {
      setExpandedStudentId(student._id); // Expand and populate form
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        grade: student.grade,
        dateOfBirth: new Date(student.dateOfBirth).toISOString().split("T")[0], // Format for input[type="date"]
        gender: student.gender,
        email: student.email,
        phone: student.phone,
        address: student.address,
        photograph: null,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({ ...prevState, photograph: e.target.files[0] }));
  };

 const handleUpdate = (studentId) => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    if (key === "photograph" && !formData[key]) {
      // If photograph field is empty, include the existing photograph data
      data.append(key, students.find(student => student._id === studentId).photograph);
    } else {
      data.append(key, formData[key]);
    }
  });

  axios
    .put(`http://localhost:6969/api/students/${studentId}`, data)
    .then((response) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId ? response.data : student
        )
      );
      setExpandedStudentId(null); // Collapse the form after update
    })
    .catch((error) => console.error(error));
};

  return (
    <div className="dashboard">
      <header>
        <h1>Student Dashboard</h1>
      </header>
      <main>
        <div className="metrics">
          <div className="metric-item">Total Students: {metrics.totalStudents}</div>
          <div className="metric-item">Active Students: {metrics.activeStudents}</div>
          <div className="metric-item">Inactive Students: {metrics.inactiveStudents}</div>
        </div>
        <h2>Student List</h2>
        <div className="student-list">
          <div className="student-item student-header">
            <div>Photo</div>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Grade</div>
            <div>Date of Birth</div>
            <div>Gender</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Address</div>
          </div>
          {students.map((student) => (
            <div key={student._id} className="student-item" onClick={() => handleExpandClick(student)}>
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
              <div>{student.address}</div>
              {expandedStudentId === student._id && (
                <div className="student-edit-form">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}

                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Grade"
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onClick={(e) => e.stopPropagation()}

                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}

                    placeholder="Gender"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}

                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}

                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}

                    placeholder="Address"
                  />
                  <input type="file" name="photograph" onChange={handleFileChange} onClick={(e) => e.stopPropagation()}
 />
                  <div>
                    <button className="update-button" onClick={() => handleUpdate(student._id)}>Update Student</button>
                    <button className="cancel-button" onClick={() => setExpandedStudentId(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
