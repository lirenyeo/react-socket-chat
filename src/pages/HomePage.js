import React from 'react'
import {
  CardHeader,
  CardBody,
  CardFooter
 } from 'reactstrap'

 import Socket from '../socket'
 import ChatForm from '../components/ChatForm'
 import ChatConversation from '../components/ChatConversation'

export default class HomePage extends React.Component {

  sendPublicMessage = ({ message }) => {
    Socket.emit('BROADCAST_MESSAGE', {
      sender: this.props.user,
      message,
    })
  }

  render() {
    const { user, conversations } = this.props

    return (
      <>
        <CardHeader>
          Welcome!&nbsp;
          { user.name.length ? <span>Your name is <strong>{ user.name }</strong>.</span> : null }
        </CardHeader>
        <CardBody className="p-0">
          <ChatConversation
            conversations={ conversations }
          />
        </CardBody>
        <CardFooter className="card-footer">
          <ChatForm
            sendMessage={ this.sendPublicMessage }
            name={ user.name }
          />
        </CardFooter>
      </>
    )
  }
}