import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const DashFeesPage = () => {
  const { logout } = useAuth();
  const [fees, setFees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectToEdit, setSelectToEdit] = useState(null);
  const [selectToDelete, setSelectToDelete] = useState(null);
  const [formData, setFormData] = useState({
    sortId: 0,
    type: "",
    fee: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fees")
      .then((response) => {
        if (response.data.success) {
          setFees(response.data.data); // response.data is the whole object
        }
      })
      .catch((error) => {
        console.error("Error fetching fees:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (fees) => {
    setSelectToEdit(fees);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectToEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/fees/${selectToEdit._id}`,
        selectToEdit
      );
      if (response.data.success) {
        alert("Updated successfully");
        setShowEditModal(false);
        setFees((prevFees) =>
          prevFees.map((fees) =>
            fees._id === selectToEdit._id ? selectToEdit : fees
          )
        );
      } else {
        alert("Failed to update fees");
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
        "http://localhost:5000/api/fees",
        formData
      );
      if (response.data.success) {
        alert("Fees added successfully!");
        setShowAddModal(false);
        setFormData({ sortId: 0, type: "", fee: 0 });
        // Refetch the fees
        const updatedFees = await axios.get("http://localhost:5000/api/fees");
        if (updatedFees.data.success) {
          setFees(updatedFees.data.data);
        }
      } else {
        alert("Failed to add fees!");
      }
    } catch (error) {
      console.error("Error adding fees:", error);
      alert("An error occurred.");
    }
  };

  const handleClickDelete = (fees) => {
    setSelectToDelete(fees);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/fees/${selectToDelete._id}`
      );
      if (response.data.success) {
        alert(`${selectToDelete.type} deleted successfully!`);
        setFees((prevFees) =>
          prevFees.filter((t) => t._id !== selectToDelete._id)
        );
      } else {
        alert("Failed to delete fees!");
      }
    } catch (error) {
      console.error("Error deleting fees:", error);
      alert("An error occurred.");
    } finally {
      setShowDeleteModal(false);
      setSelectToDelete(null);
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
            Admission and Monthly fees{" "}
            <button
              className="btn btn-primary"
              style={{ fontSize: "70%" }}
              onClick={() => setShowAddModal(true)}
            >
              Add
            </button>
          </h2>
          <p className="lead"></p>
          {/* fees list */}
          <div className="row">
            {/* Another loop for showing 3 fees from fees list in this row */}
            {fees.map((fee, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4 col-xl-3"
                style={{
                  marginTop: "2%",
                  marginRight: "1%",
                  border: "3px solid #1abc9c",
                  borderRadius: "15px",
                  boxShadow: "0 0 12px rgba(26, 188, 156, 0.5)",
                  padding: "10px",
                }}
              >
                <div id="product-1" className="single-product">
                  <div className="part-2">
                    <h4
                      className="product-title"
                      style={{
                        fontSize: fee.type.length > 15 ? "120%" : "150%",
                      }}
                    >
                      {fee.type}
                    </h4>
                    <h5 className="">
                      <b>Amount: </b> {fee.fee}
                    </h5>
                    <button
                      className="btn btn-info"
                      style={{ fontSize: "120%" }}
                      onClick={() => handleEditClick(fee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ fontSize: "120%", marginLeft: "3%" }}
                      onClick={() => handleClickDelete(fee)}
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
      {showAddModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Fees</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="id" className="form-label">
                      Id
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="sortId"
                      name="sortId"
                      value={formData.sortId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fee" className="form-label">
                      Fee
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="fee"
                      name="fee"
                      value={formData.fee}
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
      {showEditModal && selectToEdit && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Fees</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="id" className="form-label">
                      Id
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="id"
                      name="id"
                      value={selectToEdit.sortId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={selectToEdit.type}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fee" className="form-label">
                      Fee
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="fee"
                      name="fee"
                      value={selectToEdit.fee}
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
      {showDeleteModal && selectToEdit && (
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
                  Are you sure you want to delete <b>{selectToDelete.type}</b>?
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

export default DashFeesPage;
