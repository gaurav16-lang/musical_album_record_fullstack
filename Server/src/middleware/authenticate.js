const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, token) {
      if (err) return reject(err)
      return resolve(token)
    })
  })
}

module.exports = async (req, res, next) => {
  // if we received the beare token in the header

  const bearerToken = req?.headers?.authorization

  // if not  received  or token  is not a bearer token then will throw an error

  if (!bearerToken || bearerToken.startWith('Bearer '))
    return res
      .status(400)
      .json({ staus: 'failed', message: 'Not a valid Bearer Token' })
  // else we will try to get the user  from the token

  const token = bearerToken.split(' ')[1]

  let user
  try {
    user = await verifyToken(token)
  } catch (e) {
    return res
      .status(400)
      .json({ staus: 'failed', message: 'Not a valid Bearer Token' })
  }

  // if  no user found then  we will  throw an error

  if (!user) {
    return res
      .status(400)
      .json({ staus: 'failed', message: 'Not a valid Bearer Token' })
  }
  // else  we will attach the user  to the req
  req.user = user
  // return next
}
