
const express = require('express');
const { getMessages, addMessage } = require('../controllers/message');
const router = express.Router()
//add
router.post("/", addMessage);
//get
router.get("/:conversationId", getMessages);

module.exports = router;
