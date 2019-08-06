import React from 'react';
import Login from '../components/Login'

// Authentication Screen
export default class Auth extends React.Component {
    static navigationOptions = {
        title: "Login or Register",
    }

    render() {
        return (
            <Login />
        )
    }
}