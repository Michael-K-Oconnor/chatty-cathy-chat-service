import React from 'react';
import axios from 'axios';
import MessageInput from './messageInput';
import Message from './message';

class MessageFeed extends React.Component {
  constructor(props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages() {
    axios.get('http://localhost:3000/messages').then(result => {
      this.setState({
        messages: result.data
      });
    });
  }

  submitMessage(message) {
    const postBody = {
      message,
      user_id: 1,
      room_id: 1
    };
    axios.post('http://localhost:3000/messages', postBody).then(result => {
      this.getMessages();
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <MessageInput submitMessage={this.submitMessage} />
        {messages.map(message => (
          <Message message={message} key={message.id} />
        ))}
      </div>
    );
  }
}

export default MessageFeed;
