import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
 } from 'reactstrap'

import Socket from './socket'
import ChatForm from './components/ChatForm'
import ChatConversation from './components/ChatConversation'
import ChatSidebar from './components/ChatSidebar'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      conversations: [],
      allUsers: [],
    }

    // Tells server a new user has joined!
    Socket.emit('NEW_USER')

    // Listen to server for a random generated username
    Socket.on('GET_USERNAME', name => {
      this.setState({name})
    })

    // Listen to server for user list update whenever someone joins
    Socket.on('UPDATE_USER_LIST', allUsers => {
      this.setState({allUsers})
    })

    // Listen to server for new message (including your own message)
    Socket.on('RECEIVE_BROADCAST', newMessage => {
      this.setState({
        conversations: [...this.state.conversations, newMessage]
      })
      // Scroll conversation to bottom whenever a new message comes in
      // Preferable way is to use 'refs' prop in the chat-message-container
      document.getElementById('chat-message-container').scrollTop = 10000
    })
  }


  render() {
    return (
      <Container>
        <Card className="mt-3">
          <CardHeader>
            Welcome!&nbsp;
            {
              this.state.name.length
                ? <span>Your name is <strong>{this.state.name}</strong>.</span>
                : null

            }
          </CardHeader>
          <CardBody className="p-0">
            <Row noGutters>
              <Col xs={9}>
                <ChatConversation conversations={this.state.conversations} />
              </Col>
              <Col xs={3}>
                <ChatSidebar users={this.state.allUsers} />
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="card-footer">
            <ChatForm name={this.state.name}/>
          </CardFooter>
        </Card>
      </Container>
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