import React, { Component } from 'react';
import Image from 'react-native';

// import { StackNa} from 'react-native';
// import { NavigationActions } from 'react-navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import SignUp from '../SignInUp/SignUp';
import LogIn from '../SignInUp/LogIn';
import Congratulations from '../SignInUp/Congratulation';
import Tutorials from '../SignInUp/Tutorials';
import AfterSignUp from '../SignInUp/AfterSignUp';
import Agreement from '../SignInUp/Agreement';
import Home from '../SignInUp/Home';
import Search from '../SignInUp/Search';
import EnterNumber from '../SignInUp/EnterNumber';
import appLoadingPage from '../Loading/appLoadingPage'

const Stack = createStackNavigator();

const FINDER = {
    type: "finder",
    first_name:"Alice",
    last_name:"Lee",
    age:"23",
}

const REALTOR = {
    type: "realtor",
    first_name:"Brain",
    last_name:"Oh",
    age:"42",
}

function MainNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator >
            {/* <Stack.Screen name="appLoadingPage" component={ appLoadingPage } options={{headerShown: false}} /> */}
            {/* <Stack.Screen name="Terms of Service" component={ Agreement } options={{headerStyle: {backgroundColor: '#d8d8d8'}}} />
            <Stack.Screen name="LogIn" component={ LogIn }  options={{headerShown: false}} />
            <Stack.Screen name="SignUp" component={ SignUp }  options={{headerShown: false}} />
            <Stack.Screen name="EnterNumber" component={EnterNumber} options={{headerShown: false}}/>
            <Stack.Screen name="AfterSignUp" component={AfterSignUp} options={{headerShown: false}}/>
            <Stack.Screen name="Congratulations" component={Congratulations} options={{headerShown: false}} /> */}
            {/* <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/> */}

            <Stack.Screen name="City" options={{headerShown: false}}>
                {props => <Search {...props} pageType={"City"} />}
            </Stack.Screen>

            <Stack.Screen name="Skytrain" options={{headerShown: false}}>
                {props => <Search {...props} pageType={"Skytrain"} />}
            </Stack.Screen>

            <Stack.Screen name="Add School" options={{headerShown: false}}>
                {props => <Search {...props} pageType={"Add School"} />}
            </Stack.Screen>

            <Stack.Screen name="Add Work" options={{headerShown: false}}>
                {props => <Search {...props} pageType={"Add Work"} />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;