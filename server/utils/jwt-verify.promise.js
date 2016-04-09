import jwt from 'jsonwebtoken'

export default function verify (credentials) {
  return new Promise((resolve, reject) => {
    jwt.verify(credentials, 'secret', (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}
