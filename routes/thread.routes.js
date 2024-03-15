const express = require("express");
const router = express.Router();
const Thread = require('../models/Thread.model')
const Comment = require('../models/Comment.model')

router.post('/create', (req, res, next) => {
    const { title, content, parentTopic, author } = req.body

    Thread.find()
        .then((response) => {
            length = response.length
            Thread.create({ title, content, parentTopic, author, numId: length + 1 })
                .then((createdThread) => {
                    res.json(createdThread)
                })
                .catch((err) => {
                    res.status(401).json(err)
                })
        })
})

router.get('/getAll/:topicId', (req, res, next) => {
    const { topicId } = req.params

    Thread.find({ parentTopic: topicId }).populate('author', 'username')
        .then((response) => {
            res.json({ response })
        })
})

router.get('/getOne/:threadId', (req, res, next) => {
    const { threadId } = req.params

    Thread.findById(threadId).populate('author', 'username')
        .then((response) => {
            res.json({ thread: response })
        })
})

router.post('/edit/:threadId', (req, res, next) => {
    const { threadId } = req.params
    const { title, content, loggedInUser, author } = req.body

    if (content === "<p><br></p>") {
        res.status(400).json({ message: "Content can not be empty" });
        return;
    }
    if (loggedInUser === author) {
        console.log("test")
        Thread.findByIdAndUpdate(threadId, { title, content })
            .then((res) => {
                res.status(200).json(res)
            })
            .catch((err) =>
                res.status(201).json(err)
            )
    }
})

router.post('/delete/:threadId', async (req, res, next) => {
    const { threadId } = req.params
    const commentDelete = await Comment.deleteMany({ parentThread: threadId });
    if (commentDelete.acknowledged) {
        const threadDelete = await Thread.findByIdAndDelete(threadId)
        if (threadDelete) {
            res.status(200).json({ message: "Thread Deleted" })
        }
    }
})

module.exports = router;
