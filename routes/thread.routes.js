const express = require("express");
const router = express.Router();
const Thread = require('../models/Thread.model')

router.post('/create', (req, res, next) => {
    const { title, content, parentTopic, author } = req.body

    Thread.find()
        .then((response) => {
            length = response.length
            console.log(length)
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
            console.log(response)
            res.json({ thread: response })
        })
})

module.exports = router;
