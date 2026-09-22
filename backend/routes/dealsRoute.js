const express = require("express");

const Deal = require("../models/Deals");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// DEAL / SALES PIPELINE ROUTES
// =========================================================


// =========================================================
// ADD DEAL
// =========================================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        title,
        description,
        customer,
        lead,
        assignedTo,
        value,
        stage,
        probability,
        expectedCloseDate,
        notes,
      } = req.body;


      if (!title) {

        return res.status(400).json({
          message:
            "Deal title is required.",
        });

      }


      const deal =
        await Deal.create({
          title,

          description:
            description || "",

          customer:
            customer || null,

          lead:
            lead || null,

          assignedTo:
            assignedTo || null,

          value:
            value || 0,

          stage:
            stage || "New",

          probability:
            probability || 0,

          expectedCloseDate:
            expectedCloseDate || null,

          notes:
            notes || "",

          createdBy:
            req.user.userId,
        });


      const populatedDeal =
        await Deal.findById(
          deal._id
        )
          .populate(
            "customer",
            "name company email phone"
          )
          .populate(
            "lead",
            "name company email phone status"
          )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          );


      res.status(201).json({
        message:
          "Deal created successfully.",

        deal:
          populatedDeal,
      });

    } catch (error) {

      console.error(
        "Create Deal Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while creating deal.",
      });

    }
  }
);


// =========================================================
// GET ALL DEALS
// =========================================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        search,
        stage,
        assignedTo,
      } = req.query;


      const filter = {
  createdBy: req.user.userId,
};


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


      if (
        stage &&
        stage !== "All"
      ) {

        filter.stage =
          stage;

      }


      if (assignedTo) {

        filter.assignedTo =
          assignedTo;

      }


      const deals =
        await Deal.find(filter)
          .populate(
            "customer",
            "name company email phone"
          )
          .populate(
            "lead",
            "name company email phone status"
          )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          )
          .sort({
            createdAt: -1,
          });


      res.status(200).json({
        message:
          "Deals fetched successfully.",

        count:
          deals.length,

        deals,
      });

    } catch (error) {

      console.error(
        "Get Deals Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching deals.",
      });

    }
  }
);


// =========================================================
// DEAL STATISTICS
// =========================================================

router.get(
  "/stats/count",
  authMiddleware,
  async (req, res) => {
    try {

    const totalDeals =
  await Deal.countDocuments({
    createdBy: req.user.userId,
  });


     const newDeals =
  await Deal.countDocuments({
    createdBy: req.user.userId,
    stage: "New",
  });


    const contactedDeals =
  await Deal.countDocuments({
    createdBy: req.user.userId,
    stage: "Contacted",
  });

const qualifiedDeals =
  await Deal.countDocuments({
    createdBy: req.user.userId,
    stage: "Qualified",
  });

const proposalDeals =
  await Deal.countDocuments({
    createdBy: req.user.userId,
    stage: "Proposal Sent",
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


      const wonValue =
        wonValueResult.length > 0
          ? wonValueResult[0].totalValue
          : 0;


      const pipelineValue =
        pipelineValueResult.length > 0
          ? pipelineValueResult[0].totalValue
          : 0;


      res.status(200).json({
        message:
          "Deal statistics fetched successfully.",

        totalDeals,

        newDeals,

        contactedDeals,

        qualifiedDeals,

        proposalDeals,

        wonDeals,

        lostDeals,

        wonValue,

        pipelineValue,
      });

    } catch (error) {

      console.error(
        "Deal Statistics Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching deal statistics.",
      });

    }
  }
);


// =========================================================
// GET SINGLE DEAL
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

     const deal =
  await Deal.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  })
          .populate(
            "customer",
            "name company email phone"
          )
          .populate(
            "lead",
            "name company email phone status"
          )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          );


      if (!deal) {

        return res.status(404).json({
          message:
            "Deal not found.",
        });

      }


      res.status(200).json({
        message:
          "Deal fetched successfully.",

        deal,
      });

    } catch (error) {

      console.error(
        "Get Deal Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching deal.",
      });

    }
  }
);


// =========================================================
// UPDATE DEAL
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        title,
        description,
        customer,
        lead,
        assignedTo,
        value,
        stage,
        probability,
        expectedCloseDate,
        notes,
      } = req.body;


      if (!title) {

        return res.status(400).json({
          message:
            "Deal title is required.",
        });

      }


     const updatedDeal =
  await Deal.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.userId,
    },
          {
            title,

            description:
              description || "",

            customer:
              customer || null,

            lead:
              lead || null,

            assignedTo:
              assignedTo || null,

            value:
              value || 0,

            stage:
              stage || "New",

            probability:
              probability || 0,

            expectedCloseDate:
              expectedCloseDate || null,

            notes:
              notes || "",
          },

          {
            new: true,

            runValidators: true,
          }
        )
          .populate(
            "customer",
            "name company email phone"
          )
          .populate(
            "lead",
            "name company email phone status"
          )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          );


      if (!updatedDeal) {

        return res.status(404).json({
          message:
            "Deal not found.",
        });

      }


      res.status(200).json({
        message:
          "Deal updated successfully.",

        deal:
          updatedDeal,
      });

    } catch (error) {

      console.error(
        "Update Deal Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating deal.",
      });

    }
  }
);


// =========================================================
// UPDATE DEAL STAGE
// =========================================================

router.patch(
  "/:id/stage",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        stage,
        probability,
      } = req.body;


      if (!stage) {

        return res.status(400).json({
          message:
            "Deal stage is required.",
        });

      }


   const updatedDeal =
  await Deal.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.userId,
    },
          {
            stage,

            probability:
              probability !== undefined
                ? probability
                : undefined,
          },

          {
            new: true,

            runValidators: true,
          }
        )
          .populate(
            "customer",
            "name company email phone"
          )
          .populate(
            "lead",
            "name company email phone status"
          )
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          );


      if (!updatedDeal) {

        return res.status(404).json({
          message:
            "Deal not found.",
        });

      }


      res.status(200).json({
        message:
          "Deal stage updated successfully.",

        deal:
          updatedDeal,
      });

    } catch (error) {

      console.error(
        "Update Deal Stage Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating deal stage.",
      });

    }
  }
);


// =========================================================
// DELETE DEAL
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

    const deletedDeal =
  await Deal.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });


      if (!deletedDeal) {

        return res.status(404).json({
          message:
            "Deal not found.",
        });

      }


      res.status(200).json({
        message:
          "Deal deleted successfully.",

        deal:
          deletedDeal,
      });

    } catch (error) {

      console.error(
        "Delete Deal Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while deleting deal.",
      });

    }
  }
);


module.exports = router;