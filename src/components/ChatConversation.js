import React from 'react'
import { withRouter } from 'react-router-dom';
import Socket from '../utils/socket'

class ChatMessage extends React.Component {
  acceptChat = ({roomName, initiator}) => {
    this.props.history.push(`/pm/${initiator.id}`)
    Socket.emit('ACCEPT_PRIVATE_CHAT', {
      roomName,
      initiator,
    })
  }

  render() {
    return (
      <div id="chat-message-container">
        {
          this.props.conversations && this.props.conversations.map((conv, index) =>
            <div key={index}>
              {
                conv.message.type === 'notification'
                  ? <div className="system-notification">
                      <p className="m-0 py-2">{conv.message.text}</p>
                      { conv.message.action &&
                        <button
                          onClick={() => {
                            this.acceptChat(conv.message.action)
                          }}
                        >
                          Accept Now
                        </button>
                      }
                    </div>
                  : <div className="message-bubble">
                      <p className="text-muted mb-1">{conv.sender.name}</p>
                      <span>{conv.message.text}</span>
                    </div>
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default withRouter(ChatMessage)