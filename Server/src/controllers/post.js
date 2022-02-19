const express = require('express')
const Post = require('../models/post.model')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const data = await Post.create(req.body)

    return res.status(201).send(data)
  } catch (e) {
    return res.status(501).json({ e: e.message, status: 'Failure' })
  }
})

module.exports = router
