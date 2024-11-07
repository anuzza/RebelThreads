import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import CameraComponent from "../../components/Camera";
import { showImagePicker } from "../../utils/imagePicker";
import { useSelector, useDispatch } from "react-redux";
import CustomPicker from "../../components/CustomPicker";
import {
  clearErrors,
  deleteImage,
  signup,
  uploadImage,
} from "../../redux/actions/auth";
import Loader from "../../components/Loader";

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const authError = useSelector((state) => state.auth.error);

  const [state, setState] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    error: {},
  });
  const [modalVisible, setModalVisable] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const { name, email, phone, error } = state;

  const dispatch = useDispatch();

  const validateInput = () => {
    const validationErrors = {};

    if (name === "") {
      validationErrors.nameError = "Name is required!";
    }
    if (!/^[\w.%+-]+@(go\.)?olemiss\.edu$/.test(email)) {
      validationErrors.emailError = "Please enter a valid olemiss.edu email!";
    }

    if (!/^\d{10}$/.test(phone)) {
      validationErrors.phoneError =
        "Please enter a valid 10-digit phone number!";
    }

    setState({ ...state, error: validationErrors });
    return Object.keys(validationErrors).length < 1;
  };

  const handleImageUpload = async (image) => {
    setAvatarLoading(true);
    await dispatch(uploadImage(image));
    setAvatarLoading(false);
  };

  const handleImageDeletion = async (image) => {
    setAvatarLoading(true);
    await dispatch(deleteImage());
    setAvatarLoading(false);
  };

  const handleImageSelection = async () => {
    const result = await showImagePicker();
    if (!result.canceled) {
      setAvatarLoading(true);
      await dispatch(uploadImage(result.assets[0]));
      setAvatarLoading(false);
    }
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const onOpenActionSheet = () => {
    showActionSheetWithOptions(
      {
        options:
          user?.avatar && user.avatar !== ""
            ? ["Select photos", "Take a photo", "Delete Photo", "Cancel"]
            : ["Select photos", "Take a photo", "Cancel"],
        cancelButtonIndex: user?.avatar && user.avatar !== "" ? 3 : 2,
        destructiveButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleImageSelection();
        }
        if (buttonIndex === 1) {
          setModalVisable(true);
        }
        if (user?.avatar && user.avatar !== "" && buttonIndex === 2) {
          handleImageDeletion();
        }
      }
    );
  };

  const ValidateInputRef = useRef();

  const onUpdate = () => {
    const isValid = validateInput();
    if (!isValid) {
      ValidateInputRef.current.shake(800);
    } else {
      setState({ ...state, error: {} });
      dispatch(
        signup(name, email, phone, {
          update: true,
        })
      );
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Loader loading={avatarLoading} />
      <CameraComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisable}
        handleImageUpload={handleImageUpload}
      />
      <View style={styles.ImageContainer}>
        <Avatar.Image
          source={{
            uri: user?.avatar
              ? user.avatar
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
          }}
          size={120}
        />
        <TouchableOpacity onPress={onOpenActionSheet}>
          <Title style={styles.Title}>Change photo</Title>
        </TouchableOpacity>
      </View>

      <Animatable.View ref={ValidateInputRef}>
        <View
          style={{
            ...styles.InputWrapper,
            borderTopColor: "#ddd",
            borderTopWidth: 1,
          }}
        >
          <Caption style={styles.Label}>Name</Caption>
          <TextInput
            value={name}
            style={[styles.Input, error?.nameError && styles.borderError]}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, name: text });
            }}
            onFocus={() => {
              if (error?.nameError) {
                delete error["nameError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.nameError && (
            <Caption style={styles.error}>{error?.nameError}</Caption>
          )}
        </View>

        <View style={styles.InputWrapper}>
          <Caption style={styles.Label}>Email</Caption>
          <TextInput
            value={email}
            style={[styles.Input, error?.emailError && styles.borderError]}
            keyboardType="email-address"
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, email: text });
            }}
            onFocus={() => {
              if (error?.emailError) {
                delete error["emailError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.emailError && (
            <Caption style={styles.error}>{error?.emailError}</Caption>
          )}
        </View>
        <View style={styles.InputWrapper}>
          <Caption style={styles.Label}>Phone</Caption>
          <TextInput
            value={phone}
            keyboardType="phone-pad"
            style={[styles.Input, error?.phoneError && styles.borderError]}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, phone: text });
            }}
            onFocus={() => {
              if (error?.phoneError) {
                delete error["phoneError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.phoneError && (
            <Caption style={styles.error}>{error?.phoneError}</Caption>
          )}
        </View>
        {authError?.error && (
          <Caption
            style={{
              ...styles.error,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {authError?.error}
          </Caption>
        )}
      </Animatable.View>

      <TouchableOpacity onPress={onUpdate} style={styles.SaveButton}>
        {!authLoading ? (
          <Caption style={styles.alignedText}>Save Changes</Caption>
        ) : (
          <ActivityIndicator color="#fff" />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Title: {
    fontSize: 13,
    marginTop: 15,
    color: "#4338ca",
  },
  InputWrapper: {
    backgroundColor: "#fff",
  },
  Label: {
    marginLeft: 20,
    fontSize: 13,
    marginTop: 10,
  },
  Input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  PrivacyContainer: {
    marginTop: 20,
  },
  SaveButton: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: "#4338ca",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  alignedText: { textAlign: "center", color: "#FFF", fontSize: 16 },
  error: {
    marginLeft: 10,
    marginTop: 10,
    color: "#D91848",
    justifyContent: "flex-start",
  },
  borderError: {
    borderBottomColor: "#D91848",
  },
});

export default connectActionSheet(EditProfileScreen);
