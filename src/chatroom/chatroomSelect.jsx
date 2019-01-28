import React from 'react';
import axios from 'axios';
import ChatroomInput from './chatroomInput';

class ChatroomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms = () => {
    axios.get(`${window.location.origin}/api/chatrooms`).then(result => {
      this.setState({
        rooms: result.data
      });
    });
  };

  submitRoom = roomname => {
    const postBody = {
      roomname
    };
    axios.post(`${window.location.origin}/api/chatrooms`, postBody).then(() => {
      this.getRooms();
    });
  };

  render() {
    const { rooms } = this.state;
    return (
      <div>
        <ChatroomInput submitRoom={this.submitRoom} />
        <select>
          {rooms.map(room => (
            <option key={room.roomId} value={room.roomId}>
              {room.roomname}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ChatroomSelect;
