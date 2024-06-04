import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import DeactivateStudent from "./pages/DeactivateStudent";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/deactivate-student" element={<DeactivateStudent />} /> {/* Fixed element usage */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
