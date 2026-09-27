import React from "react";
import "./Customer.css";

const Customers = ({
  language,
  showCustomerForm,
  setShowCustomerForm,
  clearCustomerForm,

  customerEditIndex,

  customerName,
  setCustomerName,

  customerEmail,
  setCustomerEmail,

  customerPhone,
  setCustomerPhone,

  customerCompany,
  setCustomerCompany,

  customerStatus,
  setCustomerStatus,

  handleCustomerSubmit,
  customerSearch,
  setCustomerSearch,

  customerFilterStatus,
  setCustomerFilterStatus,

  filteredCustomers,
  customers,

  handleCustomerView,
  handleCustomerEdit,
  handleCustomerDelete,

  selectedCustomer,
  setSelectedCustomer,
}) => {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>
            {language === "Tamil"
              ? "வாடிக்கையாளர்கள்"
              : "Customers"}
          </h1>

          <p>
            {language === "Tamil"
              ? "உங்கள் வாடிக்கையாளர் தகவல்களை நிர்வகிக்கவும்"
              : "Manage your customer information"}
          </p>
        </div>
      </div>

      <div className="customer-add-action">
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setShowCustomerForm(true);
            clearCustomerForm();
          }}
        >
          + Add Customer
        </button>
      </div>

      {showCustomerForm && (
        <div className="content-card">

          <div className="card-header">
            <h2>
              {customerEditIndex !== null
                ? language === "Tamil"
                  ? "வாடிக்கையாளரைப் புதுப்பிக்கவும்"
                  : "Update Customer"
                : language === "Tamil"
                ? "வாடிக்கையாளரைச் சேர்க்கவும்"
                : "Add Customer"}
            </h2>
          </div>

          <form
            onSubmit={handleCustomerSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>
                {language === "Tamil"
                  ? "வாடிக்கையாளர் பெயர்"
                  : "Customer Name"}
              </label>

              <input
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                {language === "Tamil"
                  ? "மின்னஞ்சல்"
                  : "Email"}
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={customerEmail}
                onChange={(e) =>
                  setCustomerEmail(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                {language === "Tamil"
                  ? "தொலைபேசி"
                  : "Phone"}
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                {language === "Tamil"
                  ? "நிறுவனம்"
                  : "Company"}
              </label>

              <input
                type="text"
                placeholder="Enter company name"
                value={customerCompany}
                onChange={(e) =>
                  setCustomerCompany(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                {language === "Tamil"
                  ? "நிலை"
                  : "Status"}
              </label>

              <select
                value={customerStatus}
                onChange={(e) =>
                  setCustomerStatus(e.target.value)
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {customerEditIndex !== null
                  ? "Update Customer"
                  : "Add Customer"}
              </button>

              {customerEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    clearCustomerForm();
                    setShowCustomerForm(false);
                  }}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      )}

      <div className="content-card">

        <div className="card-header">

          <h2>
            {language === "Tamil"
              ? "வாடிக்கையாளர் பட்டியல்"
              : "Customer List"}
          </h2>

          <div className="table-controls">

            <input
              type="text"
              placeholder={
                language === "Tamil"
                  ? "வாடிக்கையாளர்களைத் தேடவும்..."
                  : "Search customers..."
              }
              value={customerSearch}
              onChange={(e) =>
                setCustomerSearch(e.target.value)
              }
            />

            <select
              value={customerFilterStatus}
              onChange={(e) =>
                setCustomerFilterStatus(e.target.value)
              }
            >
              <option value="All">
                {language === "Tamil"
                  ? "அனைத்து நிலைகள்"
                  : "All Status"}
              </option>

              <option value="Active">
                {language === "Tamil"
                  ? "செயலில்"
                  : "Active"}
              </option>

              <option value="Inactive">
                {language === "Tamil"
                  ? "செயலற்றது"
                  : "Inactive"}
              </option>
            </select>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>

                <th>
                  {language === "Tamil"
                    ? "பெயர்"
                    : "Name"}
                </th>

                <th>
                  {language === "Tamil"
                    ? "மின்னஞ்சல்"
                    : "Email"}
                </th>

                <th>
                  {language === "Tamil"
                    ? "தொலைபேசி"
                    : "Phone"}
                </th>

                <th>
                  {language === "Tamil"
                    ? "நிறுவனம்"
                    : "Company"}
                </th>

                <th>
                  {language === "Tamil"
                    ? "நிலை"
                    : "Status"}
                </th>

                <th>
                  {language === "Tamil"
                    ? "செயல்கள்"
                    : "Actions"}
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="empty-state"
                  >
                    {language === "Tamil"
                      ? "வாடிக்கையாளர்கள் எவரும் கிடைக்கவில்லை"
                      : "No customers found"}
                  </td>
                </tr>

              ) : (

                filteredCustomers.map((customer) => {

                  const originalIndex =
                    customers.findIndex(
                      (item) =>
                        item._id === customer._id
                    );

                  return (
                    <tr key={originalIndex}>

                      <td>
                        <strong>
                          {customer.name}
                        </strong>
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>
                        {customer.phone}
                      </td>

                      <td>
                        {customer.company}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            customer.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            type="button"
                            className="view-btn"
                            onClick={() =>
                              handleCustomerView(customer)
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleCustomerEdit(
                                originalIndex
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleCustomerDelete(
                                originalIndex
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

      {selectedCustomer && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>
                Customer Details
              </h2>

              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-body">

              <p>
                <strong>Name:</strong>{" "}
                {selectedCustomer.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedCustomer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedCustomer.phone}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {selectedCustomer.company}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedCustomer.status}
              </p>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Customers;