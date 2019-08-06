import React from 'react'

// Import List of posts
import LinkList from '../components/LinkList'

// Import nav header
import Header from './Header'

// Home screen
export default class Home extends React.Component {
  // Set custom header
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header navigation={navigation.dangerouslyGetParent()} />
    }
  }

  // Render list of posts
  render() {
    return (
      <LinkList navigation={this.props.navigation.dangerouslyGetParent()}/>
    )
  }
}