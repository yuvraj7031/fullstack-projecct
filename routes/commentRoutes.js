const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {

    createComment,

    getAllComments

} = require("../controllers/commentController");


router.post("/", auth, createComment);

router.get("/", getAllComments);


module.exports = router;