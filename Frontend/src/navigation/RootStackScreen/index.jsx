import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { verticalAnimation } from "../../constants/animation";
import Drawer from "../DrawerScreen";
import {
  AuthStackScreen,
  MyListingStackScreen,
  AddListingStackScreen,
  HomeStackScreen,
  AddRequestStackScreen,
  MyRequestStackScreen,
  FeedStackScreen,
  ProfileStackScreen,
  BookmarksStackScreen,
} from "./StackScreens";
import LoginScreen from "../../screens/Auth/LoginScreen";
import { useSelector } from "react-redux";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ userToken, user }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        ...verticalAnimation,
      }}
    >
      {userToken ? (
        <>
          <RootStack.Screen
            name="App"
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          >
            {(props) => <Drawer user={user} {...props} />}
          </RootStack.Screen>
          <RootStack.Screen
            name="ProfileScreen"
            component={ProfileStackScreen}
          />
          <RootStack.Screen
            name="BookmarksScreen"
            component={BookmarksStackScreen}
          />
          <RootStack.Screen
            name="MyListingScreen"
            component={MyListingStackScreen}
          />
          <RootStack.Screen
            name="AddListingScreen"
            component={AddListingStackScreen}
          />
          <RootStack.Screen
            name="AddRequestScreen"
            component={AddRequestStackScreen}
          />
          <RootStack.Screen
            name="MyRequestScreen"
            component={MyRequestStackScreen}
          />
        </>
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
