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
      headerShown: false,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu-outline"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
    />

    <HomeStack.Screen name="My Listings" component={MyListings} />

    <HomeStack.Screen name="My Requests" component={MyRequests} />

    <HomeStack.Screen name="Profile" component={ProfileScreen} />
  </HomeStack.Navigator>
);
