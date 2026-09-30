const express = require("express");

const router = express.Router();

const User = require("../models/User");


// ================= GET USER =================

router.get("/:id", async (req, res) => {

    try {

        const user =
            await User
                .findById(req.params.id)
                .select("-password");


        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }


        res.json(user);

    }

    catch (error) {

        res.status(500).json({
            message: "Unable to get user.",
            error: error.message
        });

    }

});


// ================= FOLLOW USER =================

router.put("/:id/follow", async (req, res) => {

    try {

        const {
            userId
        } = req.body;


        const userToFollow =
            await User.findById(req.params.id);


        const currentUser =
            await User.findById(userId);


        if (!userToFollow || !currentUser) {

            return res.status(404).json({
                message: "User not found."
            });

        }


        const alreadyFollowing =
            currentUser.following.includes(
                userToFollow._id
            );


        if (alreadyFollowing) {

            currentUser.following =
                currentUser.following.filter(
                    id =>
                        id.toString() !==
                        userToFollow._id.toString()
                );


            userToFollow.followers =
                userToFollow.followers.filter(
                    id =>
                        id.toString() !==
                        currentUser._id.toString()
                );

        }

        else {

            currentUser.following.push(
                userToFollow._id
            );

            userToFollow.followers.push(
                currentUser._id
            );

        }


        await currentUser.save();

        await userToFollow.save();


        res.json({
            following: !alreadyFollowing
        });

    }

    catch (error) {

        res.status(500).json({
            message: "Unable to follow user.",
            error: error.message
        });

    }

});


module.exports = router;