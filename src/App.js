import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
 } from 'reactstrap'

import HomePage from './pages/HomePage'
import PrivateChatPage from './pages/PrivateChatPage'
import ChatSidebar from './components/ChatSidebar'
import Socket from './socket'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        id: null,
        name: '',
      },
      users: [],
      publicConversations: [],
      privateConversations: {},
    }

    // Tells server a new user has joined!
    Socket.emit('NEW_USER')

    // Listen to server for a random generated user (with name and socketId)
    Socket.on('GET_USER_INFO', user => {
      this.setState({user})
    })

    // Listen to server for user list update whenever someone joins
    Socket.on('UPDATE_USER_LIST', users => {
      this.setState({users})
    })

    // Listen to server for new message (including your own message)
    Socket.on('RECEIVE_BROADCAST', newMessage => {
      this.setState({
        publicConversations: [...this.state.publicConversations, newMessage]
      })
      // Scroll conversation to bottom whenever a new message comes in
      // Preferable way is to use 'refs' prop in the chat-message-container
      document.getElementById('chat-message-container').scrollTop = 10000
    })

    // Listen to private message
    Socket.on('RECEIVE_PM', ({sender, recipient, message}) => {
      const { privateConversations, user } = this.state
      const key = sender.id === user.id ? recipient.id : sender.id
      this.setState({
        privateConversations: {
          ...privateConversations,
          [key]: [
            ...(privateConversations[key] || []),
            { message, sender },
          ]
        }
      })
      document.getElementById('chat-message-container').scrollTop = 10000
    })
  }

  _sendPrivateMessage = ({ recipient, message }) => {
    Socket.emit('SEND_PM', {
      sender: this.state.user,
      recipient,
      message,
    })
  }

  render() {
    const { user, users, publicConversations, privateConversations } = this.state
    return (
      <Router>
        <Container>
          <Card className="mt-3">
            <Row noGutters>
              <Col xs={9}>
                <Route
                  exact
                  path="/"
                  render={
                    () =>
                      <HomePage
                        user={user}
                        conversations={publicConversations}
                      />
                  }
                />
                <Route
                  path="/pm/:id"
                  render={
                    props =>
                      <PrivateChatPage
                        sender={user}
                        conversations={privateConversations}
                        recipient={users.find(u => u.id === props.match.params.id)}
                      />
                  }
                />
              </Col>

              <Col xs={3} className="left-border">
                <ChatSidebar currentUser={user} users={users} />
              </Col>
            </Row>
          </Card>
        </Container>
      </Router>
    )
  }
}

export default App


/* Without Reactstrap components:

<div className="container">
  <div className="card mt-3">
    <div className="card-header">Welcome! Your username is <strong>Spirit Panda</strong>.</div>
    <div className="card-body p-0">
      <div className="row no-gutters">
        <div className="col-xs-9">
          <ChatConversation conversations={this.state.conversations} />
        </div>
        <div className="col-xs-3">
          <div id="user-list">
            <ul className="list-group">
              {
                new Array(20).fill().map((_, i) =>
                  <li className="list-group-item">
                    <span className="oi oi-person mr-2"></span>Thick Crocodile 1
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="card-footer">
      <ChatForm />
    </div>
  </div>
</div>

*/