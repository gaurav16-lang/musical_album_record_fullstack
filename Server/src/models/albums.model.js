const { model, Schema } = require('mongoose')

const albumSchema = Schema(
  {
    albumname: { type: String, required: true },
    releasedyear: { type: Number, required: true },
    imagealbum: { type: String, required: true },
    numberofsongs: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const Album = model('album', albumSchema)
module.exports = Album
