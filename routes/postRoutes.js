const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {

    createPost,

    getAllPosts,

    getPostById,

    editPost,

    deletePost

} = require("../controllers/postController");

const {

    toggleLike

} = require("../controllers/likeController");



router.post("/create", auth, createPost);

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.put("/:id", auth, editPost);

router.delete("/:id", auth, deletePost);

router.post("/like", auth, toggleLike);


module.exports = router;