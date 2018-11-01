import React from 'react'

export default class ChatForm extends React.Component {
  state= {
    message: 'Hello socket.io! How are you doing?',
  }

  onTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.sendMessage({
      recipient: this.props.recipient,
      message: this.state.message,
    })
  }

  render() {
    // console.log('render ChatForm!', this.props.sendMessage)
    return (
      <form className="form-row align-items-center" onSubmit={this.onFormSubmit}>
        <div className="input-group">
          {
            this.props.name && this.props.name.length
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
            onChange={this.onTextInput}
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