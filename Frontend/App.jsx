import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNav from "./src/navigation/Drawer/DrawerNav";
import { LoginStackScreen } from "./src/navigation/Stack";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("token");
    setIsLoggedIn(data !== "");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginStackScreen />}
    </NavigationContainer>
  );
}

export default App;
