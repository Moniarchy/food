const db = require( '../../connection' )
const bcrypt = require( 'bcrypt' )

const SIGN_UP = 'INSERT INTO users ( password, salt, username, email, lat, long ) VALUES ( ${password}, ${salt}, ${username}, ${email}, ${lat}, ${long} ) RETURNING id, username, email'

//here we are creatng a function that takes a user then returns a function that doesn't take any parameters.
//why not just use user in that second function?

const generateSaltedUser = user => () =>
  bcrypt.genSalt()
    .then( salt => Object.assign( {}, user, { salt }))
    //should i add a .catch here?

const generateEncryptedPasswordUser = user =>
  bcrypt.hash( user.password, user.salt )
    .then( encryptedPassword => Object.assign( {}, user, { password: encryptedPassword }))

const signUp = user =>
  bcrypt.genSalt()
    .then( generateSaltedUser(user) )
    .then( generateEncryptedPasswordUser )
    .then( data => db.one( SIGN_UP, data ))
    //should i add a .catch here?

module.exports = signUp
