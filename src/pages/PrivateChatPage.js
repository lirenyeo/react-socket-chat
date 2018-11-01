import React from 'react'
import {
  CardHeader,
  CardBody,
  CardFooter
 } from 'reactstrap'
 import { Link } from 'react-router-dom'

 import Socket from '../socket'
 import ChatForm from '../components/ChatForm'
 import ChatConversation from '../components/ChatConversation'

export default class PrivateChatPage extends React.Component {

  sendPrivateMessage = ({ recipient, message }) => {
    Socket.emit('SEND_PM', {
      sender: this.props.sender,
      recipient,
      message,
    })
  }

  render() {
    const { recipient, sender, conversations } = this.props

    return (
      <>
        <CardHeader className="bg-dark text-white">
          <Link to="/">
            <span className="oi oi-arrow-left mr-1"></span>Back&nbsp;&nbsp;&nbsp;
          </Link>
          {
            recipient
              ? `Private chat with ${recipient.name}`
              : `This user ID does not exist`
          }
        </CardHeader>
        <CardBody className="p-0">
          <ChatConversation
            conversations={ conversations[recipient.id] || []}
          />
        </CardBody>
        <CardFooter className="card-footer">
          <ChatForm
            name={sender.name}
            recipient={recipient}
            sendMessage={this.sendPrivateMessage}
          />
        </CardFooter>
      </>
    )
  }
}