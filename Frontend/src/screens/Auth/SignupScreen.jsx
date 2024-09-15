import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Error from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = () => {
    const userData = { name: name, email, password };
    if (nameVerify && emailVerify && passwordVerify) {
      axios
        .post("http://192.168.0.94:5001/register", userData)
        .then((res) => {
          if (res.data.status == "ok") {
            Alert.alert("Registered Successfully!");
            navigation.navigate("Login");
          } else {
            Alert.alert(res.data.data);
          }
        })
        .catch((e) => {
          Alert.alert(e);
        });
    } else {
      Alert.alert("Fill mandatory details");
    }
  };

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

    // Regex to check for either @go.olemiss.edu or @olemiss.edu
    if (/^[\w.%+-]+@(go\.)?olemiss\.edu$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  };

  const handlePassword = (e) => {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);

    // Regex to check if the password has at least 6 characters and contains a number
    if (/^(?=.*\d).{6,}$/.test(passwordVar)) {
      setPasswordVerify(true);
    }
  };

  // Check if all fields are verified
  const isFormValid = nameVerify && emailVerify && passwordVerify;

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
        <View className="flex items-center mx-4 space-y-3">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-4 rounded-2xl w-full flex-row"
          >
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
              size={20}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={"gray"}
              onChange={(e) => handleName(e)}
              style={styles.textInput}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather
                style={styles.verifyIcon}
                name="check-circle"
                color="green"
                size={20}
              />
            ) : (
              <Error
                style={styles.verifyIcon}
                name="error"
                color="red"
                size={20}
              />
            )}
          </Animated.View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                marginLeft: -100,
              }}
            >
              Name should be more then 1 characters.
            </Text>
          )}
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-4 rounded-2xl w-full flex-row"
          >
            <Fontisto
              name="email"
              color="#420475"
              style={styles.smallIcon}
              size={20}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email (olemiss.edu)"
              placeholderTextColor={"gray"}
              onChange={(e) => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </Animated.View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 10,
                color: "red",
                fontSize: 12,
              }}
            >
              Email must be an @olemiss.edu or @go.olemiss.edu address
            </Text>
          )}

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-4 rounded-2xl w-full flex-row"
          >
            <FontAwesome
              name="lock"
              color="#420475"
              style={styles.smallIcon}
              size={20}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={"gray"}
              onChange={(e) => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </Animated.View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 10,
                color: "red",
                fontSize: 12,
              }}
            >
              Password must be at least 6 characters and include a number
            </Text>
          )}
          <Animated.View
            entering={FadeInDown.duration(1000).delay(400).springify()}
            className="w-full"
          >
            <TouchableOpacity
              className={`w-full p-3 rounded-2xl mb-3 ${
                isFormValid ? "bg-indigo-800" : "bg-indigo-400"
              }`}
              disabled={!isFormValid}
              onPress={handleSubmit}
            >
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
  smallIcon: {
    marginRight: 10,
  },
  verifyIcon: {},
  textInput: {
    flex: 1,
  },
});
