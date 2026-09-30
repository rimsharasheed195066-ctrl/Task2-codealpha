const express = require("express");

const router = express.Router();

const Post = require("../models/Post");
const Comment = require("../models/Comment");


// ================= GET ALL POSTS =================

router.get("/", async (req, res) => {

    try {

        const posts = await Post
            .find()
            .populate("user", "name username profileImage")
            .sort({ createdAt: -1 });


        res.json(posts);

    }

    catch (error) {

        res.status(500).json({
            message: "Unable to get posts.",
            error: error.message
        });

    }

});


// ================= CREATE POST =================

router.post("/", async (req, res) => {

    try {

        const {
            user,
            content,
            image
        } = req.body;


        const post = new Post({
            user,
            content,
            image
        });


        await post.save();


        const populatedPost =
            await post.populate(
                "user",
                "name username profileImage"
            );


        res.status(201).json(populatedPost);

    }

    catch (error) {

        res.status(500).json({
            message: "Unable to create post.",
            error: error.message
        });

    }

});


// ================= LIKE POST =================

router.put("/:id/like", async (req, res) => {

    try {

        const {
            userId
        } = req.body;


        const post =
            await Post.findById(req.params.id);


        if (!post) {

            return res.status(404).json({
                message: "Post not found."
            });

        }


        const alreadyLiked =
            post.likes.includes(userId);


        if (alreadyLiked) {

            post.likes =
                post.likes.filter(
                    id => id.toString() !== userId
                );

        }

        else {

            post.likes.push(userId);

        }


        await post.save();


        res.json({
            likes: post.likes.length,
            liked: !alreadyLiked
        });

    }

    catch (error) {

        res.status(500).json({
            message: "Unable to like post.",
            error: error.message
        });

    }

});


// ================= DELETE POST =================

router.delete("/:id", async (req, res) => {

    try {

        const post =
            await Post.findByIdAndDelete(
                req.params.id
            );


        if (!post) {

            return res.status(404).json({
                message: "Post not found."
            });

        }


        await Comment.deleteMany({
            post: req.params.id
        });


        res.json({
            message: "Post deleted successfully."
        });

    }

    catch (error) {

        res.status(500).json({
            message: "Unable to delete post.",
            error: error.message
        });

    }

});


module.exports = router;