const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('./models/user')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: '159663173618-v4dfnehavj0jo0eal03af1ba2g9i46lm.apps.googleusercontent.com',
        clientSecret: 'NZHXQvEyekduOCSuh7rToZGs',
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}