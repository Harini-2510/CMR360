const express = require("express");

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// =========================================================
// USER MANAGEMENT ROUTES
// =========================================================

// =========================================================
// GET ALL USERS
// =========================================================

router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "Sales Manager"
  ),
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select(
            "-password"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message:
          "Users fetched successfully.",
        users,
      });

    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );

      console.error(
        "Get Profile Error Message:",
        error.message
      );

      res.status(500).json({
        message:
          "Server error while fetching user.",
        error:
          error.message,
      });
    }
  }
);

// =========================================================
// GET SINGLE USER
// =========================================================
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.userId
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      res.json({
        message:
          "User profile fetched successfully.",
        user,
      });

    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );

      console.error(
        "Get Profile Error Message:",
        error.message
      );

      res.status(500).json({
        message:
          "Server error while fetching user.",
        error: error.message,
      });
    }
  }
);
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.userId
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      res.json({
        message:
          "User profile fetched successfully.",
        user,
      });

    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );

      console.error(
        "Get Profile Error Message:",
        error.message
      );

      res.status(500).json({
        message:
          "Server error while fetching user.",
        error: error.message,
      });
    }
  }
);

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.userId
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      res.json({
        message:
          "User profile fetched successfully.",
        user,
      });

    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );

      console.error(
        "Get Profile Error Message:",
        error.message
      );

      res.status(500).json({
        message:
          "Server error while fetching user.",
        error: error.message,
      });
    }
  }
);
router.put(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        phone,
        profileImage,
      } = req.body;

      const user = await User.findById(
        req.user.userId
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      if (name !== undefined) {
        user.name = name.trim();
      }

      if (phone !== undefined) {
        user.phone = phone;
      }

      if (profileImage !== undefined) {
        user.profileImage = profileImage;
      }

      await user.save();

      const updatedUser =
        await User.findById(
          req.user.userId
        ).select("-password");

      res.json({
        message:
          "User profile updated successfully.",
        user: updatedUser,
      });

    } catch (error) {

      console.error(
        "Update Profile Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating user profile.",
      });
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "Sales Manager"
  ),
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        ).select(
          "-password"
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      res.status(200).json({
        message:
          "User fetched successfully.",
        user,
      });

    } catch (error) {
      console.error(
        "Get User Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching user.",
      });
    }
  }
);

// =========================================================
// UPDATE USER ROLE
// =========================================================

router.patch(
  "/:id/role",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const {
        role,
      } = req.body;

      const allowedRoles = [
        "Admin",
        "Sales Manager",
        "Sales Executive",
      ];

      if (
        !role ||
        !allowedRoles.includes(
          role
        )
      ) {
        return res.status(400).json({
          message:
            "A valid user role is required.",
        });
      }

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      user.role = role;

      await user.save();

      res.status(200).json({
        message:
          "User role updated successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isActive:
            user.isActive,
        },
      });

    } catch (error) {
      console.error(
        "Update User Role Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating user role.",
      });
    }
  }
);

// =========================================================
// UPDATE USER ACTIVE STATUS
// =========================================================

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const {
        isActive,
      } = req.body;

      if (
        typeof isActive !==
        "boolean"
      ) {
        return res.status(400).json({
          message:
            "isActive must be true or false.",
        });
      }

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      user.isActive =
        isActive;

      await user.save();

      res.status(200).json({
        message:
          "User account status updated successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isActive:
            user.isActive,
        },
      });

    } catch (error) {
      console.error(
        "Update User Status Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating user status.",
      });
    }
  }
);
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.userId
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      res.json({
        message:
          "User profile fetched successfully.",
        user,
      });

    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching user profile.",
      });
    }
  }
);

module.exports = router;