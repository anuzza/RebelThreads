import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import { HomeStackScreen } from "../RootStackScreen/StackScreens";
import AddListing from "../../screens/AddListing/index";
import Requests from "../../screens/Requests/index";

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ user }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#4338ca",
        },
      }}
      initialRouteName="Home"
      shifting={false}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SellTab"
        component={AddListing}
        options={{
          tabBarLabel: "Sell",
          tabBarIcon: ({ color }) => (
            <Icon name="camera" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="FeedTab"
        component={Requests}
        options={{
          tabBarLabel: "Request",
          tabBarIcon: ({ color }) => (
            <Icon name="pricetag" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainTabScreen;
