import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message } = this.props;
    return (
      <div>
        <h1>{message.message}</h1>
      </div>
    );
  }
}

export default Message;
