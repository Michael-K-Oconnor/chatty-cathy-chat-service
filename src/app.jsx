import React from 'react';
import UserProfile from './user/userProfile';
import ChatroomSelect from './chatroom/chatroomSelect';
import MessageFeed from './messages/messageFeed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 1,
      userId: 1
    };
  }

  handleRoomSelect = e => {
    console.log(e.target.value);
    this.setState({
      roomId: e.target.value
    });
  };

  render() {
    const { userId, roomId } = this.state;
    return (
      <div>
        <UserProfile userId={userId} />
        <ChatroomSelect handleRoomSelect={this.handleRoomSelect} />
        <MessageFeed roomId={roomId} userId={userId} />
      </div>
    );
  }
}

export default App;
