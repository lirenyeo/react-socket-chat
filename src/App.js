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
import Socket from './utils/socket'
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
      conversations: [],
      /* conversation object structure:
         {
           sender: {
             id: '', name: ''
           },
           message: {
             type: 'chat' || 'notification',
             text: '',
           }
         }
       */
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
    Socket.on('RECEIVE_BROADCAST', conversation => {
      this.setState({
        conversations: [...this.state.conversations, conversation]
      })
      // Scroll conversation to bottom whenever a new message comes in
      // Preferable way is to use 'refs' prop in the chat-message-container
      document.getElementById('chat-message-container').scrollTop = 10000
    })
  }

  render() {
    const { user, users, conversations } = this.state
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
                        sender={user}
                        conversations={conversations}
                      />
                  }
                />
                <Route
                  path="/pm/:recipientId"
                  render={
                    ({match}) =>
                      <PrivateChatPage
                        sender={user}
                        recipient={users.find(u => u.id === match.params.recipientId)}
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