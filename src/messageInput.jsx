import React from 'react';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.state = {
      currMessageInput: ''
    };
  }

  handleChange(e) {
    this.setState({
      currMessageInput: e.target.value
    });
  }

  handleMessageSubmit(message, e) {
    const { submitMessage } = this.props;
    submitMessage(message);
    this.setState({
      currMessageInput: ''
    });
  }

  render() {
    const { currMessageInput } = this.state;
    return (
      <div>
        <h1>I am a mesasge input!</h1>
        <input
          type="text"
          name="Enter your message"
          value={currMessageInput}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          name="message_input"
          value="Submit your message"
          onClick={e => this.handleMessageSubmit(currMessageInput, e)}
        />
      </div>
    );
  }
}

export default MessageInput;
