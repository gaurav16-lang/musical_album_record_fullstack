require('dotenv').config()
const jwt = require('jsonwebtoken')
const Artist = require('../models/artist.model')

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_TOKEN)
}
const Register = async (req, res) => {
  // check email address already provided them troww an error
  try {
    const artist = await Artist.findOne({ email: req.body.email }).lean().exec()

    if (artist) {
      return res
        .status(400)
        .json({ staus: 'failed', message: 'Please provide different email ID' })
    }
    // else we will  create the user
    user = await Artist.create(req.body)
    // then we will hash the password because plane text password is harmful

    // we will create the token

    const token = newToken(user)

    // return the user and token
    return res.status(201).send({ user, token })
  } catch (e) {
    return res.status(500).json({ staus: 'failed', message: e.message })
  }
}

const Login = async (req, res) => {
  // check the email id provided is already exist

  try {
    const artist = await Artist.findOne({ email: req.body.email })

    // if not then throw an error
    if (!artist) {
      return res
        .status(400)
        .json({ staus: 'failed', message: 'Please provide different email ID' })
    }
    // if exist then match the password
    const match = await Artist.checkPassword(req.body.password)
    // if password not match throw an error
    if (!match) {
      return res
        .status(400)
        .json({ staus: 'failed', message: 'password is not matched' })
    }
    // if match genrate new token
    const token = newToken(user)
    // return user and token
    return res.status(201).send({ user, token })
  } catch (e) {
    return res.status(500).json({ staus: 'failed', message: e.message })
  }
}

module.exports = { Register, Login }
