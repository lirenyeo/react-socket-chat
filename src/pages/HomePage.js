import React from 'react'
import {
  CardHeader,
  CardBody,
  CardFooter
 } from 'reactstrap'

 import Socket from '../utils/socket'
 import ChatForm from '../components/ChatForm'
 import ChatConversation from '../components/ChatConversation'

export default class HomePage extends React.Component {

  sendPublicMessage = ({ message }) => {
    Socket.emit('BROADCAST_MESSAGE', {
      sender: this.props.sender,
      message,
    })
  }

  render() {
    const { sender, conversations } = this.props

    return (
      <>
        <CardHeader>
          Welcome!&nbsp;
          { sender.name.length ? <span>Your name is <strong>{ sender.name }</strong>.</span> : null }
        </CardHeader>
        <CardBody className="p-0">
          <ChatConversation
            conversations={conversations}
          />
        </CardBody>
        <CardFooter className="card-footer">
          <ChatForm
            sendMessage={this.sendPublicMessage}
            senderName={sender.name}
          />
        </CardFooter>
      </>
    )
  }
}
