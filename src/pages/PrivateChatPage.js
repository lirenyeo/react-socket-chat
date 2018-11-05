import React from 'react'
import {
  CardHeader,
  CardBody,
  CardFooter
 } from 'reactstrap'
 import { Link } from 'react-router-dom'

 import Socket from '../utils/socket'
 import ChatForm from '../components/ChatForm'
 import ChatConversation from '../components/ChatConversation'

export default class PrivateChatPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: []
    }

    Socket.on('RECEIVE_PRIVATE_MESSAGE', conversation => {
      this.setState({
        conversations: [...this.state.conversations, conversation]
      })
    })
  }

  sendPrivateMessage = ({message}) => {
    Socket.emit('SEND_PRIVATE_MESSAGE', {
      sender: this.props.sender,
      message,
    })
  }

  componentWillUnmount() {
    Socket.emit('LEAVE_PRIVATE_CHAT', {
      leaver: this.props.sender
    })
  }

  render() {
    const { recipient, sender } = this.props

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
            conversations={this.state.conversations}
          />
        </CardBody>
        <CardFooter className="card-footer">
          <ChatForm
            senderName={sender.name}
            sendMessage={this.sendPrivateMessage}
          />
        </CardFooter>
      </>
    )
  }
}