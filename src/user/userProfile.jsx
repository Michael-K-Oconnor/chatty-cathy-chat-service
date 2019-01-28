import React from 'react';
import axios from 'axios';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.getUserInfo();
  };

  getUserInfo = () => {};

  render() {
    return (
      <div>
        <h1>I am an user profile</h1>
      </div>
    );
  }
}

export default UserProfile;
