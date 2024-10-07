import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption } from "react-native-paper";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";
import CustomPicker from "../../components/CustomPicker";
import axios from "../../utils/axios";

const genderOptions = ["Select Gender", "Men", "Women", "Unisex"];
export const BaseScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    error: {},
  });

  const [gender, setGender] = useState(genderOptions[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (gender === "Select Gender") {
      validationErrors.genderError = "Gender is required!";
    }
    setState({ ...state, error: validationErrors });
    return Object.keys(validationErrors).length < 1;
  };

  const validateInputRef = useRef();

  const onFormSubmit = async () => {
    const isValid = validateInput();
    if (!isValid) {
      validateInputRef.current.shake(800);
    } else {
      setState({ ...state, error: {}, errorMessage: "" });
      setLoading(true);
      const formState = {
        title: title,
        description: description,
        brand: brand,
        size: size,
        gender: gender,
      };
      if (route.params?.clothState?.id) {
        formState.id = route.params.clothState.id;
      }
      try {
        await axios.post("/requests/", formState);
        setLoading(false);
        Alert.alert(
          `Cloth ${
            route.params?.clothState?.id ? "updated" : "requested"
          } succesfully!`
        );
        navigation.replace("MyRequestScreen");
      } catch (err) {
        setState({
          ...state,
          errorMessage: err.response?.data?.errMessage,
        });
        setLoading(false);
        Alert.alert(state.errMessage || err);
      }
    }
  };

  useEffect(() => {
    if (route?.params?.clothState) {
      setState({
        ...state,
        title: route.params.clothState.title || "",
        description: route.params.clothState.description || "",
        brand: route.params.clothState.brand || "",
        size: route.params.clothState.size || "",
      });
      setGender(route.params.clothState.gender || genderOptions[0]);
    }
  }, [route]);

  return (
    <ScrollView
      style={{ flex: 1, padding: 10 }}
      automaticallyAdjustKeyboardInsets="true"
    >
      <Animatable.View ref={validateInputRef}>
        <View>
          <Caption style={styles.Label}>Title</Caption>
          <TextInput
            style={[styles.Input, error?.titleError && styles.borderError]}
            returnKeyType="done"
            value={title}
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
              value={description}
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
            value={brand}
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
        <View>
          <Caption style={styles.Label}>Gender</Caption>
          <TextInput
            style={[styles.Input, error?.genderError && styles.borderError]}
            returnKeyType="done"
            value={gender}
            editable={false}
            selectTextOnFocus={false}
            onPressIn={() => {
              if (error?.genderError) {
                delete error["genderError"];
                setState({ ...state, error });
              }
              setModalVisible(true);
            }}
          />
          {error?.genderError && (
            <Caption style={styles.error}>{error?.genderError}</Caption>
          )}
        </View>
      </Animatable.View>
      {modalVisible && (
        <CustomPicker
          options={genderOptions}
          value={gender}
          setValue={setGender}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
        {!loading ? (
          <Caption style={styles.alignedText}>Add Request</Caption>
        ) : (
          <ActivityIndicator color="#fff" />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};
