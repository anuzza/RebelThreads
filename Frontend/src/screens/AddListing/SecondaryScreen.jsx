import React, { useState, useRef, useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Title } from "react-native-paper";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";

export const SecondaryScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    title: "",
    edition: "",
    authors: "",
    error: {},
  });

  const { title, edition, authors, error } = state;

  const validateInput = () => {
    const validationErrors = {};

    if (title === "") {
      validationErrors.titleError = "Title is required!";
    }
    if (edition === "") {
      validationErrors.editionError = "Edition is required!";
    }
    if (authors === "") {
      validationErrors.authorsError = "Authors is required!";
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
      navigation.push("UploadBookFinalScreen", {
        bookState: {
          ...route?.params?.bookState,
          title,
          edition,
          authors,
        },
      });
    }
  };

  useEffect(() => {
    if (route?.params?.bookState) {
      setState({
        ...state,
        title: route?.params?.bookState?.title
          ? route.params.bookState.title
          : "",
        edition: route?.params?.bookState?.edition
          ? route.params.bookState.edition
          : "",
        authors: route?.params?.bookState?.authors
          ? route.params.bookState.authors
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
        <Caption style={styles.StepText}>Step 2 of 3</Caption>
        <Title>Add More details</Title>
        <Caption style={styles.ModalFooter}>
          Make sure to add accurate information
        </Caption>
      </View>
      <Animatable.View ref={validateInputRef}>
        <View>
          <Caption style={styles.Label}>Title</Caption>
          <TextInput
            value={"Fundamentals of Computer Security"}
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
          <Caption style={styles.Label}>Edition</Caption>
          <TextInput
            style={[styles.Input, error?.editionError && styles.borderError]}
            value={"2"}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, edition: text });
            }}
            onFocus={() => {
              if (error?.editionError) {
                delete error["editionError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.editionError && (
            <Caption style={styles.error}>{error?.editionError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>
            Authors (enter names seperated by comma)
          </Caption>
          <TextInput
            style={[styles.Input, error?.authorsError && styles.borderError]}
            value={authors}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, authors: text });
            }}
            onFocus={() => {
              if (error?.authorsError) {
                delete error["authorsError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.authorsError && (
            <Caption style={styles.error}>{error?.authorsError}</Caption>
          )}
        </View>
      </Animatable.View>
      <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
        <Caption style={styles.alignedText}>Continue</Caption>
      </TouchableOpacity>
    </ScrollView>
  );
};
