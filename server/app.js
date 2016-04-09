import http from 'http'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaCors from 'koa-cors'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'co-body'
import graphqlHTTP from 'koa-graphql'
import chalk from 'chalk'
import schema from './schema'
import redis from './utils/redis'
import r from './utils/r'
import sign from './utils/jwt-sign-promise'
import updateSchema from './utils/update-schema'

async function session (context, next) {
  context.session = context.cookies.get('credentials')
  await next()
}

function startGraphQLServer () {
  const apiServer = new Koa()
  const router = new KoaRouter()

  router.post('/login', async (context, next) => {
    let body = await bodyParser.json(context)
    let { username, password } = body
    if (username === 'abc' && password === 'gggg') {
      let token = await sign()
      await redis.set(token, true)
      context.cookies.set('credentials', token, {
        httpOnly: false
      })
    }
    context.body = 'hihihi'
  })

  router.get('/auth', async (context) => {
    let credentials = context.cookies.get('credentials')
    let isAuth = await redis.get(credentials)
    if (isAuth) {
      context.body = 'authenticated'
    } else {
      context.status = 401
    }
  })

  router.all('/graphql', convert(graphqlHTTP((request, context) => ({
    graphiql: true,
    pretty: true,
    rootValue: {
      credentials: context.session,
      r,
      redis
    },
    formatError: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack
    }),
    schema
  }))))

  apiServer.use(session)
  apiServer.use(convert(koaCors({ credentials: true })))
  apiServer.use(logger())
  apiServer.use(router.routes())
  let server = http.createServer(apiServer.callback()).listen(8000)
  console.log(chalk.green('graphQLServer listening on port 8000'))
  return server
}

(async () => {
  await updateSchema()
  startGraphQLServer()
})()

