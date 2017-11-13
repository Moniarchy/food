const express = require('express')
const router = express.Router()

const { User } = require( '../database' )

router.post( '/sign-up', (request, response) => {
  const { username, email, password, lat, long } = request.body

  // TODO: If user exists, return
  // TODO: Handling for specific error messages so that a message is passed up to the front end when pgp returns an error like {"error": "null value in column \"username\" violates not-null constraint"}
  //if there is a return value from the database on the check, render the sign up page with the message that the acct exists
  User.checkIfUserExists({username, email})
    .then( data => {
      if( data.length !== 0) {
        //TODO: redirect to homepage if user exists and has entered good info
        //if the password for the email address is wrong, tell the user that info is already taken
        response.status(301).json({message: 'You already exist!'})
      } else {
        User.signUp({ username, email, password, lat, long })
          .then( user => response.status(201).json( user ))
      }
    })
    .catch( error => response.status(500).json({ error: error.message  }))
})

router.post( '/login', (request, response) => {
  User.login( request.body )
    .then( user => response.cookie( 'user_id', user.id ).status(200).json( user ))
    .catch( error => response.status(500).json({ error: error.message }))
})

module.exports = router
