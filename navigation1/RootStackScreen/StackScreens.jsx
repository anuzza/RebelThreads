import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import ProfileScreen from "../../screens/Profile/index";
import Saved from "../../screens/Saved/index";
import MyListings from "../../screens/MyListings/index";
import MyRequests from "../../screens/My Requests/index";
import LandingScreen from "../../screens/LandingScreen";
import LoginScreen from "../../screens/Auth/LoginScreen";
import SignupScreen from "../../screens/Auth/SignupScreen";
import HomeScreen from "../../screens/HomeScreen/index";
import Icon from "react-native-vector-icons/Entypo";

export const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        statusBarColor: "#4338ca",
        headerStyle: {
          backgroundColor: "#4338ca",
        },
        headerTintColor: "#FFF",
        headerTitleAlign: "center",
        headerLeft: () => {
          return (
            <Icon
              name="menu"
              size={30}
              color="#fff"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          );
        },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="Saved" component={Saved} />
      <HomeStack.Screen name="MyListings" component={MyListings} />
      <HomeStack.Screen name="MyRequests" component={MyRequests} />
    </HomeStack.Navigator>
  );
};

export const LoginStackScreen = () => {
  const LoginStack = createNativeStackNavigator();

  return (
    <LoginStack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="Landing" component={LandingScreen} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="SignUp" component={SignupScreen} />
    </LoginStack.Navigator>
  );
};

const styles = StyleSheet.create({});
