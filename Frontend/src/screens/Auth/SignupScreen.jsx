import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Error from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearErrors } from "../../redux/actions/auth";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const authLoading = useSelector((state) => state.auth.authLoading);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (nameVerify && emailVerify && passwordVerify && phoneVerify) {
      dispatch(signup(name, email, phone, { password }));
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

  const handlePhoneNumber = (e) => {
    const phoneNumberVar = e.nativeEvent.text;
    setPhone(phoneNumberVar);
    setPhoneVerify(false);

    // Regex to check if the phone number is in the format (123) 456-7890 or 123-456-7890 or 1234567890
    if (/^\d{10}$/.test(phoneNumberVar)) {
      setPhoneVerify(true);
    }
  };

  // Check if all fields are verified
  const isFormValid =
    nameVerify && emailVerify && passwordVerify && phoneVerify;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustKeyboardInsets="true"
    >
      <SafeAreaView className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image
          className="h-[530] w-full absolute"
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
        <View className="h-full w-full flex justify-around pt-10 pb-2">
          {/* Title */}
          <View className="flex items-center" style={{ marginTop: 100 }}>
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
              entering={FadeInDown.delay(200).duration(1000).springify()}
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
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
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
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="bg-black/5 p-4 rounded-2xl w-full flex-row"
            >
              <Fontisto
                name="email"
                color="#420475"
                style={styles.smallIcon}
                size={20}
              />
              <TextInput
                ref={(input) => {
                  this.secondTextInput = input;
                }}
                style={styles.textInput}
                placeholder="Email (olemiss.edu)"
                placeholderTextColor={"gray"}
                onChange={(e) => handleEmail(e)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.thirdTextInput.focus();
                }}
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
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="bg-black/5 p-4 rounded-2xl w-full flex-row"
            >
              <FontAwesome
                name="lock"
                color="#420475"
                style={styles.smallIcon}
                size={20}
              />
              <TextInput
                ref={(input) => {
                  this.thirdTextInput = input;
                }}
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={"gray"}
                onChange={(e) => handlePassword(e)}
                secureTextEntry={showPassword}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.fourthTextInput.focus();
                }}
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
              entering={FadeInDown.delay(800).duration(1000).springify()}
              className="bg-black/5 p-4 rounded-2xl w-full flex-row"
            >
              <Fontisto
                name="mobile-alt"
                color="#420475"
                style={styles.smallIcon}
                size={20}
              />
              <TextInput
                ref={(input) => {
                  this.fourthTextInput = input;
                }}
                style={styles.textInput}
                placeholder="Phone number"
                placeholderTextColor={"gray"}
                onChange={(e) => handlePhoneNumber(e)}
                returnKeyType="done"
              />
              {phone.length < 1 ? null : phoneVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </Animated.View>
            {phone.length < 1 ? null : phoneVerify ? null : (
              <Text
                style={{
                  marginLeft: 10,
                  color: "red",
                  fontSize: 12,
                }}
              >
                Please enter a valid 10-digit phone number
              </Text>
            )}
            <Animated.View
              entering={FadeInDown.delay(1000).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                className={`w-full p-3 rounded-2xl mb-3 ${
                  isFormValid ? "bg-indigo-800" : "bg-indigo-400"
                }`}
                disabled={!isFormValid}
                onPress={handleSubmit}
              >
                {!authLoading ? (
                  <Text className="text-white font-bold text-xl text-center">
                    Sign Up
                  </Text>
                ) : (
                  <ActivityIndicator color="#fff" />
                )}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(1200).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text className="text-blue-800 font-bold">Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
