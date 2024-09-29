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
  BaseScreen as UploadClothBaseScreen,
  CameraScreen as UploadClothCameraScreen,
  SecondaryScreen as UploadClothSecondaryScreen,
} from "../../screens/AddListing";

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

const MyListingStack = createNativeStackNavigator();
export const MyListingStackScreen = ({ navigation }) => (
  <MyListingStack.Navigator
    screenOptions={{
      ...verticalAnimation,
      headerBackTitleVisible: false,
    }}
  >
    <MyListingStack.Screen
      name="MyListing"
      options={{
        title: "My Listings",
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.replace("App")}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={MyListings}
    />
    {/* <MyListingStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    /> */}
    <MyListingStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
  </MyListingStack.Navigator>
);

const AddListingStack = createNativeStackNavigator();
export const AddListingStackScreen = ({ navigation }) => (
  <AddListingStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AddListingStack.Screen
      name="UploadClothBaseScreen"
      options={{
        title: "Add a Listing",
        headerShown: true,
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => {
              navigation.goBack();
            }}
          ></Icon.Button>
        ),
      }}
      component={UploadClothBaseScreen}
    />
    <AddListingStack.Screen
      name="UploadClothSecondaryScreen"
      options={{
        title: "More Info",
        headerShown: true,
      }}
      component={UploadClothSecondaryScreen}
    />
    <AddListingStack.Screen
      name="UploadClothCameraScreen"
      options={{
        title: "Finish",
        headerShown: true,
      }}
      component={UploadClothCameraScreen}
    />
  </AddListingStack.Navigator>
);
