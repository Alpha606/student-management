import React from "react";
import AdminDashboard from "./AdminDashboard";
//student.jsx import AdminDashboard which has the functationality of searching as well as update
//only reason it imports AdminDashboard is that so scope can be kept scalable
const Students = () => {
  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default Students;
