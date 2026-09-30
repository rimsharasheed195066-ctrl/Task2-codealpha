const express = require("express");

const router = express.Router();

const User = require("../models/User");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            username,
            email,
            password
        } = req.body;


        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists."
            });

        }


        const user = new User({
            name,
            username,
            email,
            password
        });


        await user.save();


        res.status(201).json({
            message: "Registration successful.",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });

    }

    catch (error) {

        res.status(500).json({
            message: "Server error.",
            error: error.message
        });

    }

});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user = await User.findOne({
            email: email
        });


        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }


        if (user.password !== password) {

            return res.status(401).json({
                message: "Incorrect password."
            });

        }


        res.json({

            message: "Login successful.",

            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }

        });

    }

    catch (error) {

        res.status(500).json({
            message: "Server error.",
            error: error.message
        });

    }

});


module.exports = router;