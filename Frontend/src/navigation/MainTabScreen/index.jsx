import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  AddListingStackScreen,
  FeedStackScreen,
  HomeStackScreen,
} from "../RootStackScreen/StackScreens";
import {
  AdminFeedStackScreen,
  AdminHomeStackScreen,
  AdminUserStackScreen,
} from "../RootStackScreen/AdminScreens";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#B0B0C3",

        tabBarStyle: {
          backgroundColor: "#4338ca",
        },
        headerStyle: {
          backgroundColor: "#4338ca",
        },
        headerTintColor: "#FFF",
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={25}
            color="#fff"
            style={{ marginLeft: 16 }}
            onPress={() => navigation.openDrawer()}
          ></Icon>
        ),
      }}
      initialRouteName="Home"
      shifting={false}
    >
      {user && !user.isAdmin ? (
        <>
          <Tab.Screen
            name="Home Tab"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Sell Tab"
            component={AddListingStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Sell",
              tabBarIcon: ({ color }) => (
                <Icon name="shirt" color={color} size={30} />
              ),
            }}
          />

          <Tab.Screen
            name="Requests Feed"
            component={FeedStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Feed",
              tabBarIcon: ({ color }) => (
                <Icon name="list" color={color} size={30} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home Tab"
            component={AdminHomeStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AdminUsersTab"
            component={AdminUserStackScreen}
            options={{
              headerShown: false,

              tabBarLabel: "Users",
              tabBarIcon: ({ color }) => (
                <Icon name="people" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AdminFeedTab"
            component={AdminFeedStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Requests",
              tabBarIcon: ({ color }) => (
                <Icon name="list" color={color} size={26} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
export default MainTabScreen;
