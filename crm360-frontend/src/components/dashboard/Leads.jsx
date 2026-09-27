import React from "react";
import "./Leads.css";
const Leads = ({
  showLeadForm,
  setShowLeadForm,
  clearLeadForm,

  leadEditIndex,

  leadName,
  setLeadName,

  leadEmail,
  setLeadEmail,

  leadPhone,
  setLeadPhone,

  leadCompany,
  setLeadCompany,

  leadSource,
  setLeadSource,

  leadStatus,
  setLeadStatus,

  leadAssignedTo,
  setLeadAssignedTo,

  leadFollowUpDate,
  setLeadFollowUpDate,

  leadNotes,
  setLeadNotes,

  leadUsers,

  handleLeadSubmit,

  leadSearch,
  setLeadSearch,

  leadFilterStatus,
  setLeadFilterStatus,

  leadFilterSource,
  setLeadFilterSource,

  filteredLeads,
  leads,

  handleLeadAssignmentChange,
  handleLeadStatusChange,
  handleLeadView,
  handleLeadEdit,
  handleLeadDelete,
  handleConvertLeadToCustomer,

  selectedLead,
  setSelectedLead,
}) => {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>Leads</h1>
          <p>
            Manage sales leads, assignments and follow-ups
          </p>
        </div>
      </div>

      <div className="customer-add-action">
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setShowLeadForm(true);
            clearLeadForm();
          }}
        >
          + Add Lead
        </button>
      </div>

      {showLeadForm && (
        <div className="content-card">

          <div className="card-header">
            <h2>
              {leadEditIndex !== null
                ? "Update Lead"
                : "Create Lead"}
            </h2>
          </div>

          <form
            onSubmit={handleLeadSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>Lead Name</label>
              <input
                type="text"
                placeholder="Enter lead name"
                value={leadName}
                onChange={(e) =>
                  setLeadName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={leadEmail}
                onChange={(e) =>
                  setLeadEmail(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={leadPhone}
                onChange={(e) =>
                  setLeadPhone(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                placeholder="Enter company"
                value={leadCompany}
                onChange={(e) =>
                  setLeadCompany(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Lead Source</label>
              <select
                value={leadSource}
                onChange={(e) =>
                  setLeadSource(e.target.value)
                }
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">
                  Social Media
                </option>
                <option value="Advertisement">
                  Advertisement
                </option>
                <option value="Cold Call">
                  Cold Call
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Lead Status</label>
              <select
                value={leadStatus || ""}
                onChange={(e) =>
                  setLeadStatus(e.target.value)
                }
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">
                  Proposal Sent
                </option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="Converted">Converted</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assign To</label>

              <select
                value={leadAssignedTo || ""}
                onChange={(e) =>
                  setLeadAssignedTo(e.target.value)
                }
              >
                <option value="">
                  Select User
                </option>

                {leadUsers
                  .filter((user) => user.isActive !== false)
                  .map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.name} - {user.role}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Follow-up Date</label>

              <input
                type="date"
                value={leadFollowUpDate}
                onChange={(e) =>
                  setLeadFollowUpDate(e.target.value)
                }
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>

              <textarea
                placeholder="Add lead notes or follow-up details"
                value={leadNotes}
                onChange={(e) =>
                  setLeadNotes(e.target.value)
                }
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {leadEditIndex !== null
                  ? "Update Lead"
                  : "Create Lead"}
              </button>

              {leadEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearLeadForm}
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

          <h2>Lead List</h2>

          <div className="table-controls">

            <input
              type="text"
              placeholder="Search leads..."
              value={leadSearch}
              onChange={(e) =>
                setLeadSearch(e.target.value)
              }
            />

            <select
              value={leadFilterStatus}
              onChange={(e) =>
                setLeadFilterStatus(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">
                Proposal Sent
              </option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Converted">Converted</option>
            </select>

            <select
              value={leadFilterSource}
              onChange={(e) =>
                setLeadFilterSource(e.target.value)
              }
            >
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">
                Social Media
              </option>
              <option value="Advertisement">
                Advertisement
              </option>
              <option value="Cold Call">
                Cold Call
              </option>
              <option value="Other">Other</option>
            </select>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Source</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-state"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {

                  const originalIndex =
                    leads.findIndex(
                      (item) =>
                        item.name === lead.name &&
                        item.email === lead.email &&
                        item.phone === lead.phone
                    );

                  return (
                    <tr key={originalIndex}>

                      <td>
                        <strong>
                          {lead.name}
                        </strong>
                      </td>

                      <td>
                        {lead.company}
                      </td>

                      <td>
                        {lead.source}
                      </td>

                      <td>
                        <select
                          value={
                            lead.assignedTo?._id ||
                            lead.assignedTo ||
                            ""
                          }
                          onChange={(e) =>
                            handleLeadAssignmentChange(
                              originalIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="">
                            Select User
                          </option>

                          {leadUsers
                            .filter(
                              (user) =>
                                user.isActive !== false
                            )
                            .map((user) => (
                              <option
                                key={user._id}
                                value={user._id}
                              >
                                {user.name} - {user.role}
                              </option>
                            ))}
                        </select>
                      </td>

                      <td>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleLeadStatusChange(
                              originalIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="New">New</option>
                          <option value="Contacted">
                            Contacted
                          </option>
                          <option value="Qualified">
                            Qualified
                          </option>
                          <option value="Proposal Sent">
                            Proposal Sent
                          </option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                          <option value="Converted">
                            Converted
                          </option>
                        </select>
                      </td>

                      <td>
                        {lead.followUpDate || "Not set"}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            type="button"
                            className="view-btn"
                            onClick={() =>
                              handleLeadView(lead)
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleLeadEdit(originalIndex)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleLeadDelete(originalIndex)
                            }
                          >
                            Delete
                          </button>

                          {lead.status !== "Converted" && (
                            <button
                              type="button"
                              className="primary-btn small-btn"
                              onClick={() =>
                                handleConvertLeadToCustomer(
                                  originalIndex
                                )
                              }
                            >
                              Convert
                            </button>
                          )}

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

      {selectedLead && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>Lead Details</h2>

              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setSelectedLead(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-body">

              <p>
                <strong>Name:</strong>{" "}
                {selectedLead.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedLead.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedLead.phone}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {selectedLead.company}
              </p>

              <p>
                <strong>Source:</strong>{" "}
                {selectedLead.source}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedLead.status}
              </p>

              <p>
                <strong>Assigned To:</strong>{" "}
                {selectedLead.assignedTo}
              </p>

              <p>
                <strong>Follow-up Date:</strong>{" "}
                {selectedLead.followUpDate || "Not set"}
              </p>

              <p>
                <strong>Notes:</strong>{" "}
                {selectedLead.notes || "No notes added"}
              </p>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setSelectedLead(null)
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

export default Leads;