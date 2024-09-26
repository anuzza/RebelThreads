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
    if (picture.selectedOrUploaded === false) {
      images.push(picture.image);
    }
  });
  return images;
};

export const CameraScreen = connectActionSheet(({ route, navigation }) => {
  const [modalVisible, setModalVisable] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (route?.params?.clothState) {
      setPictures(
        route?.params?.clothState?.pictures
          ? route.params.clothState.pictures.map((picture) => {
              return { image: picture, selectedOrUploaded: false };
            })
          : []
      );
    }
  }, [route]);

  const handleImageUpload = (image) => {
    setPictures(
      pictures.concat({
        image: image,
        selectedOrUploaded: true,
      })
    );
    setError("");
  };

  const handleImageSelection = async () => {
    const result = await showImagePicker();

    if (!result.cancelled) {
      setPictures(
        pictures.concat({
          image: result,
          selectedOrUploaded: true,
        })
      );
      setError("");
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
        if (buttonIndex == 0) {
          handleImageSelection();
        }
        if (buttonIndex == 1) {
          setModalVisable(true);
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

  const onFormSubmit = async () => {
    if (pictures.length === 0) {
      setError("Please select atleast one picture!");
      validateInputRef.current.shake(800);
    } else {
      setError("");
      const formData = new FormData();
      const clothState = {
        title: route?.params?.clothState?.title,
        description: route?.params?.clothState?.description,
        brand: route?.params?.clothState?.brand,
        size: route?.params.clothState?.size,
        price: route?.params?.clothState?.price,
        condition: route?.params?.clothState?.condition,
        category: route?.params?.clothState?.category,
        gender: route?.params?.clothState?.gender,
      };
      Object.keys(clothState).forEach((key) => {
        formData.append(key, clothState[key]);
      });
      if (!route?.params?.clothState?.id) {
        pictures.forEach((photo) => {
          formData.append("files", {
            name: photo.image.uri,
            type: photo.image.type + "/jpeg",
            uri: photo.image.uri,
          });
        });
      } else {
        pictures.forEach((photo) => {
          if (photo.selectedOrUploaded) {
            formData.append("files", {
              name: photo.image.uri,
              type: photo.image.type + "/jpeg",
              uri: photo.image.uri,
            });
          }
        });
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
          Alert.alert("cloth Updated succesfully!");
        } else {
          await axios.post("/sales/", formData);
          setLoading(false);
          Alert.alert("cloth Listed for Sale succesfully!");
        }
        navigation.replace("SoldclothsScreen");
      } catch (err) {
        setError(err.response.data.errMessage);
        setLoading(false);
      }
    }
  };

  const validateInputRef = useRef();

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <CameraComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisable}
        handleImageUpload={handleImageUpload}
      />
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 3 of 3</Caption>
        <Title stule={styles.ModalHeader}>Time to take a picture 📷</Title>
        <Caption stule={styles.ModalFooter}>
          You are allowed to upload a maximum of 5 images. Please ensure to
          include clear pictures of the clothing item.
        </Caption>
      </View>
      {pictures.length === 0 && (
        <Animatable.View ref={validateInputRef}>
          <TouchableOpacity
            style={styles.ActionButton}
            onPress={() => setModalVisable(true)}
          >
            <View style={styles.RowFlex}>
              <Icon name="camera" size={25} />
              <Caption style={styles.ActionText}>Take photo</Caption>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ActionButton}
            onPress={handleImageSelection}
          >
            <View style={styles.RowFlex}>
              <Icon name="image" size={25} />
              <Caption style={styles.ActionText}>Select photo</Caption>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}

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
              <Icon name="trash" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        {pictures.length === 1 && (
          <TouchableOpacity
            onPress={onOpenActionSheet}
            style={styles.SingleImageWrapper}
          >
            <View style={styles.ColumnFlex}>
              <Icon name="add" size={50} color="#000" />
              <Caption style={{ marginTop: 10, color: "#000" }}>
                Using 1/2 images
              </Caption>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
          {!loading ? (
            <Caption style={styles.alignedText}>Post for Sale</Caption>
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
