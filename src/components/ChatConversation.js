import React from 'react'

export default class ChatMessage extends React.PureComponent {
  render() {
    return (
      <div id="chat-message-container">
        {
          this.props.conversations.map((conv, index) =>
            <div key={index} className="message-bubble">
              <p className="text-muted mb-1">{conv.sender.name}</p>
              <span>{conv.message}</span>
            </div>
          )
        }
      </div>
    )
  }
}