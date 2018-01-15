const protect = (request, response, next) => {

  if( !request.session.user ) {
    response.status(401).json({ "message" : "You must be logged in to see this page." })
  } else {
    next()
  }
}

module.exports = protect
