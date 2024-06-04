import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const AddStudent = () => {
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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (acceptedFiles) => {
    setFormData((prevState) => ({
      ...prevState,
      photograph: acceptedFiles[0],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.grade) newErrors.grade = "Grade is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.photograph) newErrors.photograph = "Photograph is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      axios
        .post("http://localhost:6969/api/students", data)
        .then((response) => {
          console.log(response.data);
          // Clear form data
          setFormData({
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
          setSuccessMessage("Student has been added successfully.");
          setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
        })
        .catch((error) => {
          if (error.response && error.response.status === 413) {
            setErrors({ photograph: "File size exceeds the limit (5 MB)." });
          } else {
            console.error(error);
          }
        });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
  });

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
        />
        {errors.grade && <p>{errors.grade}</p>}
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
        />
        {errors.gender && <p>{errors.gender}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p>{errors.address}</p>}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            <u>Drag 'n' drop photograph here, or click to select file</u>
          </p>
          {formData.photograph && (
            <p>Photograph: {formData.photograph.name}</p>
          )}
        </div>
        {errors.photograph && <p>{errors.photograph}</p>}
        <button type="submit">Add Student</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AddStudent;
