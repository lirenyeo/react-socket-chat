const express = require('express')
const socket = require('socket.io')
const Chance = require('chance')
const Sentencer = require('sentencer')

const app = express()
const chance = new Chance()

let users = []

server = app.listen(8080, function() {
  console.log('server is running on port 8080...')
})

io = socket(server)

io.on('connection', (socket) => {

  socket.on('NEW_USER', () => {
    const randomName = Sentencer.make("{{ adjective }} {{ noun }}")
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')

    users.push({
      id: socket.id,
      name: randomName,
    })

    socket.emit('GET_USERNAME', randomName)
    io.emit('UPDATE_USER_LIST', users)
  })

  socket.on('BROADCAST_MESSAGE', data => {
    io.emit('RECEIVE_BROADCAST', data);
  })

  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id)
    io.emit('UPDATE_USER_LIST', users)
  })
})