const express = require("express");

const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// LEAD ROUTES
// =========================================================


// =========================================================
// ADD LEAD
// =========================================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        company,
        email,
        phone,
        source,
        status,
        assignedTo,
        followUpDate,
        notes,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Lead name is required.",
        });
      }

      const lead = await Lead.create({
        name,
        company: company || "",
        email: email ? email.toLowerCase() : "",
        phone: phone || "",
        source: source || "",
        status: status || "New",
        assignedTo: assignedTo || null,
        followUpDate: followUpDate || null,
        notes: notes || "",
        createdBy: req.user.userId,
      });

      const populatedLead =
        await Lead.findById(lead._id)
          .populate("assignedTo", "name email role")
          .populate("createdBy", "name email role")
          .populate(
            "convertedCustomer",
            "name company email phone"
          );

      res.status(201).json({
        message: "Lead created successfully.",
        lead: populatedLead,
      });

    } catch (error) {
      console.error("Create Lead Error:", error);

      return res.status(500).json({
        message: "Server error while creating lead.",
      });
    }
  }
);


// =========================================================
// GET ALL LEADS
// =========================================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        search,
        status,
        assignedTo,
      } = req.query;

      // IMPORTANT:
      // No createdBy filter here.
      // This allows old/existing leads to appear.

      const filter = {};

      if (search) {
        filter.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            company: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      if (status && status !== "All") {
        filter.status = status;
      }

      if (assignedTo) {
        filter.assignedTo = assignedTo;
      }

      const leads =
        await Lead.find(filter)
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          )
          .populate(
            "convertedCustomer",
            "name company email phone"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message: "Leads fetched successfully.",
        count: leads.length,
        leads,
      });

    } catch (error) {
      console.error("Get Leads Error:", error);

      res.status(500).json({
        message: "Server error while fetching leads.",
      });
    }
  }
);


// =========================================================
// LEAD STATISTICS
// =========================================================

router.get(
  "/stats/count",
  authMiddleware,
  async (req, res) => {
    try {
      // Count ALL existing leads

      const totalLeads =
        await Lead.countDocuments({});

      const newLeads =
        await Lead.countDocuments({
          status: "New",
        });

      const contactedLeads =
        await Lead.countDocuments({
          status: "Contacted",
        });

      const qualifiedLeads =
        await Lead.countDocuments({
          status: "Qualified",
        });

      const proposalLeads =
        await Lead.countDocuments({
          status: "Proposal Sent",
        });

      const wonLeads =
        await Lead.countDocuments({
          status: "Won",
        });

      const lostLeads =
        await Lead.countDocuments({
          status: "Lost",
        });

      const convertedLeads =
        await Lead.countDocuments({
          status: "Converted",
        });

      res.status(200).json({
        message:
          "Lead statistics fetched successfully.",

        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        proposalLeads,
        wonLeads,
        lostLeads,
        convertedLeads,
      });

    } catch (error) {
      console.error(
        "Lead Statistics Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching lead statistics.",
      });
    }
  }
);


// =========================================================
// GET SINGLE LEAD
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      // No createdBy filter.
      // Old leads can also be opened.

      const lead =
        await Lead.findById(req.params.id)
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          )
          .populate(
            "convertedCustomer",
            "name company email phone"
          );

      if (!lead) {
        return res.status(404).json({
          message: "Lead not found.",
        });
      }

      res.status(200).json({
        message: "Lead fetched successfully.",
        lead,
      });

    } catch (error) {
      console.error(
        "Get Lead Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching lead.",
      });
    }
  }
);


// =========================================================
// UPDATE LEAD
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        company,
        email,
        phone,
        source,
        status,
        assignedTo,
        followUpDate,
        notes,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Lead name is required.",
        });
      }

      const updatedLead =
        await Lead.findByIdAndUpdate(
          req.params.id,
          {
            name,
            company: company || "",
            email: email
              ? email.toLowerCase()
              : "",
            phone: phone || "",
            source: source || "",
            status: status || "New",
            assignedTo: assignedTo || null,
            followUpDate:
              followUpDate || null,
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
            "createdBy",
            "name email role"
          )
          .populate(
            "convertedCustomer",
            "name company email phone"
          );

      if (!updatedLead) {
        return res.status(404).json({
          message: "Lead not found.",
        });
      }

      res.status(200).json({
        message:
          "Lead updated successfully.",
        lead: updatedLead,
      });

    } catch (error) {
      console.error(
        "Update Lead Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating lead.",
      });
    }
  }
);


// =========================================================
// CONVERT LEAD TO CUSTOMER
// =========================================================

router.post(
  "/:id/convert",
  authMiddleware,
  async (req, res) => {
    try {
      const lead =
        await Lead.findById(req.params.id);

      if (!lead) {
        return res.status(404).json({
          message: "Lead not found.",
        });
      }

      if (
        lead.status === "Converted" &&
        lead.convertedCustomer
      ) {
        return res.status(400).json({
          message:
            "Lead is already converted to a customer.",
          customerId:
            lead.convertedCustomer,
        });
      }

      const Customer =
        require("../models/Customer");

      const customer =
        await Customer.create({
          name: lead.name,
          company: lead.company || "",
          email: lead.email || "",
          phone: lead.phone || "",
          source: lead.source || "Lead",
          status: "Active",
          notes: lead.notes || "",
          assignedTo:
            lead.assignedTo || null,
          createdBy: req.user.userId,
        });

      lead.status = "Converted";
      lead.convertedCustomer =
        customer._id;

      await lead.save();

      const populatedLead =
        await Lead.findById(lead._id)
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email role"
          )
          .populate(
            "convertedCustomer",
            "name company email phone"
          );

      res.status(200).json({
        message:
          "Lead converted to customer successfully.",
        lead: populatedLead,
        customer,
      });

    } catch (error) {
      console.error(
        "Convert Lead Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while converting lead to customer.",
      });
    }
  }
);


// =========================================================
// DELETE LEAD
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const deletedLead =
        await Lead.findByIdAndDelete(
          req.params.id
        );

      if (!deletedLead) {
        return res.status(404).json({
          message: "Lead not found.",
        });
      }

      res.status(200).json({
        message:
          "Lead deleted successfully.",
        lead: deletedLead,
      });

    } catch (error) {
      console.error(
        "Delete Lead Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while deleting lead.",
      });
    }
  }
);


module.exports = router;