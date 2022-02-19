const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timeStamp: true,
  },
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash
    return next()
  })
})

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) return reject(err)
      return resolve(same)
    })
  })
}

module.exports = model('user', userSchema)
