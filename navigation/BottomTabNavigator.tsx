/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext  } from 'react';
import AppContext from '../global/AppContext'


import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import InfoScreen from '../screens/InfoScreen';
import HostScreen from '../screens/HostScreen';

import UploadScreen from '../screens/UploadScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Server"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-download-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-cog-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();







function TabOneNavigator() {

  const userSettings:any = useContext(AppContext);


  const navigation = useNavigation();
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{headerShown: false}}
      />
      <TabOneStack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          headerTitle: 'Upload Torrent',
        }}
      />
      <TabOneStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          headerTitle: 'Torrent',
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Settings"
        component={TabTwoScreen}
        options={{ headerTitle: 'Settings' }}
      />
       <TabTwoStack.Screen
        name="HostScreen"
        component={HostScreen}
        options={{ headerTitle: 'Add Host' }}
      />
    </TabTwoStack.Navigator>
  );
}
