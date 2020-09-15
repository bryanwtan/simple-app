const process = require('process')
const { createServer } = require('http')

const STATUS_CODE = {
  OK: 200,

  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
}

const ROUTES = {
  LOGIN: '/login',
  DATE_TIME: '/datetime',
  WORKING_DIRECTORY: '/path',
}

createServer((req, res) => {
  const { headers, method, url } = req

  const prepareResponse = body => JSON.stringify({ headers, method, url, body })

  if (url === ROUTES.LOGIN && method === 'POST') {
    /**
     * BT: Oof probably should have used a library
     */
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      const requestData = JSON.parse(data)

      const { username, password } = requestData

      /**
       * BT: if this were a real app, this at least needs a salt and hash
       * in practice, would be using a library for this in production
       *
       * case insensitive username to match the most common web convention
       */
      const isCorrect =
        username.toLowerCase() === 'talagent' && password === 'password1'

      if (isCorrect) {
        res.writeHead(STATUS_CODE.OK, {
          'Content-Type': 'application/json',
        })

        const body = {
          datetime: new Date().toString(),
          path: process.cwd(),
          username,
        }

        res.write(prepareResponse(body))
        res.end()
      } else {
        res.statusCode = STATUS_CODE.UNAUTHORIZED
        res.end('Unauthorized, double check credentials and try again')
      }
    })
  } else {
    res.statusCode = STATUS_CODE.NOT_FOUND
    res.end('Not found!')
  }
}).listen(8080)
