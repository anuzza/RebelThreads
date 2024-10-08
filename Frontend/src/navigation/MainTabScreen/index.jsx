import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  AddListingStackScreen,
  FeedStackScreen,
  HomeStackScreen,
} from "../RootStackScreen/StackScreens";
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
            <Icon name="add-circle" color={color} size={30} />
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
            <Icon name="pricetags" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainTabScreen;
