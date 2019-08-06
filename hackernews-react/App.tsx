import React from 'react';

// Get persistent storage
import { AsyncStorage } from 'react-native'

// Import navigation handlers
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import NavigationService from './NavigationService';

// Import Apollo client
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'

// Import screens
import Home from './screens/Home'
import Submit from './screens/Submit'
import Auth from './screens/Auth'
import Loading from './screens/Loading'

// Import authentication key
import { AUTH_TOKEN } from './constants'

// Cache token
var token;

// Generate link to localhost 4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

// Set http headers
const authLink = setContext((_, { headers }) => {
  // If already cached, return immediately
  if (token) return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }

  // Return formatted token + header from storage
  return AsyncStorage.getItem(AUTH_TOKEN).then(userToken => {
    token = userToken
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  });
});

// Instantiate Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// Create navigators for all three screens
const HomeAppNavigator = createStackNavigator({ Feed: Home, Post: Submit }, {
  initialRouteName: "Feed",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ff6600'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
});
const AuthAppNavigator = createStackNavigator({ Signin: Auth }, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ff6600'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
});

// Create switch navigation container for home and auth navigators
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Home: HomeAppNavigator,
    Auth: AuthAppNavigator,
    Loading: Loading
  },
  {
    initialRouteName: 'Home'
  }
));

// Export default App class
export default class App extends React.Component {
  render() {
    return (
      // Wrap App in Apollo Service Object and insert navigation service
      <ApolloProvider client={client}>
        <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }} />
      </ApolloProvider>);
  }
}