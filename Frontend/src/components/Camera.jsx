import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Modal,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons as Icon } from "@expo/vector-icons";
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";

const CameraComponent = ({
  modalVisible,
  setModalVisible,
  handleImageUpload,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [facing, setFacing] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (permission?.granted === false) {
      Alert.alert("Camera access is required.");
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing((prevFacing) =>
      prevFacing === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleFlashMode = () => {
    setFlashMode((prevFlash) =>
      prevFlash === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setCapturedImage(photo);
      setPreviewVisible(true);
    }
  };

  const savePhoto = () => {
    handleImageUpload(capturedImage);
    setModalVisible(false);
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  // Request camera permission
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            savePhoto={savePhoto}
            retakePicture={retakePicture}
          />
        ) : (
          <CameraView
            ref={setCamera}
            style={styles.camera}
            facing={facing}
            flash={flashMode}
            mirror={false}
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
            <View style={styles.cameraControls}>
              <TouchableOpacity
                onPress={toggleCameraFacing}
                style={styles.controlButton}
              >
                <Icon name="camera-reverse-outline" size={35} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                style={styles.captureButton}
              />
              <TouchableOpacity
                onPress={handleFlashMode}
                style={styles.controlButton}
              >
                <Icon
                  name={
                    flashMode === FlashMode.off
                      ? "flash-off-outline"
                      : "flash-outline"
                  }
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
      </View>
    </Modal>
  );
};

const CameraPreview = ({ photo, retakePicture, savePhoto }) => (
  <View style={styles.previewContainer}>
    <ImageBackground source={{ uri: photo.uri }} style={styles.imageBackground}>
      <View style={styles.previewActions}>
        <TouchableOpacity onPress={retakePicture} style={styles.actionButton}>
          <Text style={styles.actionText}>Re-take</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={savePhoto} style={styles.actionButton}>
          <Text style={styles.actionText}>Save Photo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    bottom: 90,
    left: 20,
    zIndex: 1,
  },
  cameraControls: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 40,
    justifyContent: "space-between",
  },
  controlButton: {
    margin: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    marginBottom: 20, // Space it above the bottom
  },
  previewContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageBackground: {
    flex: 1,
  },
  previewActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
    maxHeight: "fit-content",
    position: "absolute",
    bottom: 0, // Position the buttons at the bottom
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  actionButton: {
    marginBottom: 30,
    width: 130,
    height: 20,
    alignItems: "center",
    borderRadius: 4,
  },
  actionText: {
    color: "#fff",
    fontSize: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#4338ca",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default CameraComponent;
