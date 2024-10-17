import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { verticalAnimation } from "../../constants/animation";
import Drawer from "../DrawerScreen";
import {
  AuthStackScreen,
  MyListingStackScreen,
  AddListingStackScreen,
  AddRequestStackScreen,
  MyRequestStackScreen,
  ProfileStackScreen,
  BookmarksStackScreen,
} from "./StackScreens";
import {
  AdminReportedRequestsStackScreen,
  AdminReportedSalesStackScreen,
  AdminReportedUsersStackScreen,
} from "./AdminScreens";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ userToken, user }) => {
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
          {user && !user.isAdmin ? (
            <>
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
            <>
              <RootStack.Screen
                name="ProfileScreen"
                component={ProfileStackScreen}
              />
              <RootStack.Screen
                name="ReportedUsersScreen"
                component={AdminReportedUsersStackScreen}
              />
              <RootStack.Screen
                name="ReportedSalesScreen"
                component={AdminReportedSalesStackScreen}
              />
              <RootStack.Screen
                name="ReportedRequestsScreen"
                component={AdminReportedRequestsStackScreen}
              />
            </>
          )}
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
