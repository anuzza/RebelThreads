import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { verticalAnimation } from "../../constants/animation";
import Drawer from "../DrawerScreen";
import { AuthStackScreen } from "./StackScreens";
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
