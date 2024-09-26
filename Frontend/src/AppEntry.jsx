import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./navigation/RootStackScreen";
import { loadUser } from "./redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";

const AppEntry = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  if (isLoading) {
    return <Loader loading={isLoading} />;
  }
  console.log(user);
  return (
    <NavigationContainer>
      <RootStackScreen user={user} userToken={userToken} />
    </NavigationContainer>
  );
};

export default AppEntry;
