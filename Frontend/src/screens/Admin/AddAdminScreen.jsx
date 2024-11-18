import React, { useState, useRef } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Text } from "react-native-paper";
import axios from "../../utils/axios";
import { uploadFormStyles as styles } from "../../constants/sharedStyles"; // Reuse the styles from AddRequestScreen

const AddAdminScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    error: {},
  });
  const [loading, setLoading] = useState(false);
  const { name, email, password, phone, error } = formState;

  const validateInputRef = useRef();

  const validateInput = () => {
    const validationErrors = {};
    if (name.length < 2)
      validationErrors.name = "Name must be at least 2 characters";
    if (!/^[\w.%+-]+@(go\.)?olemiss\.edu$/.test(email))
      validationErrors.email = "Invalid Ole Miss email address";
    if (!/^(?=.*\d).{6,}$/.test(password))
      validationErrors.password =
        "Password must be at least 6 characters and include a number";
    if (!/^\d{10}$/.test(phone))
      validationErrors.phone = "Invalid phone number";

    setFormState({ ...formState, error: validationErrors });

    return Object.keys(validationErrors).length < 1;
  };

  const handleFormSubmit = async () => {
    if (!validateInput()) {
      validateInputRef.current.shake(800);
    } else {
      setLoading(true);

      setFormState({ ...formState, error: {}, errorMessage: "" });
      try {
        await axios.post("/admin/add", { name, email, password, phone });
        setLoading(false);
        Alert.alert("Admin added successfully!");
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        Alert.alert(
          "Failed to add admin",
          error.response?.data?.error || error
        );
      }
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, padding: 10 }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Animatable.View ref={validateInputRef}>
        {/* Name Field */}
        {/* Name Field */}
        <View>
          <Caption style={styles.Label}>Full Name</Caption>
          <TextInput
            style={[styles.Input, error.name && styles.borderError]}
            returnKeyType="done"
            value={name}
            onChangeText={(text) => setFormState({ ...formState, name: text })}
            onFocus={() => {
              if (error?.name) {
                delete error["name"];
                setFormState({ ...formState, error });
              }
            }}
          />
          {error.name && <Caption style={styles.error}>{error.name}</Caption>}
        </View>

        {/* Email Field */}
        <View>
          <Caption style={styles.Label}>Email</Caption>
          <TextInput
            style={[styles.Input, error.email && styles.borderError]}
            returnKeyType="done"
            value={email}
            onChangeText={(text) => setFormState({ ...formState, email: text })}
            onFocus={() => {
              if (error?.email) {
                delete error["email"];
                setFormState({ ...formState, error });
              }
            }}
          />
          {error.email && <Caption style={styles.error}>{error.email}</Caption>}
        </View>

        {/* Password Field */}
        <View>
          <Caption style={styles.Label}>Password</Caption>
          <TextInput
            style={[styles.Input, error.password && styles.borderError]}
            returnKeyType="done"
            value={password}
            onChangeText={(text) =>
              setFormState({ ...formState, password: text })
            }
            onFocus={() => {
              if (error?.password) {
                delete error["password"];
                setFormState({ ...formState, error });
              }
            }}
          />

          {error.password && (
            <Caption style={styles.error}>{error.password}</Caption>
          )}
        </View>

        {/* Phone Field */}
        <View>
          <Caption style={styles.Label}>Phone Number</Caption>
          <TextInput
            style={[styles.Input, error.phone && styles.borderError]}
            returnKeyType="done"
            value={phone}
            onChangeText={(text) => setFormState({ ...formState, phone: text })}
            onFocus={() => {
              if (error?.phone) {
                delete error["phone"];
                setFormState({ ...formState, error });
              }
            }}
          />
          {error.phone && <Caption style={styles.error}>{error.phone}</Caption>}
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleFormSubmit} style={styles.SaveButton}>
          {!loading ? (
            <Caption style={styles.alignedText}>Add Admin</Caption>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

export default AddAdminScreen;
