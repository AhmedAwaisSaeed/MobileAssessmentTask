import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {_setToken} from './src/store/actions/ActionAuth';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {Register, Login, Welcome, ViewToDo} from './src/navigation/Screens';
import {
  DrawerScreens,
  store,
  persistor,
} from './src/navigation/DrawerNavigator';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

const Stack = createStackNavigator();
const MyStack = ({auth}) => {
  const checkScreen = () => {
    if (auth) {
      return 'DrawerScreens';
    } else {
      return 'Welcome';
    }
  };
  return (
    <Stack.Navigator
      initialRouteName={checkScreen()}
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'black'},
        headerShown: true,
        headerMode: 'screen',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen
        name="DrawerScreens"
        component={DrawerScreens}
        options={{
          title: 'TodoList',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ViewToDo"
        component={ViewToDo}
        options={{
          title: 'ViewToDo',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const {token} = store.getState().AuthReducer;

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token');

      if (jsonValue != null) {
        store.dispatch(_setToken(JSON.parse(jsonValue)));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    getData();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator color="white" style={{marginLeft: 8}} />}
        persistor={persistor}>
        <NavigationContainer>
          {loading === false && <MyStack auth={token} />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
