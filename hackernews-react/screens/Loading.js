import React from 'react'

// Import loading materials and persistent storage
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';

// Import authentication key
import { AUTH_TOKEN } from '../constants'

// Loading Screen
export default class Loading extends React.Component {
    constructor(props) {
        super(props)

        // Load Token
        this.loadTokenAsync()
    }

    // Retrieve user token from local storage and send as navigation param
    loadTokenAsync = async () => {
        // Get token from persistent storage
        const userToken = await AsyncStorage.getItem(AUTH_TOKEN);

        // If token available, navigate to Home, else to authorization screen
        this.props.navigation.navigate(userToken ? 'Home' : 'Auth', { user_token: userToken });
    };

    // Render loading content
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}