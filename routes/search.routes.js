const express = require("express");
const router = express.Router();
const Thread = require('../models/Thread.model')

router.get('/result/:searchValue', (req, res, next) => {
    const { searchValue } = req.params

    Thread.find().populate('author', 'username')
        .then((response) => {
            const filteredResponse = response.filter((thread) => {
                return thread.title.toLowerCase().includes(searchValue.toLowerCase()) || thread.content.toLowerCase().includes(searchValue.toLowerCase())
            })
            if (filteredResponse) {
                res.status(200).json({ filteredResponse })
            }
            else {
                res.status(200).json({ message: "No threads found" })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: "error" })
        })
})

module.exports = router;