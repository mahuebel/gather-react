import React, { Component, PropTypes } from 'react';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import UserItem from '../components/UserItem.jsx'; 
import SelectableUserItem from '../components/SelectableUserItem.jsx'; 
import SelectableInviteListItem from '../components/SelectableInviteListItem.jsx'; 
import Loading from '../components/Loading.jsx'; 

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';


class InvitationPage extends Component {
  state = {
    // logged: (this.props.currentUser != undefined),
    search: ''
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  renderInviteLists() {
    let { inviteLists } = this.props
    let { search } = this.state

    let filteredLists = inviteLists.filter(
      (list) => {
        return (list.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      }
    )

    return filteredLists.map((list) => (
        <SelectableInviteListItem 
          key={list._id} 
          list={list} 
          onSelect={this.handleListSelect} 
        />
      ));
  }

  renderFriends() {
    let { friends, invited } = this.props
    let { search } = this.state

    let filteredFriends = friends.filter(
      (user) => {
        return (user.profile ? user.profile.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      }
    )

    return filteredFriends.map((user) => (
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
    let { search } = this.state
    return (
      <div className="container">
        <TextField
            hintText="Search..."
            fullWidth={true}
            value={search}
            onChange={this.handleSearch}
        />
        <form className="gather-invite" onSubmit={this.props.onDone}>
          <List>
            <Subheader>Groups</Subheader>
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
  currentUser: React.PropTypes.object,
  inviteLists: React.PropTypes.array,
  // invited: React.PropTypes.object,
  // listExists: React.PropTypes.bool,
};