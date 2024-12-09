import axios from "axios";
import React, { useEffect, useState } from "react";

const ManagementPage = () => {
  const [managements, setManagements] = useState([]);
  useEffect(() => {
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

  return (
    <div className="container mt-4">
      <div className="row justify-content-center text-center">
        <div className="col-md-8 col-lg-6">
          <div className="header">
            <h3 style={{ fontSize: "90%", color: "red" }}>
              Protiva Academic & Admission Care
            </h3>
            <h2>Board of Management</h2>
          </div>
        </div>
      </div>
      <ul className="list-unstyled">
        {managements.map((management, index) => (
          <li
            key={index}
            style={{
              position: "relative",
              padding: "20px",
              border: "2px solid #007bff",
              borderRadius: "10px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "1.2em",
                fontWeight: "bold",
                color: "#007bff",
              }}
            >
              {management.rank}
            </div>
            <img
              src={management.image}
              alt="name"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "40%",
                objectFit: "cover",
                marginRight: "15px",
                border: "2px solid #ddd",
              }}
            />
            <div>
              <h5
                style={{ margin: "0", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                {management.name}
              </h5>
              <p style={{ margin: "0", color: "#555", fontSize: "0.95rem" }}>
                {management.institute}
              </p>
              <p
                style={{
                  margin: "0",
                  color: "#555",
                  opacity: "0.7",
                  fontSize: "0.85rem",
                }}
              >
                Protiva&copy;
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagementPage;
