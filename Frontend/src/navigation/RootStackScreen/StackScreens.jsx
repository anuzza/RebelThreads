import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/Auth/LoginScreen";
import LandingScreen from "../../screens/LandingScreen";
import SignupScreen from "../../screens/Auth/SignupScreen";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/Profile";
import EditProfileScreen from "../../screens/EditProfileScreen";
import MyListings from "../../screens/MyListings/index";
import DetailsScreen from "../../screens/DetailsScreen";
import MyRequests from "../../screens/My Requests/index";
import BookmarksScreen from "../../screens/BookmarksScreen";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  BaseScreen as UploadClothBaseScreen,
  CameraScreen as UploadClothCameraScreen,
  SecondaryScreen as UploadClothSecondaryScreen,
} from "../../screens/AddListing";
import { BaseScreen as AddRequestScreen } from "../../screens/AddRequest";

import {
  horizontalAnimation,
  verticalAnimation,
} from "../../constants/animation";
import RequestedScreen from "../../screens/RequestedFeed";

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
        headerShown: false,
      }}
    />
    <HomeStack.Screen name="Details" component={DetailsScreen} />

    <HomeStack.Screen name="Profile" component={ProfileScreen} />
  </HomeStack.Navigator>
);

const MyListingStack = createNativeStackNavigator();
export const MyListingStackScreen = ({ navigation }) => (
  <MyListingStack.Navigator
    screenOptions={{
      ...verticalAnimation,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
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
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.replace("App")}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={MyListings}
    />
    <MyListingStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
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

const FeedStack = createNativeStackNavigator();
export const FeedStackScreen = ({ navigation }) => (
  <FeedStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <FeedStack.Screen
      name="Request Feed"
      component={RequestedScreen}
      options={{
        headerShown: true,
        headerLeft: () => (
          <Icon.Button
            name=""
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => {
              navigation.goBack();
            }}
          ></Icon.Button>
        ),
      }}
    />
    <FeedStack.Screen name="Profile" component={ProfileScreen} />
    <FeedStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
  </FeedStack.Navigator>
);

const AddRequestStack = createNativeStackNavigator();
export const AddRequestStackScreen = ({ navigation }) => (
  <AddRequestStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AddRequestStack.Screen
      name="RequestBookBaseScreen"
      options={{
        title: "Request A Cloth",
        headerShown: true,
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
      }}
      component={AddRequestScreen}
    />
  </AddRequestStack.Navigator>
);

const MyRequestStack = createNativeStackNavigator();
export const MyRequestStackScreen = ({ navigation }) => (
  <MyRequestStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <MyRequestStack.Screen
      name="MyRequest"
      options={{
        title: "My Requests",
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={MyRequests}
    />
  </MyRequestStack.Navigator>
);

const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "My Profile",
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
    />
    <ProfileStack.Screen name="Details" component={DetailsScreen} />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: "Edit Profile",
        headerShown: true,
      }}
    />
  </ProfileStack.Navigator>
);

const BookmarksStack = createNativeStackNavigator();
export const BookmarksStackScreen = ({ navigation }) => (
  <BookmarksStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
    }}
  >
    <BookmarksStack.Screen
      name="Bookmarks"
      options={{
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={BookmarksScreen}
    />
    <BookmarksStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
    <BookmarksStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
  </BookmarksStack.Navigator>
);
