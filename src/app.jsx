import React from 'react';
import './styles/app.css';
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
    this.setState({
      roomId: Number(e.target.value)
    });
  };

  render() {
    const { userId, roomId } = this.state;
    return (
      <div className="container">
        <div className="UserProfile">
          <UserProfile userId={userId} />
        </div>
        <div className="MessageFeed">
          <MessageFeed className="MessageFeed" roomId={roomId} userId={userId} />
        </div>
        <div className="ChatroomSelect">
          <ChatroomSelect handleRoomSelect={this.handleRoomSelect} />
        </div>
      </div>
    );
  }
}

export default App;
