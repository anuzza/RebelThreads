import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/Auth/LoginScreen";
import LandingScreen from "../../screens/LandingScreen";
import SignupScreen from "../../screens/Auth/SignupScreen";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/Profile";
import MyListings from "../../screens/MyListings/index";
import MyRequests from "../../screens/My Requests/index";
import { Ionicons as Icon } from "@expo/vector-icons";

import {
  horizontalAnimation,
  verticalAnimation,
} from "../../constants/animation";
import Saved from "../../screens/Saved";

const AuthStack = createNativeStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name="LandingScreen"
      component={LandingScreen}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={25}
            color="#fff"
            onPress={() => navigation.openDrawer()}
          ></Icon>
        ),
        headerShown: true,
      }}
    />

    <HomeStack.Screen name="MyListings" component={MyListings} />

    <HomeStack.Screen name="MyRequests" component={MyRequests} />

    <HomeStack.Screen name="Profile" component={ProfileScreen} />
    <HomeStack.Screen name="Saved" component={Saved} />
  </HomeStack.Navigator>
);
