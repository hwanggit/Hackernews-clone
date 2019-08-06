import { NavigationActions } from 'react-navigation';

// Create global navigator object
let _navigator;

// Set the highest level navigator
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

// Navigate to specified screen
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them
export default {
  navigate,
  setTopLevelNavigator,
};