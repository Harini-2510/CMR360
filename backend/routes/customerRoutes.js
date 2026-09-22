const express = require("express");

const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// CUSTOMER ROUTES
// =========================================================


// =========================================================
// ADD CUSTOMER
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
        address,
        assignedTo,
        status,
        source,
        notes,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Customer name is required.",
        });
      }

      const customer = await Customer.create({
        name,
        company: company || "",
        email: email ? email.toLowerCase() : "",
        phone: phone || "",
        address: address || "",
        assignedTo: assignedTo || null,
        status: status || "Active",
        source: source || "",
        notes: notes || "",
        createdBy: req.user.userId,
      });

      const populatedCustomer =
        await Customer.findById(customer._id)
          .populate("assignedTo", "name email role")
          .populate("createdBy", "name email role");

      res.status(201).json({
        message: "Customer created successfully.",
        customer: populatedCustomer,
      });

    } catch (error) {
      console.error("Create Customer Error:", error);

      res.status(500).json({
        message: "Server error while creating customer.",
      });
    }
  }
);


// =========================================================
// GET ALL CUSTOMERS
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
      // Do not filter by createdBy here.
      // This allows existing/old customers to appear.

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

      const customers =
        await Customer.find(filter)
          .populate("assignedTo", "name email role")
          .populate("createdBy", "name email role")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message: "Customers fetched successfully.",
        count: customers.length,
        customers,
      });

    } catch (error) {
      console.error("Get Customers Error:", error);

      res.status(500).json({
        message: "Server error while fetching customers.",
      });
    }
  }
);


// =========================================================
// GET SINGLE CUSTOMER
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const customer =
        await Customer.findById(req.params.id)
          .populate("assignedTo", "name email role")
          .populate("createdBy", "name email role");

      if (!customer) {
        return res.status(404).json({
          message: "Customer not found.",
        });
      }

      res.status(200).json({
        message: "Customer fetched successfully.",
        customer,
      });

    } catch (error) {
      console.error("Get Customer Error:", error);

      res.status(500).json({
        message: "Server error while fetching customer.",
      });
    }
  }
);


// =========================================================
// UPDATE CUSTOMER
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
        address,
        assignedTo,
        status,
        source,
        notes,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Customer name is required.",
        });
      }

      const updatedCustomer =
        await Customer.findByIdAndUpdate(
          req.params.id,
          {
            name,
            company: company || "",
            email: email ? email.toLowerCase() : "",
            phone: phone || "",
            address: address || "",
            assignedTo: assignedTo || null,
            status: status || "Active",
            source: source || "",
            notes: notes || "",
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .populate("assignedTo", "name email role")
          .populate("createdBy", "name email role");

      if (!updatedCustomer) {
        return res.status(404).json({
          message: "Customer not found.",
        });
      }

      res.status(200).json({
        message: "Customer updated successfully.",
        customer: updatedCustomer,
      });

    } catch (error) {
      console.error("Update Customer Error:", error);

      res.status(500).json({
        message: "Server error while updating customer.",
      });
    }
  }
);


// =========================================================
// DELETE CUSTOMER
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const deletedCustomer =
        await Customer.findByIdAndDelete(req.params.id);

      if (!deletedCustomer) {
        return res.status(404).json({
          message: "Customer not found.",
        });
      }

      res.status(200).json({
        message: "Customer deleted successfully.",
        customer: deletedCustomer,
      });

    } catch (error) {
      console.error("Delete Customer Error:", error);

      res.status(500).json({
        message: "Server error while deleting customer.",
      });
    }
  }
);


// =========================================================
// CUSTOMER COUNT
// =========================================================

router.get(
  "/stats/count",
  authMiddleware,
  async (req, res) => {
    try {
      // Count ALL existing customers
      const totalCustomers =
        await Customer.countDocuments({});

      const activeCustomers =
        await Customer.countDocuments({
          status: "Active",
        });

      const inactiveCustomers =
        await Customer.countDocuments({
          status: "Inactive",
        });

      res.status(200).json({
        message:
          "Customer statistics fetched successfully.",
        totalCustomers,
        activeCustomers,
        inactiveCustomers,
      });

    } catch (error) {
      console.error("Customer Count Error:", error);

      res.status(500).json({
        message:
          "Server error while fetching customer statistics.",
      });
    }
  }
);


module.exports = router;