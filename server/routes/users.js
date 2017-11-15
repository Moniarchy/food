const express = require('express')
const router = express.Router()

const { User } = require( '../database' )

router.post( '/sign-up', ( request, response ) => {
  const { username, email, password, lat, long } = request.body

  User.signUp({ username, email, password, lat, long })
    .then( user => response.status( 201 ).json( user ))
    .catch( error => response.status( 500 ).json({ error: "The email or username you entered were already taken." }))
})

router.post( '/login', ( request, response ) => {
  User.login( request.body )
    .then( user => response.cookie( 'user_id', user.id ).status( 200 ).json( user ))
    .catch( error => response.status( 500 ).json({ error: error.message }))
})

module.exports = router
