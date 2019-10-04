// Require the framework and instantiate it
const fastify = require('fastify')
const logger = require('./logger')
const sequelize = require('./db-connect')

const server = fastify({ logger })

// Declare a route
server.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

server.get('/special', (request, reply) => {
  // const childLogger = logger.child({ module: 'special' })
  // childLogger.info('Hi from special logger!')
  request.log.info('Hi from logger using request log')
  reply.send({ hello: 'special' })
})

// Run the server!
server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  sequelize
    .authenticate() // npx sequelize db:create must create db before you can connect
    .then(() => {
      server.log.info('Connection has been established successfully.')
    })
    .catch((dbError) => {
      server.log.error('Unable to connect to the database:', dbError)
    })
  server.log.info(`server listening on ${address}`)
})
