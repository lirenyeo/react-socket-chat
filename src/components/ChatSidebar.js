import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
 } from 'reactstrap'

import Socket from '../utils/socket'


class ChatSidebar extends React.Component {
  startPrivateChat = ({name, id}) => {
    Socket.emit('START_PRIVATE_CHAT', {
      sender: this.props.currentUser,
      recipient: {id, name}
    })
    this.props.history.push(`/pm/${id}`)
  }

  render() {
    const { currentUser, users } = this.props
    return (
      <>
        <div id="user-list-header">
          <span>Active Users ({ users.length })</span>
        </div>
        <div id="user-list">
          <ListGroup>
            {
              users.map(({name, id}) =>
                <ListGroupItem key={id}>
                  {
                    currentUser.id === id
                      ? <span><span className="oi oi-person mr-2"></span>{name}(You)</span>
                      : <a href="#" onClick={() => {this.startPrivateChat({name, id})}} key={id}>
                          <span className="oi oi-person mr-2"></span>{name}
                        </a>
                  }
                </ListGroupItem>
              )
            }
          </ListGroup>
        </div>
      </>
    )
  }
}

export default withRouter(ChatSidebar)