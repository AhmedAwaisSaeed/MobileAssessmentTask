import React, {useState, useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, resetStore} from '../../src/store/configureStore';
import {BASE_URL} from '../utils/ConstantClass';
import {ToDoList, CreateToDo, ViewToDo} from '../navigation/Screens';

const Drawer = createDrawerNavigator();
const {store, persistor} = configureStore();

const clearAll = navigation => {
  logout(navigation);
};

const logout = navigation => {
  fetch(BASE_URL + 'logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + store.getState().AuthReducer.token,
    },
    body: JSON.stringify(store.getState().AuthReducer.token),
  })
    //Sending the currect offset with get request
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson?.success) {
        clearAsyncStorage(navigation);
        alert('Logout Successfully');
      } else {
        alert('not logout');
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const clearAsyncStorage = async navigation => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
  resetStore();
  navigation.reset({
    index: 0,
    routes: [{name: 'Welcome'}],
  });
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem label="Logout" onPress={() => clearAll(props.navigation)} />
    </DrawerContentScrollView>
  );
}

function DrawerScreens() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: '70%',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="ToDoList">
      <Drawer.Screen name="ToDoList" component={ToDoList} />
      <Drawer.Screen name="CreateToDo" component={CreateToDo} />
      <Drawer.Screen name="ViewToDo" component={ViewToDo} />
    </Drawer.Navigator>
  );
}

export {DrawerScreens, store, persistor};
