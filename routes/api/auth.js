const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route   POST api/auth
// @desc    Authenticate the user
// @access  Public
router.post("/", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
    }

    // check for existing
    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ msg: "Invalid credentials, please try again." });

            jwt.sign(
                { id: user.id },
                config.jwtSecret,
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            name: user.name,
                            id: user.id,
                            email: user.email,
                        },
                    });
                }
            );
        });
    });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => res.json(user));
});

module.exports = router;
