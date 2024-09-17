import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import AddListing from "../../screens/AddListing/index";
import Requests from "../../screens/Requests/index";
import { HomeStackScreen } from "../Stack/index";
import Icon from "react-native-vector-icons/Ionicons";

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Add Listing") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Requests") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          }
          return <Icon name={iconName} size={28} color={color} />;
        },
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
              style={{ marginLeft: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 600,
        },
        tabBarActiveTintColor: "#4338ca",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          height: 80,
          paddingTop: 0,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ headerShown: false, tabBarLabel: "Home" }}
      ></Tab.Screen>
      <Tab.Screen name="Add Listing" component={AddListing}></Tab.Screen>
      <Tab.Screen name="Requests" component={Requests}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({});
