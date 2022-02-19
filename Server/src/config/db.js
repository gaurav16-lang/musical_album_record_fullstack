require('dotenv').config()

const mongoose = require('mongoose')

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://gaurav1:${process.env.PASSWORD}@musicplayer.9t9pp.mongodb.net/musicalbum`,
  )
}
