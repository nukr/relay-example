import jwt from 'jsonwebtoken'

export default function sign () {
  return new Promise((resolve, reject) => {
    jwt.sign({userid: 1}, 'secret', {algorithm: 'HS512'}, resolve)
  })
}
