import React, { Component, PropTypes } from 'react';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import UserItem from '../components/UserItem.jsx'; 
import SelectableUserItem from '../components/SelectableUserItem.jsx'; 
import SelectableInviteListItem from '../components/SelectableUserItem.jsx'; 
import Loading from '../components/Loading.jsx'; 

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';


class InvitationPage extends Component {
  state = {
    // logged: (this.props.currentUser != undefined),
  };

  renderInviteLists() {
    let { inviteLists } = this.props

    return inviteLists.map((list) => (
        <SelectableInviteListItem 
          key={list._id} 
          list={list} 
          onSelect={this.handleListSelect} 
        />
      ));
  }

  renderFriends() {
    let { friends, invited } = this.props

    return friends.map((user) => (
        <SelectableUserItem 
          key={user._id} 
          user={user}
          onSelect={this.handleFriendSelect}
          checked={(invited.indexOf(user._id) > -1)} 
        />
      ));
  }

  handleFriendSelect = (event) => {
    console.log(event.target)

  } 

  handleListSelect = (event) => {
    console.log(event.target)
  } 

  render() {
    return (
      <div className="container">
        <form className="gather-invite" onSubmit={this.props.onDone}>
          <List>
            <Subheader>Invite Lists</Subheader>
            {this.renderInviteLists()}
            <Divider />
            <Subheader>All Friends</Subheader>
            {this.renderFriends()}
          </List>
          <div className="center-align">
            <FlatButton 
              label="Cancel"
              onTouchTap={this.props.onCancel}
              icon={ <NavigationClose /> }
            />
            <FlatButton 
              label="Done"
              type="Submit"
              icon={ <NavigationCheck /> }
            />
          </div>
        </form>
      </div>
    );
  }
}

export default InvitationPage;

InvitationPage.propTypes = {
  friends: React.PropTypes.array,
  inviteLists: React.PropTypes.array,
  // invited: React.PropTypes.object,
  // listExists: React.PropTypes.bool,
};