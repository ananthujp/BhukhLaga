
import React from 'react';
import GlobalStyle from './globalstyles';
import { SafeAreaView,StatusBar} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';
import {Home, Restaurant,OrderDelivery,AddCategory} from "./screens"
import Tabs from './navigation/tabs'
import {COLORS} from './constants'
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const App =() =>{
  const [loaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
  });
  if (!loaded) {
    return null;
  }
  
        
  return (
    <SafeAreaView style={GlobalStyle.droidSafeArea}>
    <NavigationContainer>
      
      <StatusBar backgroundColor={COLORS.lightGray4} barStyle="dark-content" />

      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Home"}  
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
export default App;