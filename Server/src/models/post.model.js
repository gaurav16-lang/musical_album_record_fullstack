const { model, Schema } = require('mongoose')

const postSchema = Schema({
  name: { type: String, required: true },
})

Post = model('post', postSchema)

module.exports = Post
