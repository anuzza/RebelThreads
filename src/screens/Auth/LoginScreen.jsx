import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioGroup from "react-native-radio-buttons-group";

const LoginScreen = () => {
  const navigation = useNavigation();
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Student",
        value: "student",
        color: "#6366f1",
        size: "20",
        labelStyle: styles.label,
      },
      {
        id: "2",
        label: "Admin",
        value: "admin",
        color: "#6366f1",
        size: "20",
        labelStyle: styles.label,
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-[600] w-full absolute"
        source={require("../../assets/images/background.png")}
      />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[225] w-[90]"
          source={require("../../assets/images/light.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="h-[160] w-[65]"
          source={require("../../assets/images/light.png")}
        />
      </View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-40 pb-5">
        {/* Title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.delay(800).duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Login
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 mt-10 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full flex items-center p-4"
          >
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity className="w-full bg-indigo-700 p-3 rounded-2xl mb-3">
              <Text className="text-white font-bold text-xl text-center">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("SignUp")}>
              <Text className="text-blue-800 font-bold">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
  },
});
