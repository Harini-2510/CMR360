const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes are working!",
  });
});
router.get(
  "/protected-test",
  authMiddleware,
  (req, res) => {
    res.json({
      message:
        "Protected route accessed successfully!",
      user: req.user,
    });
  }
);
router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("Admin"),
  (req, res) => {
    res.json({
      message:
        "Admin role authorization successful!",
      user: req.user,
    });
  }
);


// =========================================================
// REGISTER USER
// =========================================================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Name, email and password are required.",
      });
    }

    const existingUser =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "Sales Executive",
      phone: phone || "",
    });

    res.status(201).json({
      message:
        "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error during registration.",
    });
  }
});


// =========================================================
// LOGIN USER
// =========================================================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Email and password are required.",
      });
    }

    const user =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message:
          "This user account is inactive.",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    const token =
      jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    res.status(200).json({
      message:
        "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error during login.",
    });
  }
});
// =========================================================
// FORGOT PASSWORD
// =========================================================

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist.",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires =
      new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    res.json({
      message:
        "Password reset token generated successfully.",
      resetToken: resetToken,
      expiresIn: "15 minutes",
    });

  } catch (error) {

    console.error(
      "Forgot Password Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while generating password reset token.",
    });
  }
});
// =========================================================
// RESET PASSWORD
// =========================================================

router.post("/reset-password", async (req, res) => {
  try {
    const {
      token,
      newPassword,
    } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message:
          "Reset token and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message:
          "New password must be at least 6 characters long.",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid or expired password reset token.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password = hashedPassword;

    user.resetPasswordToken = "";

    user.resetPasswordExpires = null;

    await user.save();

    res.json({
      message:
        "Password reset successfully. You can now login with your new password.",
    });

  } catch (error) {

    console.error(
      "Reset Password Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while resetting password.",
    });
  }
});


module.exports = router;