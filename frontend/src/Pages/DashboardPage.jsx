import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
ChartJS.register(ChartDataLabels);

// Register required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { logout } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [managements, setManagements] = useState([]);
  const [institutionsData, setInstitutionsData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teachers")
      .then((response) => {
        if (response.data.success) {
          setTeachers(response.data.data); // response.data is the whole object
          prepareChartData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
    axios
      .get("http://localhost:5000/api/managements")
      .then((response) => {
        if (response.data.success) {
          setManagements(response.data.data); // response.data is the whole object
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  // Prepare chart data based on teacher institution counts
  const prepareChartData = (teachersList) => {
    const institutionCounts = {};
    teachersList.forEach((teacher) => {
      const institution = teacher.institute || "Not Specified";
      institutionCounts[institution] =
        (institutionCounts[institution] || 0) + 1;
    });

    setInstitutionsData({
      labels: Object.keys(institutionCounts),
      data: Object.values(institutionCounts),
    });
  };

  // Chart.js configuration for bar chart
  const chartData = {
    labels: institutionsData.labels,
    datasets: [
      {
        label: "Number of Teachers",
        data: institutionsData.data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        anchor: "center", // Positions label at the end of each bar
        align: "center", // Aligns text inside the bar
        color: "white", // Text color
        font: {
          size: 30, // Increase this value for a larger font
          weight: "bold", // Optionally make the text bold
        },
        formatter: (value) => value, // Display the actual count value
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar py-4">
          <div className="position-sticky">
            <h4 className="text-center mb-4">
              <b>Dashboard</b>
            </h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/dashboard">
                  <i className="bi bi-house-door-fill me-2"></i>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white"
                  to="/dashboard/teachers"
                >
                  <i className="bi bi-person-fill me-2"></i>Teachers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white"
                  to="/dashboard/managements"
                >
                  <i className="bi bi-person-gear me-2"></i>Managements
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/dashboard/fees">
                  <i className="bi bi-currency-dollar me-2"></i>Fees
                </NavLink>
              </li>
            </ul>
            <button onClick={logout} className="btn btn-danger w-100 mt-4">
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <h2>Protiva Admin</h2>
          <p className="lead"></p>
          <div className="row">
            {/* Analytics Section */}
            <div className="col">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Teachers</h5>
                  <p className="card-text">Total Teachers: {teachers.length}</p>
                  <NavLink
                    className="nav-item btn btn-primary"
                    to="/dashboard/teachers"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Teachers by Institution</h5>
                  <div style={{ margin: "0 auto", height: "80%" }}>
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Managements</h5>
                  <p className="card-text">
                    Total Staffs: {managements.length}
                  </p>
                  <NavLink
                    className="nav-item btn btn-primary"
                    to="/dashboard/managements"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Admission & Class Fees</h5>
                  <NavLink
                    className="nav-item btn btn-primary"
                    to="/dashboard/fees"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
