// install react-navigation
//TODO: import four screens
import HomeScreen from "./screens/HomeScreen";
import EditContact from "./screens/EditContact";
import ViewContact from "./screens/ViewContact";
import AddNewContact from "./screens/AddNewContact";
//TODO: import firebase
import * as firebase from "firebase";
// set up react navigation
import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Add: { screen: AddNewContact },
    View: { screen: ViewContact },
    Edit: { screen: EditContact }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#B83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

//TODO: Initialize Firebase

var config = {
  apiKey: "AIzaSyACg_DHa60ID5N-_z2aT2srT-JVBjauZ0A",
  authDomain: "reactnativeproject-5fa7f.firebaseapp.com",
  databaseURL: "https://reactnativeproject-5fa7f.firebaseio.com",
  projectId: "reactnativeproject-5fa7f",
  storageBucket: "reactnativeproject-5fa7f.appspot.com",
  messagingSenderId: "192317314835"
};
firebase.initializeApp(config);

//FirebaseTODO create firebase real-time database with rules

// {
//   "rules": {
//     ".read": true,
//     ".write": true
//   }
// }
export default App;
