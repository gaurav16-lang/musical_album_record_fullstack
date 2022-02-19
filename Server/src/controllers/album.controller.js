const express = require('express')
const Album = require('../models/albums.model')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const data = await Album.create(req.body)

    return res.status(201).send(data)
  } catch (e) {
    return res.status(501).json({ e: e.message, status: 'Failure' })
  }
})

module.exports = router
