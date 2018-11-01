import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
 } from 'reactstrap'


export default class ChatSidebar extends React.Component {
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
                      : <Link to={`/pm/${id}`} key={id}>
                          <span className="oi oi-person mr-2"></span>{name}
                        </Link>
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
