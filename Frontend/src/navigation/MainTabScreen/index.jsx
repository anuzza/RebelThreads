import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import { HomeStackScreen } from "../RootStackScreen/StackScreens";
import AddListing from "../../screens/AddListing/index";
import Requests from "../../screens/Requests/index";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
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
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sell Tab"
        component={AddListing}
        options={{
          tabBarLabel: "Sell",
          tabBarIcon: ({ color }) => (
            <Icon name="camera" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Requests Tab"
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
