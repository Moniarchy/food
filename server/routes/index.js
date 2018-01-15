const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.json({message: "This is the homepage. Welcome to Food! Eat well!"})
})

module.exports = router
