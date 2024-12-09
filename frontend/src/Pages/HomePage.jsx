import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [admissionFee, setAdmissionFee] = useState([]);
  const [classFees, setClassFees] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://wallpapercave.com/wp/wp3191390.jpg",
    "https://png.pngtree.com/background/20230401/original/pngtree-educational-illustration-background-picture-image_2252949.jpg",
    "https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_1280.jpg",
    "https://img.freepik.com/premium-photo/desk-with-chalkboard-stack-colorful-pencils_808092-3024.jpg",
    "https://wallpaperaccess.com/full/1426929.jpg",
  ];

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fees")
      .then((response) => {
        if (response.data.success) {
          const allFees = response.data.data;
          const admissionFee = allFees.find((fee) => fee.sortId === 0);
          const classFees = allFees.filter((fee) => fee.sortId !== 0);
          setAdmissionFee(admissionFee || null);
          setClassFees(classFees || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching fees:", error);
        setAdmissionFee(null);
        setClassFees([]);
      });
  }, []);

  // Background Image Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container">
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url('${images[currentImage]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "85vh",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "2%",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "15px",
            border: "1px dotted black",
            borderRadius: "20px",
          }}
        >
          Unlock Your Potential
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            maxWidth: "800px",
            margin: "20px 0",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
            border: "1px dotted black",
            borderRadius: "10px",
          }}
        >
          Join our institution to achieve excellence in education and shape a
          brighter future.
        </p>
        <button
          className="btn btn-primary"
          style={{
            fontSize: "1.5rem",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
          onClick={openPopup}
        >
          Details
        </button>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <div
              className="card"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            >
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>
                  Facilities
                </h4>
                <p className="card-text">
                  Experience beautiful classrooms with air conditioner designed
                  to enhance your learning experience and comfort.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            >
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>
                  Experienced Instructors
                </h4>
                <p className="card-text">
                  Learn from the best with our team of experienced and dedicated
                  instructors ready to guide you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            >
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>
                  Opportunities
                </h4>
                <p className="card-text">
                  Open doors to experts for co-curricular activities broadening
                  the horizon of knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-center">
            We are committed to nurturing talent and guiding towards success.
            Our mission is to provide an environment where students can thrive,
            excel and make a positive impact on their lives as well as on the
            society.
          </p>
          <hr
            style={{
              border: "none",
              height: "3px",
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              margin: "20px 0",
              borderRadius: "5px",
            }}
          ></hr>
          <p className="text-center">
            For any further queries, feel free to <strong>contact:</strong>{" "}
            <a
              href="tel:+8801600371160"
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              01600371160
            </a>{" "}
            <br />
            <span style={{ display: "block", marginTop: "10px" }}>
              <strong>Address:</strong>
              <span style={{ marginLeft: "5px", color: "#333" }}>
                Sector 7, Road 9/A, House 6, Uttara, Dhaka, Bangladesh
              </span>
            </span>
          </p>
        </div>
      </div>
      {/* modal starts */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "30px",
              maxWidth: "50vw",
              width: "120%",
              textAlign: "center",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              height: "500px",
              overflowY: "auto",
            }}
          >
            <h4>
              Admission Fee -{" "}
              {admissionFee ? admissionFee.fee + " taka" : "Not available"}{" "}
            </h4>
            <h3 style={{ marginBottom: "20px" }}>Monthly Fee</h3>
            {/* Table */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {classFees.map((fee, index) => (
                  <tr key={index}>
                    <td>{fee.type}</td>
                    <td>{fee.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              For any further queries, feel free to <strong>contact:</strong>{" "}
              <a
                href="tel:+8801600371160"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                01600371160
              </a>{" "}
              <br />
              <span style={{ display: "block", marginTop: "10px" }}>
                <strong>Address:</strong>
                <span style={{ marginLeft: "5px", color: "#333" }}>
                  Sector 7, Road 9/A, House 6, Uttara, Dhaka, Bangladesh
                </span>
              </span>
            </p>
            {/* Close Button */}
            <button
              className="btn btn-danger mt-4"
              style={{
                fontSize: "1rem",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
