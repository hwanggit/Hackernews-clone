import React from 'react';
import CreateLink from '../components/CreateLink'

// Post new link screen
export default class Submit extends React.Component {
  static navigationOptions = {
    title: 'New Post',
  };
  
  render() {
    return (
        <CreateLink />
    )
  }
}