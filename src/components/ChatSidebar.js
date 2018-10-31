import React from 'react'
import {
  ListGroup,
  ListGroupItem,
 } from 'reactstrap'

export default ({users}) => (
  <div id="user-list">
    <ListGroup>
      {
        users.map(({name, id}) =>
          <ListGroupItem key={id}>
            <span className="oi oi-person mr-2"></span>{name}
          </ListGroupItem>
        )
      }
    </ListGroup>
  </div>
)