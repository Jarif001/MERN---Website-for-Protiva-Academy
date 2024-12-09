import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const DashTeachersPage = () => {
  const { logout } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    institute: "",
    image: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedTeacher((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/teachers/${selectedTeacher._id}`,
        selectedTeacher
      );
      if (response.data.success) {
        alert("Updated successfully");
        setShowEditModal(false);
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher._id === selectedTeacher._id ? selectedTeacher : teacher
          )
        );
      } else {
        alert("Failed to update teacher");
      }
    } catch (error) {
      alert("An error occured");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/teachers",
        formData
      );
      if (response.data.success) {
        alert("Teacher added successfully!");
        setShowModal(false);
        setFormData({ name: "", subject: "", institute: "", image: "" });
        // Refetch the teachers
        const updatedTeachers = await axios.get(
          "http://localhost:5000/api/teachers"
        );
        if (updatedTeachers.data.success) {
          setTeachers(updatedTeachers.data.data);
        }
      } else {
        alert("Failed to add teacher.");
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("An error occurred.");
    }
  };

  const handleClickDelete = (teacher) => {
    setSelectedToDelete(teacher);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/teachers/${selectedToDelete._id}`
      );
      if (response.data.success) {
        alert(`${selectedToDelete.name} deleted successfully!`);
        setTeachers((prevTeachers) =>
          prevTeachers.filter((t) => t._id !== selectedToDelete._id)
        );
      } else {
        alert("Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("An error occurred.");
    } finally {
      setShowDeleteModal(false);
      setSelectedToDelete(null);
    }
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
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <h2>
            Teachers panel{" "}
            <button
              className="btn btn-primary"
              style={{ fontSize: "70%" }}
              onClick={() => setShowModal(true)}
            >
              Add
            </button>
          </h2>
          <p className="lead"></p>
          {/* teachers list */}
          <div className="row">
            {/* Another loop for showing teachers from teacher list in this row */}
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4 col-xl-3"
                style={{ marginTop: "2%" }}
              >
                <div id="product-1" className="single-product">
                  <div className="part-2">
                    <img
                      src={teacher.image || "https://via.placeholder.com/200"}
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
                    <h4
                      className="product-title"
                      style={{
                        fontSize: teacher.name.length > 15 ? "120%" : "150%",
                      }}
                    >
                      {teacher.name}
                    </h4>
                    <h5 className="">{teacher.institute}</h5>
                    <h5 className="">
                      <b>Subject:</b> {teacher.subject}
                    </h5>
                    <button
                      className="btn btn-info"
                      style={{ fontSize: "120%" }}
                      onClick={() => handleEditClick(teacher)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ fontSize: "120%", marginLeft: "3%" }}
                      onClick={() => handleClickDelete(teacher)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal for adding */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Teacher</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="institute" className="form-label">
                      Institute
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="institute"
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* modal for adding part ended */}

      {/* modal for editing started */}
      {showEditModal && selectedTeacher && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Teacher</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={selectedTeacher.name}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={selectedTeacher.subject}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="institute" className="form-label">
                      Institute
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="institute"
                      name="institute"
                      value={selectedTeacher.institute}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={selectedTeacher.image}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* modal for editing ended */}
      {/* modal for delete starts */}
      {showDeleteModal && selectedToDelete && (
        <div
          className="modal d-block justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal-dialog"
            style={{
              margin: "auto",
              marginTop: "10%",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete <b>{selectedToDelete.name}</b>
                  ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* modal for delete ends */}
    </div>
  );
};

export default DashTeachersPage;
