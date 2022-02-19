const express = require('express')
const cors = require('cors')
const app = express()

const passport = require('./config/passport')
const { Register, Login } = require('./controllers/auth.controller')

app.use(express.json())
app.use(cors())

const albumcontrollers = require('./controllers/album.controller')
const postcontroller = require('./controllers/post')
const artistcontroller = require('./controllers/artist.controller')
app.use('/post', postcontroller)
app.use('/albums', albumcontrollers)
app.use('/artist', artistcontroller)
app.post('/Register', Register)
app.post('/Login', Login)

// http://localhost:2345/artist

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  }),
)

module.exports = app
