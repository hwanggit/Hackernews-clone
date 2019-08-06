import React from 'react'
import { TouchableOpacity, Text, View, AsyncStorage } from 'react-native'
import { styles } from '../styles/styles'
import { AUTH_TOKEN } from '../constants'
import NavigationService from '../NavigationService';

// Nav header for home screen
export default class Header extends React.Component {
    // Set the current state of user authentication
    state = {
        authenticated: this.props.navigation.getParam('user_token')
    }

    // Remove token and set state to null
    async removeToken() {
        await AsyncStorage.removeItem(AUTH_TOKEN)
        NavigationService.navigate('Loading')
    }

    // Generate the header
    render() {
        return (
            <View style={styles.navbar}>
                <Text style={styles.header}>Hacker News | </Text>
                {this.state.authenticated ? (<TouchableOpacity onPress={() => {
                    // Remove token and set authentication to null
                    this.removeToken()
                }}><Text style={styles.header2}>Logout</Text>
                </TouchableOpacity>) : (<TouchableOpacity onPress={() => {
                    NavigationService.navigate('Auth')
                }}>
                    <Text style={styles.header2}>Login</Text>
                </TouchableOpacity>)}
                {this.state.authenticated && (<TouchableOpacity style={styles.postButton} onPress={() => {NavigationService.navigate('Post')}}><Text style={styles.header2}>New Post</Text></TouchableOpacity>)}
            </View>
        )
    }
}