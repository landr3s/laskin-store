import jwt from 'jsonwebtoken'

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_JWT, {
    expiresIn: '30d'
  })
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'strict'
  })
  return token
}

export default createToken
