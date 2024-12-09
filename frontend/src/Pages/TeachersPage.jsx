import axios from "axios";
import React, { useEffect, useState } from "react";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teachers")
      .then((response) => {
        if (response.data.success) {
          setTeachers(response.data.data); // response.data is the whole object
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  return (
    <div className="container">
      <section className="section-products">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8 col-lg-6">
              <div className="header">
                <h3>Protiva Academic & Admission Care</h3>
                <h2>Our teachers panel</h2>
              </div>
            </div>
          </div>
          {/* have to generate rows for teacher list */}
          <div className="row">
            {/* Another loop for showing 3 teachers from teacher list in this row */}
            {teachers.map((teacher, index) => (
              <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                <div
                  id="product-1"
                  className="single-product"
                  style={{
                    border: "2px solid #C0C0C0", // Blue border
                    borderRadius: "10px", // Rounded corners
                    overflow: "hidden", // Ensures image stays within border
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover animation
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div className="part-2">
                    <img
                      src={teacher.image}
                      className="img-thumbnail img-fluid"
                      width="200"
                      alt={teacher.name}
                      style={{
                        width: "200px", // Fixed width
                        height: "200px", // Fixed height
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <h3 className="product-title">{teacher.name}</h3>
                    <h4 className="">
                      <b>Subject:</b> {teacher.subject}
                    </h4>
                    <br />
                    <h4 className="">{teacher.institute}</h4>
                    <br />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* have to generate upto this part */}
        </div>
      </section>
    </div>
  );
};

export default TeachersPage;
