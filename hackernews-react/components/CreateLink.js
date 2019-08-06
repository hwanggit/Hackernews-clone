import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { styles } from '../styles/styles'
import NavigationService from '../NavigationService'
import { FEED_QUERY } from './LinkList'

// Define post function
const POST_MUTATION = gql`
  mutation PostMutation($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      url
      description
    }
  }
`

// Create post function
export default class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    }

    // Generate input boxes for posting links
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <TextInput style={styles.createLinkDesc}
                        multiline={true}
                        value={this.state.description}
                        onChangeText={text => this.setState({ description: text })}
                        placeholder="A description for the link"
                    />
                    <TextInput style={styles.createLinkUrl}
                        value={this.state.url}
                        onChangeText={text => this.setState({ url: text })}
                        placeholder="The URL for the link"
                    />
                </View>
                <Mutation mutation={POST_MUTATION} variables={this.state} onCompleted={() => NavigationService.navigate('Loading')}
                    /*update={(store, { data: { post } }) => {
                        const data = store.readQuery({ query: FEED_QUERY })
                        data.feed.links.unshift(post)
                        store.writeQuery({
                            query: FEED_QUERY,
                            data
                        })
                    }}*/>
                    {postMutation =>
                        <TouchableOpacity style={styles.submit} onPress={postMutation}>
                            <Text style={{ color: 'white', fontSize: 17 }}>Submit</Text>
                        </TouchableOpacity>
                    }
                </Mutation>
            </View>
        )
    }
}