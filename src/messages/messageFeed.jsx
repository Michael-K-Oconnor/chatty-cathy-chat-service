import React from 'react';
import axios from 'axios';
import MessageInput from './messageInput';
import Message from './message';

class MessageFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount = () => {
    this.getMessages();
  };

  getMessages = () => {
    const { roomId } = this.props;
    axios
      .get(`${window.location.origin}/api/messages`, {
        params: { roomId }
      })
      .then(result => {
        this.setState({
          messages: result.data
        });
      });
  };

  submitMessage = message => {
    const { userId, roomId } = this.props;
    const postBody = {
      message,
      userId,
      roomId
    };
    axios.post(`${window.location.origin}/api/messages`, postBody).then(() => {
      this.getMessages();
    });
  };

  render() {
    const { messages } = this.state;
    return (
      <div>
        <MessageInput submitMessage={this.submitMessage} />
        {messages.map(message => (
          <Message message={message} key={message.messageId} />
        ))}
      </div>
    );
  }
}

export default MessageFeed;
