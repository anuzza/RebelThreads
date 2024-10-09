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

const pickerOptions = ["Freshmen", "Sophmore", "Junior", "Senior"];

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const error = useSelector((state) => state.auth.error);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [state, setState] = useState({
    name: user?.name,
    email: user?.email,
    contact_number: user?.contact_number?.value,
    major: user?.major,
  });
  const [classification, setClassification] = useState(user?.classification);
  const [modalVisible, setModalVisable] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const [isEnabled, setIsEnabled] = useState(user?.contact_number?.visibility);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { name, email, contact_number, major } = state;

  const dispatch = useDispatch();

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
    if (!result.cancelled) {
      setAvatarLoading(true);
      await dispatch(uploadImage(result));
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

  const validateInput = useRef();

  const onUpdate = () => {
    dispatch(
      signup(name, email, contact_number, classification, major, {
        isEnabled,
        update: true,
      })
    );
    if (error) {
      validateInput.current.shake(800);
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
        backgroundColor: pickerVisible ? "rgba(255,255,255,0.1)" : "#fff",
        flex: 1,
      }}
    >
      <Loader loading={avatarLoading} />
      <StatusBar hidden={false} />
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

      <Animatable.View ref={validateInput}>
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
              if (error?.error || error?.nameError) {
                dispatch(clearErrors());
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
              if (error?.error || error?.emailError) {
                dispatch(clearErrors());
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
            value={contact_number}
            keyboardType="phone-pad"
            style={styles.Input}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, contact_number: text });
            }}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Caption style={styles.Label}>Classification</Caption>
          <TextInput
            value={classification}
            style={styles.Input}
            editable={false}
            selectTextOnFocus={false}
            returnKeyType="next"
            onPressIn={() => {
              setPickerVisible(true);
            }}
            onChangeText={(text) => {
              setState({ ...state, classification: text });
            }}
          />
        </View>
        {pickerVisible && (
          <CustomPicker
            options={pickerOptions}
            value={classification}
            setValue={setClassification}
            modalVisible={pickerVisible}
            setModalVisible={setPickerVisible}
          />
        )}
        <View
          style={{
            ...styles.InputWrapper,
            borderBottomColor: error?.majorError ? "#D91848" : "#ddd",
            borderBottomWidth: 1,
          }}
        >
          <Caption style={styles.Label}>Major</Caption>
          <TextInput
            style={{ ...styles.Input, borderBottomWidth: 0 }}
            value={major}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, major: text });
            }}
            onFocus={() => {
              if (error?.error || error?.majorError) {
                dispatch(clearErrors());
              }
            }}
          />
        </View>
        {error?.majorError && (
          <Caption style={styles.error}>{error?.majorError}</Caption>
        )}

        <View style={styles.PrivacyContainer}>
          <Title style={styles.Label}>PRIVACY</Title>
          <View
            style={{
              ...styles.InputWrapper,
              borderTopColor: "#ddd",
              borderTopWidth: 1,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                ...styles.Label,
                fontSize: 16,
                marginBottom: 15,
                marginTop: 15,
              }}
            >
              Share Phone Number
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#3c91e6" }}
              thumbColor="#fff"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        {error?.error && (
          <Caption
            style={{
              ...styles.error,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {error?.error}
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
    color: "#3c91e6",
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
    backgroundColor: "#000",
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
