const fastify = require('fastify')({logger: true})
const path = require('node:path')
const static = require('@fastify/static')

fastify.register(static, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.get('/', function (request, reply) {
  reply.sendFile('game.html')
})

fastify.listen({ port: 3001 }, (err) => {
  if (err) throw err
  console.log('Servidor Fastify escuchando en el puerto 3001');
})
