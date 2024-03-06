import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../Splash';
import MonthView from './MonthView';
import ModifyDate from './ModifyDate';

const RootStack = createNativeStackNavigator();

const RootNav = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName='splash'
                screenOptions={{ headerShown: false }}
            >
                <RootStack.Screen name='splash' component={Splash} />
                <RootStack.Screen name='monthview' component={MonthView} />
                <RootStack.Screen name='modifydate' component={ModifyDate} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
};

export default RootNav;