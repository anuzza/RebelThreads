import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Title } from "react-native-paper";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";

export const BaseScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    error: {},
  });

  const { title, description, brand, size, error } = state;

  const validateInput = () => {
    const validationErrors = {};

    if (title === "") {
      validationErrors.titleError = "Title is required!";
    }
    if (description === "") {
      validationErrors.descriptionError = "Description is required!";
    }
    if (brand === "") {
      validationErrors.brandError = "Brand is required!";
    }
    if (size === "") {
      validationErrors.sizeError = "Size is required!";
    }
    setState({ ...state, error: validationErrors });
    return Object.keys(validationErrors).length < 1;
  };

  const validateInputRef = useRef();

  const onFormSubmit = () => {
    const isValid = validateInput();
    if (!isValid) {
      validateInputRef.current.shake(800);
    } else {
      setState({ ...state, error: {} });
      navigation.push("UploadClothSecondaryScreen", {
        clothState: {
          title,
          description,
          brand,
          size,
        },
      });
    }
  };

  useEffect(() => {
    if (route?.params?.clothState) {
      setState({
        ...state,
        title: route?.params?.clothState?.title
          ? route.params.clothState.title
          : "",
        description: route?.params?.clothState?.description
          ? route.params.clothState.description
          : "",
        brand: route?.params?.clothState?.brand
          ? route.params.clothState.brand
          : "",
        size: route?.params?.clothState?.size
          ? route.params.clothState.size
          : "",
      });
    }
  }, [route]);

  return (
    <ScrollView
      style={{ flex: 1, padding: 10 }}
      automaticallyAdjustKeyboardInsets="true"
    >
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 1 of 3</Caption>
        <Title>Add your listing information</Title>
        <Caption style={styles.ModalFooter}>
          Let's start with the basics!
        </Caption>
      </View>
      <Animatable.View ref={validateInputRef}>
        <View>
          <Caption style={styles.Label}>Title</Caption>
          <TextInput
            style={[styles.Input, error?.titleError && styles.borderError]}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, title: text });
            }}
            onFocus={() => {
              if (error?.titleError) {
                delete error["titleError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.titleError && (
            <Caption style={styles.error}>{error?.titleError}</Caption>
          )}
        </View>
        <View>
          <KeyboardAvoidingView>
            <Caption style={styles.Label}>Description</Caption>
            <TextInput
              style={[
                styles.longInput,
                error?.descriptionError && styles.borderError,
              ]}
              multiline={true}
              onChangeText={(text) => {
                setState({ ...state, description: text });
              }}
              onFocus={() => {
                if (error?.descriptionError) {
                  delete error["descriptionError"];
                  setState({ ...state, error });
                }
              }}
            />
            {error?.descriptionError && (
              <Caption style={styles.error}>{error?.descriptionError}</Caption>
            )}
          </KeyboardAvoidingView>
        </View>
        <View>
          <Caption style={styles.Label}>Brand</Caption>
          <TextInput
            style={[styles.Input, error?.brandError && styles.borderError]}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, brand: text });
            }}
            onFocus={() => {
              if (error?.brandError) {
                delete error["brandError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.brandError && (
            <Caption style={styles.error}>{error?.brandError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>Size</Caption>
          <TextInput
            style={[styles.Input, error?.sizeError && styles.borderError]}
            value={size}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, size: text });
            }}
            onFocus={() => {
              if (error?.sizeError) {
                delete error["sizeError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.sizeError && (
            <Caption style={styles.error}>{error?.sizeError}</Caption>
          )}
        </View>
      </Animatable.View>
      <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
        <Caption style={styles.alignedText}>Continue</Caption>
      </TouchableOpacity>
    </ScrollView>
  );
};
