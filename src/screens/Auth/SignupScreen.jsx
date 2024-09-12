import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Error from "react-native-vector-icons/MaterialIcons";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleName = (e) => {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  };

  const handleEmail = (e) => {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  };

  const handlePassword = (e) => {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  };

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
      <View className="h-full w-full flex justify-around pt-40 pb-2">
        {/* Title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.delay(800).duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Sign Up
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full flex-row"
          >
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={"gray"}
              onChange={(e) => handleName(e)}
            />
          </Animated.View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Name should be more then 1 characters.
            </Text>
          )}
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"gray"}
              onChange={(e) => handleEmail(e)}
            />
          </Animated.View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Enter your Olemiss Email Address
            </Text>
          )}

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              onChange={(e) => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name="eye" />
            </TouchableOpacity>
          </Animated.View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Password must contain at least 6 characters.
            </Text>
          )}
          <Animated.View
            entering={FadeInDown.duration(1000).delay(400).springify()}
            className="w-full"
          >
            <TouchableOpacity className="w-full bg-indigo-800 p-3 rounded-2xl mb-3">
              <Text className="text-white font-bold text-xl text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).delay(400).springify()}
            className="flex-row justify-center"
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text className="text-blue-800 font-bold">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
  },
  smallIcon: {
    marginRight: 10,
  },
});
