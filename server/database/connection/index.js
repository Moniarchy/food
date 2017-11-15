const pgp = require('pg-promise')()
//TODO: make sure this can change for a production database
const db = pgp({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME_DEV
})

module.exports = db
