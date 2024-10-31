import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  FeedScreen,
  UserScreen,
  ReportedRequestsScreen,
  ReportedSalesScreen,
  ReportedUsersScreen,
} from "../../screens/Admin";
import { Ionicons as Icon } from "@expo/vector-icons";
import DetailsScreen from "../../screens/DetailsScreen";
import ProfileScreen from "../../screens/Profile";
import { verticalAnimation } from "../../constants/animation";

const AdminHomeStack = createNativeStackNavigator();
export const AdminHomeStackScreen = ({ navigation }) => (
  <AdminHomeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AdminHomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu-outline"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
    />
    <AdminHomeStack.Screen name="Details" component={DetailsScreen} />
  </AdminHomeStack.Navigator>
);

const AdminFeedStack = createNativeStackNavigator();
export const AdminFeedStackScreen = ({ navigation }) => (
  <AdminFeedStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AdminFeedStack.Screen
      name="Requests"
      component={FeedScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu-outline"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
    />
    <AdminFeedStack.Screen
      name="Profile"
      options={{
        headerShown: true,
      }}
      component={ProfileScreen}
    />
    <AdminFeedStack.Screen
      name="Details"
      options={{
        headerShown: true,
      }}
      component={DetailsScreen}
    />
  </AdminFeedStack.Navigator>
);

const AdminUserStack = createNativeStackNavigator();
export const AdminUserStackScreen = ({ navigation }) => (
  <AdminUserStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AdminUserStack.Screen
      name="Users"
      component={UserScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu-outline"
            size={25}
            color="#fff"
            backgroundColor="#4338ca"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
    />
    <AdminUserStack.Screen
      name="Profile"
      options={{
        headerShown: true,
      }}
      component={ProfileScreen}
    />
    <AdminUserStack.Screen
      name="Details"
      options={{
        headerShown: true,
      }}
      component={DetailsScreen}
    />
  </AdminUserStack.Navigator>
);

const AdminReportedSalesStack = createNativeStackNavigator();
export const AdminReportedSalesStackScreen = ({ navigation }) => (
  <AdminReportedSalesStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AdminReportedSalesStack.Screen
      name="ReportedSales"
      component={ReportedSalesScreen}
      options={{
        title: "Reported Sales",
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
    <AdminReportedSalesStack.Screen
      name="Profile"
      options={{
        headerShown: true,
      }}
      component={ProfileScreen}
    />
    <AdminReportedSalesStack.Screen
      name="Details"
      options={{
        headerShown: true,
      }}
      component={DetailsScreen}
    />
  </AdminReportedSalesStack.Navigator>
);

const AdminReportedUsersStack = createNativeStackNavigator();
export const AdminReportedUsersStackScreen = ({ navigation }) => (
  <AdminReportedUsersStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AdminReportedUsersStack.Screen
      name="ReportedUsers"
      component={ReportedUsersScreen}
      options={{
        title: "Reported Users",
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
    <AdminReportedUsersStack.Screen
      name="Profile"
      options={{
        headerShown: true,
      }}
      component={ProfileScreen}
    />
    <AdminReportedUsersStack.Screen
      name="Details"
      options={{
        headerShown: true,
      }}
      component={DetailsScreen}
    />
  </AdminReportedUsersStack.Navigator>
);

const AdminReportedRequestsStack = createNativeStackNavigator();
export const AdminReportedRequestsStackScreen = ({ navigation }) => (
  <AdminReportedRequestsStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
      headerStyle: {
        backgroundColor: "#4338ca",
      },
      headerTintColor: "#FFF",
    }}
  >
    <AdminReportedRequestsStack.Screen
      name="ReportedRequests"
      component={ReportedRequestsScreen}
      options={{
        title: "Reported Requests",
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
    <AdminReportedRequestsStack.Screen
      name="Profile"
      options={{
        headerShown: true,
      }}
      component={ProfileScreen}
    />
    <AdminReportedRequestsStack.Screen
      name="Details"
      options={{
        headerShown: true,
      }}
      component={DetailsScreen}
    />
  </AdminReportedRequestsStack.Navigator>
);
