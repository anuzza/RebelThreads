import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Caption, Title } from "react-native-paper";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";
import CameraComponent from "../../components/Camera";
import { showImagePicker } from "../../utils/imagePicker";
import * as Animatable from "react-native-animatable";
import axios from "../../utils/axios";

const options = ["Select photos", "Take a photo", "Cancel"];

const findUploadedPictures = (pictures) => {
  const images = [];
  pictures.forEach((picture) => {
    if (!picture.selectedOrUploaded) {
      images.push(picture.image);
    }
  });
  return images;
};

export const CameraScreen = connectActionSheet(({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (route?.params?.clothState) {
      setPictures(
        route?.params?.clothState?.pictures
          ? route.params.clothState.pictures.map((picture) => ({
              image: picture,
              selectedOrUploaded: false,
            }))
          : []
      );
    }
  }, [route]);

  const handleImageUpload = (image) => {
    if (pictures.length < 4) {
      setPictures(
        pictures.concat({
          image: image,
          selectedOrUploaded: true,
        })
      );
      setError("");
    } else {
      Alert.alert("Maximum of 4 images can be uploaded.");
    }
  };

  const handleImageSelection = async () => {
    const result = await showImagePicker();

    if (!result.canceled) {
      handleImageUpload(result.assets[0]);
    }
  };

  const onOpenActionSheet = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleImageSelection();
        }
        if (buttonIndex === 1) {
          setModalVisible(true);
        }
      }
    );
  };

  const onDeleteImage = (index) => {
    if (!pictures[index].selectedOrUploaded) {
      setDeletedImages(deletedImages.concat(pictures[index].image));
    }

    setPictures(pictures.filter((image, idx) => idx !== index));
  };

  const appendFilesToFormData = (pictures, formData) => {
    pictures.forEach((photo, index) => {
      const { image } = photo;
      let fileName = image.fileName;
      if (fileName) {
        const temp = fileName.split(".");
        temp[temp.length - 1] = "jpeg";
        fileName = temp.join(".");
      }
      const fileObject = {
        name: image.fileName ? fileName : `img${index}.jpeg`,
        type: "image/jpeg",
        uri: image.uri,
      };
      formData.append("files", fileObject);
    });
  };

  const onFormSubmit = async () => {
    if (pictures.length === 0) {
      setError("Please upload at least one picture!");
      validateInputRef.current.shake(800);
      return; // Ensure early return on error
    }

    setError("");
    const formData = new FormData();
    const clothState = {
      title: route?.params?.clothState?.title,
      description: route?.params?.clothState?.description,
      brand: route?.params?.clothState?.brand,
      size: route?.params?.clothState?.size,
      price: route?.params?.clothState?.price,
      condition: route?.params?.clothState?.condition,
      category: route?.params?.clothState?.category,
      gender: route?.params?.clothState?.gender,
    };
    Object.keys(clothState).forEach((key) => {
      formData.append(key, clothState[key]);
    });

    if (!route?.params?.clothState?.id) {
      appendFilesToFormData(pictures, formData);
    } else {
      const filteredPictures = pictures.filter(
        (photo) => photo.selectedOrUploaded
      );
      appendFilesToFormData(filteredPictures, formData);

      formData.append(
        "pictures",
        JSON.stringify(findUploadedPictures(pictures))
      );
      formData.append("deletedPictures", JSON.stringify(deletedImages));
    }

    try {
      setLoading(true);
      if (route?.params?.clothState?.id) {
        await axios.patch(`/sales/${route.params.clothState.id}`, formData);
        setLoading(false);
        Alert.alert("Cloth Updated succesfully!");
      } else {
        await axios.post("/sales/", formData);
        setLoading(false);
        Alert.alert("Cloth Listed for Sale succesfully!");
      }
      navigation.replace("MyListingScreen");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.errMessage);
      Alert.alert(err.response.data.errMessage || err);
    }
  };

  const validateInputRef = useRef();

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <CameraComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleImageUpload={handleImageUpload}
      />
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 3 of 3</Caption>
        <Title style={styles.ModalHeader}>Add pictures 📷</Title>
        <Caption style={styles.ModalFooter}>
          You are allowed to upload a maximum of 4 images. Please ensure to
          include clear pictures of the clothing item.
        </Caption>
      </View>

      <View style={styles.PhotoContainer}>
        {pictures.map((image, index) => (
          <View key={index} style={styles.ImageWrapper}>
            <Image
              style={styles.Image}
              source={{
                uri: image.selectedOrUploaded ? image.image.uri : image.image,
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => onDeleteImage(index)}
              style={styles.DeleteButton}
            >
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        {pictures.length < 4 && (
          <Animatable.View ref={validateInputRef}>
            <TouchableOpacity
              onPress={onOpenActionSheet}
              style={styles.SingleImageWrapper}
            >
              <View style={styles.ColumnFlex}>
                <Icon name="add" size={50} color="#000" />
                <Caption style={{ marginTop: 10, color: "#000" }}>
                  Add Images
                </Caption>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
          {!loading ? (
            <Caption style={styles.alignedText}>
              {route?.params?.clothState?.id
                ? "Update Listing"
                : "Post for Sale"}
            </Caption>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </TouchableOpacity>
        {error !== "" && (
          <Caption
            style={{
              ...styles.error,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {error}
          </Caption>
        )}
      </View>
    </ScrollView>
  );
});
