import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import InitScreen from './src/screens/InitScreen';
import FloatingButtonScreen from './src/screens/FloatingButtonScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          // headerShown: false,
          headerTintColor: '#9CCA63',
        }}
        name="Init"
        component={InitScreen}
      />
      <Stack.Screen
        name="Floating"
        options={{
          headerShown: false,
        }}
        component={FloatingButtonScreen}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
