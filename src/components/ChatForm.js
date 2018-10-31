import React from 'react'
import Socket from '../socket'

export default class ChatForm extends React.Component {
  state= {
    message: 'Hello socket.io! How are you doing?',
  }

  _onTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _onFormSubmit = e => {
    e.preventDefault()
    const { message } = this.state
    const { name } = this.props
    Socket.emit('BROADCAST_MESSAGE', {
      name,
      message,
    })
  }

  render() {
    return(
      <form className="form-row align-items-center" onSubmit={this._onFormSubmit}>
        <div className="input-group">
          {
            this.props.name.length
              ? <div className="input-group-prepend">
                  <div className="input-group-text">
                    {this.props.name}:
                  </div>
                </div>
              : null
          }
          <input
            className="form-control"
            type="text"
            name="message"
            value={this.state.message}
            onChange={this._onTextInput}
          />
          <span className="input-group-btn">
            <input
              className="btn btn-info"
              type="submit"
              value="Send"
            />
          </span>
        </div>
      </form>
    )
  }
}