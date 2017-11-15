const protect = (request, response, next) => {
  const { user_id } = request.cookies

  if( user_id === undefined ) {
    response.status(401).json({ "message" : "You must be logged in to see this page." })
  } else {
    request.user = { id: user_id }
    next()
  }
}

module.exports = protect
