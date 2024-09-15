import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import HeaderConfig from "react-native-screens/lib/module/native-stack/views/HeaderConfig";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignupScreen from "./src/screens/Auth/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./src/screens/Profile";
import Icon from "react-native-vector-icons/Entypo";
import DrawerContent from "./src/components/DrawerContent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddListing from "./src/screens/AddListing";
import Requests from "./src/screens/Requests";
import Saved from "./src/screens/Saved";
import MyListings from "./src/screens/MyListings";
import MyRequests from "./src/screens/My Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        statusBarColor: "#4338ca",
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
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          );
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="MyListings" component={MyListings} />
      <Stack.Screen name="MyRequests" component={MyRequests} />
      <Stack.Screen
        name="Login"
        component={LoginNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeDrawer"
    >
      <Drawer.Screen name="HomeDrawer" component={TabNav} />
    </Drawer.Navigator>
  );
};

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "Add Listing") {
            iconName = "plus";
          } else if (route.name === "Requests") {
            iconName = "list";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        statusBarColor: "#4338ca",
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
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackNav}
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen name="Add Listing" component={AddListing}></Tab.Screen>
      <Tab.Screen name="Requests" component={Requests}></Tab.Screen>
    </Tab.Navigator>
  );
};

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="LoginHome" component={DrawerNav} />
    </Stack.Navigator>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
    </NavigationContainer>
  );
}

export default App;
