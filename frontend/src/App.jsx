import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import NavbarPart from "./Component/NavbarPart";
import DashboardPage from "./Pages/DashboardPage";
import DashFeesPage from "./Pages/DashFeesPage";
import DashManagementPage from "./Pages/DashManagementPage";
import DashTeachersPage from "./Pages/DashTeachersPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ManagementPage from "./Pages/ManagementPage";
import TeachersPage from "./Pages/TeachersPage";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  // Conditionally hide the navbar on the dashboard page
  const shouldShowNavbar = !location.pathname.includes("/dashboard");
  return (
    <div>
      {shouldShowNavbar && <NavbarPart />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/managements" element={<ManagementPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard/teachers"
          element={
            isAuthenticated ? <DashTeachersPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard/managements"
          element={
            isAuthenticated ? <DashManagementPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard/fees"
          element={
            isAuthenticated ? <DashFeesPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
