const express = require("express");

const Customer = require("../models/Customer");
const Lead = require("../models/Lead");
const Task = require("../models/Task");
const Deal = require("../models/Deals");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// CRM360 REPORT ROUTES
// =========================================================


// =========================================================
// GET CRM SUMMARY REPORT
// =========================================================

router.get(
  "/summary",
  authMiddleware,
  async (req, res) => {
    try {

      const totalCustomers =
        await Customer.countDocuments({
          createdBy: req.user.userId,
        });

      const activeCustomers =
        await Customer.countDocuments({
          createdBy: req.user.userId,
          status: "Active",
        });

      const inactiveCustomers =
        await Customer.countDocuments({
          createdBy: req.user.userId,
          status: "Inactive",
        });


      const totalLeads =
        await Lead.countDocuments({
          createdBy: req.user.userId,
        });

      const activeLeads =
        await Lead.countDocuments({
          createdBy: req.user.userId,
          status: {
            $nin: [
              "Converted",
              "Lost",
            ],
          },
        });

      const convertedLeads =
        await Lead.countDocuments({
          createdBy: req.user.userId,
          status: "Converted",
        });

      const lostLeads =
        await Lead.countDocuments({
          createdBy: req.user.userId,
          status: "Lost",
        });


      const totalTasks =
        await Task.countDocuments({
          createdBy: req.user.userId,
        });

      const pendingTasks =
        await Task.countDocuments({
          createdBy: req.user.userId,
          status: "Pending",
        });

      const inProgressTasks =
        await Task.countDocuments({
          createdBy: req.user.userId,
          status: "In Progress",
        });

      const completedTasks =
        await Task.countDocuments({
          createdBy: req.user.userId,
          status: "Completed",
        });

      const cancelledTasks =
        await Task.countDocuments({
          createdBy: req.user.userId,
          status: "Cancelled",
        });


      const totalDeals =
        await Deal.countDocuments({
          createdBy: req.user.userId,
        });

      const openDeals =
        await Deal.countDocuments({
          createdBy: req.user.userId,
          stage: {
            $nin: [
              "Won",
              "Lost",
            ],
          },
        });

      const wonDeals =
        await Deal.countDocuments({
          createdBy: req.user.userId,
          stage: "Won",
        });

      const lostDeals =
        await Deal.countDocuments({
          createdBy: req.user.userId,
          stage: "Lost",
        });


      const wonValueResult =
        await Deal.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
              stage: "Won",
            },
          },

          {
            $group: {
              _id: null,

              totalValue: {
                $sum: "$value",
              },
            },
          },
        ]);


      const pipelineValueResult =
        await Deal.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
              stage: {
                $nin: [
                  "Won",
                  "Lost",
                ],
              },
            },
          },

          {
            $group: {
              _id: null,

              totalValue: {
                $sum: "$value",
              },
            },
          },
        ]);


      const totalDealValueResult =
        await Deal.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: null,

              totalValue: {
                $sum: "$value",
              },
            },
          },
        ]);


      const wonValue =
        wonValueResult.length > 0
          ? wonValueResult[0].totalValue
          : 0;

      const pipelineValue =
        pipelineValueResult.length > 0
          ? pipelineValueResult[0].totalValue
          : 0;

      const totalDealValue =
        totalDealValueResult.length > 0
          ? totalDealValueResult[0].totalValue
          : 0;


      res.status(200).json({
        message:
          "CRM summary report fetched successfully.",

        customers: {
          total: totalCustomers,
          active: activeCustomers,
          inactive: inactiveCustomers,
        },

        leads: {
          total: totalLeads,
          active: activeLeads,
          converted: convertedLeads,
          lost: lostLeads,
        },

        tasks: {
          total: totalTasks,
          pending: pendingTasks,
          inProgress: inProgressTasks,
          completed: completedTasks,
          cancelled: cancelledTasks,
        },

        deals: {
          total: totalDeals,
          open: openDeals,
          won: wonDeals,
          lost: lostDeals,
          totalValue: totalDealValue,
          pipelineValue: pipelineValue,
          wonValue: wonValue,
        },
      });

    } catch (error) {

      console.error(
        "CRM Summary Report Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while generating CRM summary report.",
      });
    }
  }
);


// =========================================================
// CUSTOMER REPORT
// =========================================================

router.get(
  "/customers",
  authMiddleware,
  async (req, res) => {
    try {

      const customersByStatus =
        await Customer.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: "$status",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      const customersBySource =
        await Customer.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: {
                $cond: [
                  {
                    $or: [
                      {
                        $eq: [
                          "$source",
                          "",
                        ],
                      },

                      {
                        $eq: [
                          "$source",
                          null,
                        ],
                      },
                    ],
                  },

                  "Unknown",

                  "$source",
                ],
              },

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      res.status(200).json({
        message:
          "Customer report fetched successfully.",

        customersByStatus,

        customersBySource,
      });

    } catch (error) {

      console.error(
        "Customer Report Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while generating customer report.",
      });
    }
  }
);


// =========================================================
// LEAD REPORT
// =========================================================

router.get(
  "/leads",
  authMiddleware,
  async (req, res) => {
    try {

      const leadsByStatus =
        await Lead.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: "$status",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      const leadsBySource =
        await Lead.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: {
                $cond: [
                  {
                    $or: [
                      {
                        $eq: [
                          "$source",
                          "",
                        ],
                      },

                      {
                        $eq: [
                          "$source",
                          null,
                        ],
                      },
                    ],
                  },

                  "Unknown",

                  "$source",
                ],
              },

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      res.status(200).json({
        message:
          "Lead report fetched successfully.",

        leadsByStatus,

        leadsBySource,
      });

    } catch (error) {

      console.error(
        "Lead Report Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while generating lead report.",
      });
    }
  }
);


// =========================================================
// TASK REPORT
// =========================================================

router.get(
  "/tasks",
  authMiddleware,
  async (req, res) => {
    try {

      const tasksByStatus =
        await Task.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: "$status",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      const tasksByPriority =
        await Task.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: "$priority",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      res.status(200).json({
        message:
          "Task report fetched successfully.",

        tasksByStatus,

        tasksByPriority,
      });

    } catch (error) {

      console.error(
        "Task Report Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while generating task report.",
      });
    }
  }
);


// =========================================================
// DEAL / SALES REPORT
// =========================================================

router.get(
  "/deals",
  authMiddleware,
  async (req, res) => {
    try {

      const dealsByStage =
        await Deal.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: "$stage",

              count: {
                $sum: 1,
              },

              totalValue: {
                $sum: "$value",
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);


      const salesByStage =
        await Deal.aggregate([
          {
            $match: {
              createdBy: req.user.userId,
            },
          },

          {
            $group: {
              _id: "$stage",

              totalValue: {
                $sum: "$value",
              },
            },
          },

          {
            $sort: {
              totalValue: -1,
            },
          },
        ]);


      res.status(200).json({
        message:
          "Deal report fetched successfully.",

        dealsByStage,

        salesByStage,
      });

    } catch (error) {

      console.error(
        "Deal Report Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while generating deal report.",
      });
    }
  }
);


module.exports = router;