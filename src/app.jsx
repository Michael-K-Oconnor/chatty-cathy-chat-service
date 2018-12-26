import React from 'react';
import UserProfile from './userProfile';
import ChatroomSelect from './chatroomSelect';

import MessageFeed from './messageFeed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currChatroom: 'Lobby'
    };
  }

  render() {
    const { currChatroom } = this.state;
    return (
      <div>
        <UserProfile />
        <ChatroomSelect />
        <MessageFeed chatroom={currChatroom} />
      </div>
    );
  }
}

export default App;
