import React, { Component } from 'react'
import { Text, View, Linking } from 'react-native';
import { styles } from '../styles/styles'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
//import { timeDifferenceForDate } from '../src/utils'

// Allow voting feature
const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`
// Link object
export default class Link extends Component {
    // Set the current state of user authentication
    state = {
        authenticated: this.props.navigation.getParam('user_token')
    }

    render() {
        return (
            <View style={[styles.post]}>
                <Text style={styles.postText} >{this.props.index}.
                    {this.state.authenticated && (
                        <Mutation mutation={VOTE_MUTATION} 
                                  variables={{ linkId: this.props.link.id }}
                                  update={(store, { data: { vote } }) =>
                                  this.props.updateStoreAfterVote(store, vote, this.props.link.id)}>

                            {voteMutation => (
                              <Text onPress={voteMutation}> ▲ </Text>
                            )}
                        </Mutation>
                    )}{this.props.link.description}
                    <Text style={styles.postUrl} onPress={() => Linking.openURL('https://' + this.props.link.url)}> ({this.props.link.url})</Text>
                </Text>
                <Text style={{color: 'grey'}}>
                    {this.props.link.votes.length} votes | by{' '}
                    {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'}{' '}
                    {/*{timeDifferenceForDate(this.props.link.createdAt)}*/}
                    some time ago
                </Text>
            </View>
        )
    }
}