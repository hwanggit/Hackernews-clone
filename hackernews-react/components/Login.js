import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { styles } from '../styles/styles'

// Import mutation function from apollo
import { Mutation } from 'react-apollo'

// Import auth key
import { AUTH_TOKEN } from '../constants'

// Import navigation service
import NavigationService from '../NavigationService'

// Import graphQL parser object
import gql from 'graphql-tag'

// Define mutation requests for sign up and login
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
// Login function
export default class Login extends Component {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: '',
        errormsg: ''
    }

    // Generate login function
    render() {
        const { login, email, password, name, errormsg } = this.state
        return (
            <View style={styles.authContainer}>
                <View style={styles.authInput}>
                    {!login && (
                        <TextInput style={styles.authText}
                            onChangeText={text => this.setState({ name: text })}
                            placeholder="Enter Your Name"
                        />
                    )}
                    <TextInput style={styles.authText}
                        onChangeText={text => this.setState({ email: text })}
                        placeholder="Enter Your Email Address"
                    />
                    <TextInput style={styles.authText}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder={login ? "Your Password" : "Choose A Safe Password"}
                        secureTextEntry={true}
                    />
                </View>
                <View style={login ? styles.authButtonsBefore : styles.authButtonsAfter}>
                    <Text style={styles.authTextError}>{errormsg}</Text>
                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{ email, password, name }}
                        onCompleted={data => this._confirm(data)}
                        onError={error => this._alert(error)}>
                        {mutation => (
                            <TouchableOpacity style={styles.authSubmit} onPress={() => {this._handleError(mutation)}}>
                                <Text style={styles.authTextSubmit}>{login ? 'Login' : 'Sign Up'}</Text>
                            </TouchableOpacity>
                        )}
                    </Mutation>
                    <View>
                        <TouchableOpacity onPress={() => this.setState({ login: !login, errormsg: '' })}>
                            <Text style={styles.authTextSecond}>{login
                                ? 'Need to create an account?'
                                : 'Already have an account?'}</Text></TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }

    // Send data to storage, and navigate to loading screen
    _confirm = async data => {
        // Extract token from data
        const { token } = this.state.login ? data.login : data.signup

        // Set user token 
        await AsyncStorage.setItem(AUTH_TOKEN, token)

        // Navigate to loading screen
        NavigationService.navigate('Loading')
    }

    // Alert user if failed
    _alert = (error) => {
        if (error.toString().includes('=')) {
            this.setState({ errormsg: 'User already exists!' })
        }
        else if (error.toString().includes('found')) {
            this.setState({ errormsg: error.toString().replace('Error: GraphQL error: ', '') + '!' })
        }
        else {
            this.setState({ errormsg: 'Wrong password!' })
        }
    }

    // Handle user input errors
    _handleError(mutation_func) {
        if (this.state.login) {
            (this.state.email === '') ? this.setState({ errormsg: "Invalid email address!" }) : mutation_func()
        }
        else {
            (this.state.email === '' || this.state.password === '' || this.state.name === '') ?
                this.setState({ errormsg: "Please complete form!"}) : mutation_func()
        }
    }
}