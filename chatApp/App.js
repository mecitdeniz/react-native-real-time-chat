import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login';
import Chat from './components/Chat';

const MainStack = createStackNavigator();

function App () {
  return(
    <NavigationContainer>
      <MainStack.Navigator headerMode="float">
        <MainStack.Screen name="Login" component={Login}/>
        <MainStack.Screen name="Chat" component={Chat}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
