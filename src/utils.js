const jwt = require('jsonwebtoken')

function getUserId(request) {
  const Authorization =
    typeof request.Authorization !== 'undefined' ?
      request.Authorization :
      request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace(/^Bearer /, '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new Error('Unauthorized')
}

module.exports = {
  getUserId
}