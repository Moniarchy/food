const db = require( '../../connection' )
const bcrypt = require( 'bcrypt' )

const SIGN_UP = 'INSERT INTO users ( password, salt, username, email, lat, long ) VALUES ( ${password}, ${salt}, ${username}, ${email}, ${lat}, ${long} ) RETURNING id, username, email'

const generateSaltedUser = user => () =>
  bcrypt.genSalt()
    .then( salt => Object.assign( {}, user, { salt }))

const generateEncryptedPasswordUser = user =>
  bcrypt.hash( user.password, user.salt )
    .then( encryptedPassword => Object.assign( {}, user, { password: encryptedPassword }))

const signUp = user =>
  bcrypt.genSalt()
    .then( generateSaltedUser(user) )
    .then( generateEncryptedPasswordUser )
    .then( data => db.one( SIGN_UP, data ))

module.exports = signUp
