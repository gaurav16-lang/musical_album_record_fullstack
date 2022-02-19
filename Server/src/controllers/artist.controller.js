const express = require('express')
const Artist = require('../models/artist.model')
const router = express.Router()

const authenticate = require('../middleware/authenticate')

router.post('/', async (req, res) => {
  try {
    const data = await Artist.create(req.body)

    return res.status(201).send(data)
  } catch (e) {
    return res.status(501).json({ e: e.message, status: 'Failure' })
  }
})

router.get('/', async (req, res) => {
  try {
    const Page = +req.query.page || 1

    const Size = +req.query.size || 6

    // page is 1 skip(0)iteam limit 2 iteam
    const skip = (Page - 1) * Size
    // Skipiteam = (page-1)*size
    let data = await Artist.find()
      .populate('album_id')
      .skip(skip)
      .limit(Size)
      .lean()
      .exec()

    const totalpages = Math.ceil((await Artist.find().countDocuments()) / Size)
    return res.json({ data, totalpages })
  } catch (e) {
    return res.status(501).json({ e: e.message, status: 'Failure' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const data = await Artist.findById(req.params.id)
    return res.status(200).send(data)
  } catch (e) {
    return res.status(500).json({ status: 'Failled', message: e.message })
  }
})
module.exports = router
