import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { styles } from '../styles/styles'

// Get link object
import Link from './Link'

// Define get all links query
export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

// Generate list of links
export default class LinkList extends Component {
  // Store temporary information to send to UI
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })
  
    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes
  
    store.writeQuery({ query: FEED_QUERY, data })
  }

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          // If error in fetching or loading, display messages
          if (loading) return <Text>Fetching</Text>
          if (error) return <Text>{error.toString()}</Text>

          // Get links
          const linksToRender = data.feed.links

          // Return array of links, numbered by index
          return (
            <View style={styles.container}>
              <ScrollView style={[styles.scrollView]}>
                {linksToRender.map((link, index) => {
                  return (
                    <Link index={index + 1} key={link.id} 
                          link={link} navigation={this.props.navigation}
                          updateStoreAfterVote={this._updateCacheAfterVote}/>
                  )
                }
                )}
              </ScrollView>
            </View>
          )
        }}
      </Query>
    )
  }
}