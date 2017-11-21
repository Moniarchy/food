const express = require( 'express' )
const favicon = require( 'serve-favicon' )
const logger = require( 'morgan' )
const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const session = require( 'express-session' )

const users = require( './routes/users' )

const protect = require( './middleware/protect' )
const errorHandler = require( './handlers/serverError' )
const notFoundHandler = require( './handlers/notFound' )

const app = express()

app.use( logger( 'dev' ))
app.use( bodyParser.json())
app.use( bodyParser.urlencoded({ extended: false }))
app.use( cookieParser())
app.use( session({
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000
  },
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
  }))

app.use( '/users', users )
app.get( '/protected-test', protect, ( request, response ) => {
  response.json({ message: 'you made it' })
})

app.use( notFoundHandler )
app.use( errorHandler )

module.exports = app
