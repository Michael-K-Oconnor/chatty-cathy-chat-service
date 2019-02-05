import React from 'react';
import PropTypes from 'prop-types';
import '../styles/app.css';
import axios from 'axios';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.getUserInfo();
  };

  getUserInfo = () => {
    const { userId } = this.props;
    axios.get(`${window.location.origin}/api/users/${userId}`).then(result => {
      this.setState(result.data[0]);
    });
  };

  render() {
    const { username, handle, numMessages, profilePic } = this.state;
    return (
      <div className="userProfile">
        <img className="profileImg" src={profilePic} alt={username} />
        <div>{username}</div>
        <div>{handle}</div>
        <div>Number of posts = {numMessages}</div>
      </div>
    );
  }
}

export default UserProfile;

UserProfile.propTypes = {
  userId: PropTypes.number
};
