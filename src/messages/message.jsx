import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message } = this.props;
    return (
      <div className="message">
        <h2>{message.user}</h2>
        <h1>{message.message}</h1>
      </div>
    );
  }
}

export default Message;
