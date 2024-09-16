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

export const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="MyListings" component={MyListings} />
      <Stack.Screen name="MyRequests" component={MyRequests} />
      <Stack.Screen
        name="LoginStack"
        component={LoginStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const LoginStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="LoginHome" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
