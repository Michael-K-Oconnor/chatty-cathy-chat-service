import React from 'react';
import PropTypes from 'prop-types';

class ChatroomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currRoomInput: ''
    };
  }

  handleChange = e => {
    this.setState({
      currRoomInput: e.target.value
    });
  };

  handleRoomSubmit = roomname => {
    const { submitRoom } = this.props;
    submitRoom(roomname);
    this.setState({
      currRoomInput: ''
    });
  };

  render() {
    const { currRoomInput } = this.state;
    return (
      <div>
        <input
          type="text"
          name="Enter your message"
          value={currRoomInput}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          name="message_input"
          value="Create New Chatroom"
          onClick={e => this.handleRoomSubmit(currRoomInput, e)}
        />
      </div>
    );
  }
}

export default ChatroomInput;

ChatroomInput.propTypes = {
  submitRoom: PropTypes.func
};
