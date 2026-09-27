import "./Deals.css";
function Deals({
  setShowDealForm,
  clearDealForm,

  deals,
  wonDeals,
  lostDeals,

  showDealForm,

  dealEditIndex,

  dealTitle,
  setDealTitle,

  customers,

  dealCustomer,
  setDealCustomer,

  dealValue,
  setDealValue,

  dealStage,
  setDealStage,

  dealProbability,
  setDealProbability,

  dealClosingDate,
  setDealClosingDate,

  handleDealSubmit,

  dealSearch,
  setDealSearch,

  dealFilterStage,
  setDealFilterStage,

  filteredDeals,

  handleDealStageChange,
  handleDealView,
  handleDealEdit,
  handleDealDelete,

  selectedDeal,
  setSelectedDeal,
}) {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>Deals</h1>

          <p>
            Manage sales pipeline and track deal progress
          </p>
        </div>
      </div>

      <div className="customer-add-action">
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setShowDealForm(true);
            clearDealForm();
          }}
        >
          + Add Deal
        </button>
      </div>

      {/* SALES PIPELINE SUMMARY */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">🆕</div>

          <div>
            <h3>
              {
                deals.filter(
                  (deal) => deal.stage === "New"
                ).length
              }
            </h3>

            <p>New</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📞</div>

          <div>
            <h3>
              {
                deals.filter(
                  (deal) =>
                    deal.stage === "Contacted"
                ).length
              }
            </h3>

            <p>Contacted</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>

          <div>
            <h3>
              {
                deals.filter(
                  (deal) =>
                    deal.stage === "Qualified"
                ).length
              }
            </h3>

            <p>Qualified</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>

          <div>
            <h3>
              {
                deals.filter(
                  (deal) =>
                    deal.stage === "Proposal Sent"
                ).length
              }
            </h3>

            <p>Proposal Sent</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>

          <div>
            <h3>{wonDeals}</h3>
            <p>Won</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>

          <div>
            <h3>{lostDeals}</h3>
            <p>Lost</p>
          </div>
        </div>

      </div>

      {/* ADD / UPDATE DEAL */}

      {showDealForm && (
        <div className="content-card">

          <div className="card-header">
            <h2>
              {dealEditIndex !== null
                ? "Update Deal"
                : "Create Deal"}
            </h2>
          </div>

          <form
            onSubmit={handleDealSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>Deal Title</label>

              <input
                type="text"
                placeholder="Enter deal title"
                value={dealTitle}
                onChange={(e) =>
                  setDealTitle(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Customer</label>

              <select
                value={dealCustomer}
                onChange={(e) =>
                  setDealCustomer(e.target.value)
                }
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map(
                  (customer, index) => (
                    <option
                      key={index}
                      value={customer.name}
                    >
                      {customer.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label>Deal Value</label>

              <input
                type="number"
                placeholder="Enter deal value"
                value={dealValue}
                onChange={(e) =>
                  setDealValue(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Sales Stage</label>

              <select
                value={dealStage}
                onChange={(e) => {
                  const selectedStage =
                    e.target.value;

                  setDealStage(selectedStage);

                  if (selectedStage === "New") {
                    setDealProbability(20);
                  } else if (
                    selectedStage === "Contacted"
                  ) {
                    setDealProbability(30);
                  } else if (
                    selectedStage === "Qualified"
                  ) {
                    setDealProbability(50);
                  } else if (
                    selectedStage === "Proposal Sent"
                  ) {
                    setDealProbability(70);
                  } else if (
                    selectedStage === "Won"
                  ) {
                    setDealProbability(100);
                  } else if (
                    selectedStage === "Lost"
                  ) {
                    setDealProbability(0);
                  }
                }}
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
              </select>
            </div>

            <div className="form-group">
              <label>Probability (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                value={dealProbability}
                onChange={(e) =>
                  setDealProbability(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Closing Date</label>

              <input
                type="date"
                value={dealClosingDate}
                onChange={(e) =>
                  setDealClosingDate(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {dealEditIndex !== null
                  ? "Update Deal"
                  : "Create Deal"}
              </button>

              {dealEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearDealForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>
      )}

      {/* DEAL LIST */}

      <div className="content-card">

        <div className="card-header">

          <h2>Sales Pipeline</h2>

          <div className="table-controls">

            <input
              type="text"
              placeholder="Search deals..."
              value={dealSearch}
              onChange={(e) =>
                setDealSearch(e.target.value)
              }
            />

            <select
              value={dealFilterStage}
              onChange={(e) =>
                setDealFilterStage(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Stages
              </option>

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
            </select>

          </div>
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Deal</th>
                <th>Customer</th>
                <th>Value</th>
                <th>Stage</th>
                <th>Probability</th>
                <th>Closing Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredDeals.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-state"
                  >
                    No deals found
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => {

                  const originalIndex =
                    deals.findIndex(
                      (item) => item === deal
                    );

                  return (
                    <tr key={originalIndex}>

                      <td>
                        <strong>
                          {deal.title}
                        </strong>
                      </td>

                      <td>
                        {deal.customer}
                      </td>

                      <td>
                        ₹
                        {Number(
                          deal.value
                        ).toLocaleString()}
                      </td>

                      <td>

                        <select
                          value={deal.stage}
                          onChange={(e) =>
                            handleDealStageChange(
                              originalIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="New">
                            New
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="Qualified">
                            Qualified
                          </option>

                          <option value="Proposal Sent">
                            Proposal Sent
                          </option>

                          <option value="Won">
                            Won
                          </option>

                          <option value="Lost">
                            Lost
                          </option>
                        </select>

                      </td>

                      <td>
                        {deal.probability}%
                      </td>

                      <td>
                        {deal.closingDate}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            type="button"
                            className="view-btn"
                            onClick={() =>
                              handleDealView(
                                deal
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleDealEdit(
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
                              handleDealDelete(
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

      {/* DEAL VIEW MODAL */}

      {selectedDeal && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>Deal Details</h2>

              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setSelectedDeal(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-body">

              <p>
                <strong>Deal:</strong>{" "}
                {selectedDeal.title}
              </p>

              <p>
                <strong>Customer:</strong>{" "}
                {selectedDeal.customer}
              </p>

              <p>
                <strong>Value:</strong>{" "}
                ₹
                {Number(
                  selectedDeal.value
                ).toLocaleString()}
              </p>

              <p>
                <strong>Stage:</strong>{" "}
                {selectedDeal.stage}
              </p>

              <p>
                <strong>Probability:</strong>{" "}
                {selectedDeal.probability}%
              </p>

              <p>
                <strong>Closing Date:</strong>{" "}
                {selectedDeal.closingDate}
              </p>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setSelectedDeal(null)
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
}

export default Deals;