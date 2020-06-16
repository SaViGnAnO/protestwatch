const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const jwt = require("jsonwebtoken");

// @route   GET api/users
// @desc    Register new user
// @access  Public
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
    }

    // check for existing
    User.findOne({ email }).then((user) => {
        if (user) return res.status(400).json({ msg: "User already exists." });

        const newUser = new User({
            name,
            email,
            password,
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save().then((user) => {
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
    });
});

module.exports = router;
