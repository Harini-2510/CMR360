const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// TASK ROUTES
// =========================================================


// =========================================================
// ADD TASK
// =========================================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        title,
        description,
        assignedTo,
        dueDate,
        priority,
        status,
        relatedCustomer,
        relatedLead,
        notes,
      } = req.body;

      if (!title) {
        return res.status(400).json({
          message: "Task title is required.",
        });
      }

      const task = await Task.create({
        title,
        description: description || "",
        assignedTo: assignedTo || null,
        dueDate: dueDate || null,
        priority: priority || "Medium",
        status: status || "Pending",
        relatedCustomer: relatedCustomer || null,
        relatedLead: relatedLead || null,
        notes: notes || "",
        createdBy: req.user.userId,
      });

      const populatedTask =
        await Task.findById(task._id)
          .populate("assignedTo", "name email role")
          .populate(
            "relatedCustomer",
            "name company email phone"
          )
          .populate(
            "relatedLead",
            "name company email phone status"
          )
          .populate(
            "createdBy",
            "name email role"
          );

      res.status(201).json({
        message: "Task created successfully.",
        task: populatedTask,
      });

    } catch (error) {
      console.error("Create Task Error:", error);

      res.status(500).json({
        message: "Server error while creating task.",
      });
    }
  }
);


// =========================================================
// GET ALL TASKS
// =========================================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        search,
        status,
        priority,
        assignedTo,
      } = req.query;

      // No createdBy filter.
      // Old/existing tasks will also appear.

      const filter = {};

      if (search) {
        filter.$or = [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
          {
            notes: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      if (status && status !== "All") {
        filter.status = status;
      }

      if (priority && priority !== "All") {
        filter.priority = priority;
      }

      if (assignedTo) {
        filter.assignedTo = assignedTo;
      }

      const tasks =
        await Task.find(filter)
          .populate("assignedTo", "name email role")
          .populate(
            "relatedCustomer",
            "name company email phone"
          )
          .populate(
            "relatedLead",
            "name company email phone status"
          )
          .populate(
            "createdBy",
            "name email role"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message: "Tasks fetched successfully.",
        count: tasks.length,
        tasks,
      });

    } catch (error) {
      console.error("Get Tasks Error:", error);

      res.status(500).json({
        message: "Server error while fetching tasks.",
      });
    }
  }
);


// =========================================================
// TASK STATISTICS
// =========================================================

router.get(
  "/stats/count",
  authMiddleware,
  async (req, res) => {
    try {
      // Count ALL existing tasks

      const totalTasks =
        await Task.countDocuments({});

      const pendingTasks =
        await Task.countDocuments({
          status: "Pending",
        });

      const inProgressTasks =
        await Task.countDocuments({
          status: "In Progress",
        });

      const completedTasks =
        await Task.countDocuments({
          status: "Completed",
        });

      const cancelledTasks =
        await Task.countDocuments({
          status: "Cancelled",
        });

      const highPriorityTasks =
        await Task.countDocuments({
          priority: "High",
        });

      res.status(200).json({
        message:
          "Task statistics fetched successfully.",

        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        cancelledTasks,
        highPriorityTasks,
      });

    } catch (error) {
      console.error(
        "Task Statistics Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching task statistics.",
      });
    }
  }
);


// =========================================================
// GET SINGLE TASK
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const task =
        await Task.findById(req.params.id)
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "relatedCustomer",
            "name company email phone"
          )
          .populate(
            "relatedLead",
            "name company email phone status"
          )
          .populate(
            "createdBy",
            "name email role"
          );

      if (!task) {
        return res.status(404).json({
          message: "Task not found.",
        });
      }

      res.status(200).json({
        message: "Task fetched successfully.",
        task,
      });

    } catch (error) {
      console.error(
        "Get Task Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching task.",
      });
    }
  }
);


// =========================================================
// UPDATE TASK
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        title,
        description,
        assignedTo,
        dueDate,
        priority,
        status,
        relatedCustomer,
        relatedLead,
        notes,
      } = req.body;

      if (!title) {
        return res.status(400).json({
          message:
            "Task title is required.",
        });
      }

      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          {
            title,
            description: description || "",
            assignedTo: assignedTo || null,
            dueDate: dueDate || null,
            priority: priority || "Medium",
            status: status || "Pending",
            relatedCustomer:
              relatedCustomer || null,
            relatedLead:
              relatedLead || null,
            notes: notes || "",
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "relatedCustomer",
            "name company email phone"
          )
          .populate(
            "relatedLead",
            "name company email phone status"
          )
          .populate(
            "createdBy",
            "name email role"
          );

      if (!updatedTask) {
        return res.status(404).json({
          message: "Task not found.",
        });
      }

      res.status(200).json({
        message:
          "Task updated successfully.",
        task: updatedTask,
      });

    } catch (error) {
      console.error(
        "Update Task Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating task.",
      });
    }
  }
);


// =========================================================
// MARK TASK AS COMPLETED
// =========================================================

router.patch(
  "/:id/complete",
  authMiddleware,
  async (req, res) => {
    try {
      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          {
            status: "Completed",
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "relatedCustomer",
            "name company email phone"
          )
          .populate(
            "relatedLead",
            "name company email phone status"
          )
          .populate(
            "createdBy",
            "name email role"
          );

      if (!updatedTask) {
        return res.status(404).json({
          message: "Task not found.",
        });
      }

      res.status(200).json({
        message:
          "Task marked as completed.",
        task: updatedTask,
      });

    } catch (error) {
      console.error(
        "Complete Task Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while completing task.",
      });
    }
  }
);


// =========================================================
// DELETE TASK
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const deletedTask =
        await Task.findByIdAndDelete(
          req.params.id
        );

      if (!deletedTask) {
        return res.status(404).json({
          message: "Task not found.",
        });
      }

      res.status(200).json({
        message:
          "Task deleted successfully.",
        task: deletedTask,
      });

    } catch (error) {
      console.error(
        "Delete Task Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while deleting task.",
      });
    }
  }
);


module.exports = router;