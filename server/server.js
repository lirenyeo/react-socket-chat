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

    const newUser = {
      id: socket.id,
      name: randomName,
    }

    users.push(newUser)
    socket.emit('GET_USER_INFO', newUser)
    io.emit('UPDATE_USER_LIST', users)
  })

  socket.on('BROADCAST_MESSAGE', data => {
    io.emit('RECEIVE_BROADCAST', data);
  })

  socket.on('SEND_PM', data => {
    console.log(data)
    socket.emit('RECEIVE_PM', data)
    io.to(data.recipient.id).emit('RECEIVE_PM', data)
  })

  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id)
    io.emit('UPDATE_USER_LIST', users)
  })
})