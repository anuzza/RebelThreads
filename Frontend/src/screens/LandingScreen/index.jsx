import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const LandingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white h-full w-full" style={styles.container}>
      <StatusBar style="dark" />
      {/* <Animated.Image
        entering={FadeInUp.delay(200).duration(1000).springify()}
        className="h-[900] w-full absolute"
        source={require("../../assets/images/background.png")}
      /> */}

      {/* lights */}
      {/* <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="h-[225] w-[90]"
          source={require("../../assets/images/light.png")}
        />
      </View> */}

      <View className="flex items-center pt-5">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[300] w-full"
          source={require("../../assets/images/splash.png")}
        ></Animated.Image>
      </View>

      <View className="h-full w-full flex">
        {/* Title */}
        <View className="flex items-center pt-10">
          <Animated.Text
            entering={FadeInUp.delay(600).duration(1000).springify()}
            className="font-bold tracking-wider text-5xl"
          >
            Welcome to RebelThreads
          </Animated.Text>

          <Animated.Text
            entering={FadeInUp.delay(800).duration(1000).springify()}
            className="text-xl text-center p-5"
          >
            Buy, sell, or give away clothes easily within the Ole Miss community
            — sustainable fashion made simple!
          </Animated.Text>
        </View>

        <Animated.View
          entering={FadeInDown.delay(1000).duration(1000).springify()}
          className="w-full flex items-end pt-20"
        >
          <TouchableOpacity
            style={styles.button}
            className="flex justify-center items-center"
            onPress={() => navigation.push("LoginScreen")}
          >
            <FontAwesome style={styles.arrow} name="arrow-right" size={30} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#4338ca",
    padding: 10,
    marginRight: 30,
  },
  arrow: {
    color: "#fff",
  },
});
