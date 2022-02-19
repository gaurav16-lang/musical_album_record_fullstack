const passport = require('passport')

require('dotenv').config()

const artist = require('../models/artist.model')

const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:2345/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // console.log(
      //   'accessToke',
      //   'refreshtoken',
      //   'profile',
      //   accessToken,S
      //   refreshToken,
      //   profile,
      // )
      return done(null, 'user')
    },
  ),
)

module.exports = passport
