import React from 'react';
import UserProfile from './user/userProfile';
import ChatroomSelect from './chatroom/chatroomSelect';
import MessageFeed from './messages/messageFeed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onRoomSelect = this.onRoomSelect.bind(this);
    this.state = {
      roomId: 1,
      userId: 1
    };
  }

  onRoomSelect(e) {
    console.log(e.target);
    this.setState({
      roomId: e.target.value
    });
  }

  render() {
    const { userId, roomId } = this.state;
    return (
      <div>
        <UserProfile />
        <ChatroomSelect onRoomSelect={this.onRoomSelect} />
        <MessageFeed roomId={roomId} userId={userId} />
      </div>
    );
  }
}

export default App;
