import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "../MainTabScreen";
import { DrawerContent } from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerScreen = ({ user }) => {
  return (
    <Drawer.Navigator
      focused
      drawerContent={(props) => <DrawerContent user={user} {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeDrawer">
        {(props) => <MainTabScreen user={user} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
