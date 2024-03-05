const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment.model')

router.post('/create', (req, res, next) => {
    const { content, author, parentThread } = req.body

    Comment.create({ author, content, parentThread })
        .then((createdComment) => {
            console.log(createdComment)
            res.status(200).json({ createdComment })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ message: "error" })
        })
})

router.get('/getAll/:threadId', (req, res, next) => {
    const { threadId } = req.params

    Comment.find({ parentThread: threadId }).populate('author', 'username')
        .then((allComments) => {
            res.status(200).json({ allComments })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;
