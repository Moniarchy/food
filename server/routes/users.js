const express = require('express')
const router = express.Router()

const { User } = require('../database')

router.post('/sign-up', (request, response) => {
  const { username, email, password, lat, long } = request.body

  if ( !username.length || !email.length || !password.length) {
    response.status( 400 ).json({ error: "Please enter all required information."})
  } else {
    User.signUp({ username, email, password, lat, long })
      .then( user => {
        request.session.user = user
        response.status( 201 ).json( user )
      })
      .catch( error => response.status( 500 ).json({ error: "The email or username you entered was already taken." }))
      //TODO: add handling (maybe on front end?) if there is missing info. that creates an error
  }
})

router.post( '/login', ( request, response ) => {
  const { email, password } = request.body
  User.login({ email, password })
    .then( user => {
      request.session.user = user
      response.status( 200 ).json( user )
    })
    .catch( error => response.status( 500 ).json({ error: error.message }))
    //TODO: add handling if the usernae or email does not exist
    //TODO: add handling if the passwords do not match
})

//TODO: Get this working
router.get( '/logout', ( request, response ) => {
  request.session.destroy( error => {
    if(error) {
      response.status(500).json({ error: error.message })
    } else {
      response.status(200).json("You have successfully logged out.")
    }
  })
})

module.exports = router
