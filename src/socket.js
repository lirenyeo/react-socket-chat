import io from 'socket.io-client'
const Socket = io('localhost:8080')

export default Socket

// export function receiveMessage(callback) {
//   socket.on('RECEIVE_MESSAGE', callback)
// }

// export function sendMessage(conversation) {
//   socket.emit('SEND_MESSAGE', conversation)
// }

// export function subscribeToGroupChat(callback, receiveUserNameCallback) {
//   socket.on('broadcastMessage', (message) => callback(message))
//   socket.on('receiveUserName', (userName) => { receiveUserNameCallback(userName) })
//   socket.emit('subscribeToGroupChat')
// }

// export function subscribeToPrivateChats(callback) {
//   socket.on('privateBroadcastMessage', (message) => { callback(message) })
// }

// export function subscribeToAvailableUsers(callback) {
//   socket.on('availableUsers', (users) => callback(users))
// }

// export function sendPrivateMessage(message) {
//   socket.emit('privateBroadcastMessage', message)
// }