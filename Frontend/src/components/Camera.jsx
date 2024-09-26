import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons as Icon } from "@expo/vector-icons";

let camera;
const CameraComponent = ({
  modalVisible,
  setModalVisible,
  handleImageUpload,
}) => {
  const [cameraStarted, setStartCamera] = useState(false);
  //   const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants);
  const [flashMode, setFlashMode] = React.useState("off");

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  useEffect(() => {
    startCamera();
  }, []);
  //   if (hasPermission === null) {
  //     return <Text>Requesting for camera permission</Text>;
  //   }
  //   if (hasPermission === false) {
  //     return Alert.alert("Access denied");
  //   }

  const savePhoto = () => {
    handleImageUpload(capturedImage);
    setModalVisible(false);
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  const takePicture = async () => {
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    startCamera();
  };

  const handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      style={styles.container}
    >
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            savePhoto={savePhoto}
            retakePicture={retakePicture}
          />
        ) : (
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={{ flex: 1 }}
            ref={(r) => {
              camera = r;
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "5%",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    marginTop: 20,
                    borderRadius: "50%",
                    height: 25,
                    width: 25,
                  }}
                >
                  <Icon name="close-sharp" size={30} color="#fff"></Icon>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  padding: 40,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={handleFlashMode}>
                  <Icon
                    name={
                      flashMode === "off"
                        ? "ios-flash-off-outline"
                        : "ios-flash-outline"
                    }
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
                <TouchableOpacity onPress={switchCamera}>
                  <Icon
                    name="ios-camera-reverse-outline"
                    size={35}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        )}
      </View>
    </Modal>
  );
};

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CameraComponent;
