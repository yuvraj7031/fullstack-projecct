const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {

    chatWithAI

} = require("../controllers/chatbotController");


router.post("/", auth, chatWithAI);


module.exports = router;