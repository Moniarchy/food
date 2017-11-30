const express = require('express')
const router = express.Router()

const { User } = require( '../database' )

router.post( '/sign-up', ( request, response ) => {
  //if request.session.user, don't even let someone see this page
  const { username, email, password, lat, long } = request.body

  User.signUp({ username, email, password, lat, long })
    .then( user => response.status( 201 ).json( user ))
    .catch( error => response.status( 500 ).json({ error: "The email or username you entered were already taken." }))
    //TODO: add handling (maybe on front end?) if there is missing info. that creates an error
})

router.post( '/login', ( request, response ) => {
  //if request.session.user, don't even let someone see this page
  User.login( request.body )
    .then( user => response.cookie( 'user_id', user.id ).status( 200 ).json( user ))
    .catch( error => response.status( 500 ).json({ error: error.message }))
    //TODO: add handling if the usernae or email does not exist
    //TODO: add handling if the passwords do not match
})

router.get( '/logout', ( request, response ) => {
  response.clearCookie( "user_id" ).status( 200 ).json( "You have successfully logged out." )
})
router.get( '/fake', ( request, response ) => {
  console.log(request.session)
  response.send('hi')
})

module.exports = router
