import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [userData, setUserData] = useState({});
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>Home Page</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
