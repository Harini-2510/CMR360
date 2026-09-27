import "./Tasks.css";
function Tasks({
  showTaskForm,
  setShowTaskForm,
  clearTaskForm,

  taskEditIndex,

  taskTitle,
  setTaskTitle,

  taskAssignedTo,
  setTaskAssignedTo,

  taskDueDate,
  setTaskDueDate,

  taskPriority,
  setTaskPriority,

  taskStatus,
  setTaskStatus,

  taskDescription,
  setTaskDescription,

  handleTaskSubmit,

  taskSearch,
  setTaskSearch,

  taskFilterStatus,
  setTaskFilterStatus,

  taskFilterPriority,
  setTaskFilterPriority,

  filteredTasks,
  tasks,

  handleTaskAssignmentChange,
  handleTaskStatusChange,
  handleTaskView,
  handleTaskEdit,
  handleTaskDelete,
  handleTaskComplete,

  selectedTask,
  setSelectedTask,
}) {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>Tasks</h1>
          <p>
            Create, assign and manage your sales tasks
          </p>
        </div>
      </div>

      <div className="customer-add-action">
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setShowTaskForm(true);
            clearTaskForm();
          }}
        >
          + Add Task
        </button>
      </div>

      {showTaskForm && (
        <div className="content-card">

          <div className="card-header">
            <h2>
              {taskEditIndex !== null
                ? "Update Task"
                : "Create Task"}
            </h2>
          </div>

          <form
            onSubmit={handleTaskSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) =>
                  setTaskTitle(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Assign To</label>
              <select
                value={taskAssignedTo}
                onChange={(e) =>
                  setTaskAssignedTo(e.target.value)
                }
              >
                <option value="Admin">
                  Admin
                </option>

                <option value="Sales Manager">
                  Sales Manager
                </option>

                <option value="Sales Executive">
                  Sales Executive
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) =>
                  setTaskDueDate(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={taskPriority}
                onChange={(e) =>
                  setTaskPriority(e.target.value)
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={taskStatus}
                onChange={(e) =>
                  setTaskStatus(e.target.value)
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {taskEditIndex !== null
                  ? "Update Task"
                  : "Create Task"}
              </button>

              {taskEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearTaskForm}
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

          <h2>Task List</h2>

          <div className="table-controls">

            <input
              type="text"
              placeholder="Search tasks..."
              value={taskSearch}
              onChange={(e) =>
                setTaskSearch(e.target.value)
              }
            />

            <select
              value={taskFilterStatus}
              onChange={(e) =>
                setTaskFilterStatus(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <select
              value={taskFilterPriority}
              onChange={(e) =>
                setTaskFilterPriority(e.target.value)
              }
            >
              <option value="All">
                All Priority
              </option>

              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-state"
                  >
                    No tasks found
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => {

                  const originalIndex =
                    tasks.findIndex(
                      (item) => item === task
                    );

                  return (
                    <tr key={originalIndex}>

                      <td>
                        <strong>
                          {task.title}
                        </strong>

                        <div
                          style={{
                            fontSize: "12px",
                            marginTop: "4px",
                            opacity: 0.7,
                          }}
                        >
                          {task.description}
                        </div>
                      </td>

                      <td>
                        <select
                          value={task.assignedTo}
                          onChange={(e) =>
                            handleTaskAssignmentChange(
                              originalIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="Admin">
                            Admin
                          </option>

                          <option value="Sales Manager">
                            Sales Manager
                          </option>

                          <option value="Sales Executive">
                            Sales Executive
                          </option>
                        </select>
                      </td>

                      <td>
                        {task.dueDate}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            task.priority === "High"
                              ? "inactive"
                              : task.priority ===
                                "Medium"
                              ? "pending"
                              : "active"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleTaskStatusChange(
                              originalIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
                          </option>
                        </select>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <button
                            type="button"
                            className="view-btn"
                            onClick={() =>
                              handleTaskView(task)
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleTaskEdit(
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
                              handleTaskDelete(
                                originalIndex
                              )
                            }
                          >
                            Delete
                          </button>

                          {task.status !==
                            "Completed" && (
                            <button
                              type="button"
                              className="primary-btn small-btn"
                              onClick={() =>
                                handleTaskComplete(
                                  originalIndex
                                )
                              }
                            >
                              Complete
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

      {selectedTask && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>Task Details</h2>

              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setSelectedTask(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-body">

              <p>
                <strong>Task:</strong>{" "}
                {selectedTask.title}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {selectedTask.description}
              </p>

              <p>
                <strong>Assigned To:</strong>{" "}
                {selectedTask.assignedTo}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {selectedTask.dueDate}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {selectedTask.priority}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedTask.status}
              </p>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setSelectedTask(null)
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

export default Tasks;