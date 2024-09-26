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
    if (route?.params?.bookState) {
      setPictures(
        route?.params?.bookState?.pictures
          ? route.params.bookState.pictures.map((picture) => {
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
      const bookState = {
        isbn: route?.params?.bookState?.isbn,
        title: route?.params?.bookState?.title,
        edition: route?.params?.bookState?.edition,
        authors: route?.params.bookState?.authors,
        amount: route?.params?.bookState?.amount,
        condition: route?.params?.bookState?.condition,
        course_name: route?.params?.bookState?.course_name,
        course_code: route?.params?.bookState?.course_code,
      };
      Object.keys(bookState).forEach((key) => {
        formData.append(key, bookState[key]);
      });
      if (!route?.params?.bookState?.id) {
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
        if (route?.params?.bookState?.id) {
          await axios.patch(`/sales/${route.params.bookState.id}`, formData);
          setLoading(false);
          Alert.alert("Book Updated succesfully!");
        } else {
          await axios.post("/sales/", formData);
          setLoading(false);
          Alert.alert("Book Listed for Sale succesfully!");
        }
        navigation.replace("SoldBooksScreen");
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
        <Caption style={styles.StepText}>Step 4 of 4</Caption>
        <Title stule={styles.ModalHeader}>Time to take a picture 📷</Title>
        <Caption stule={styles.ModalFooter}>
          You are allowed to upload a max of 2 images. Make sure to take picture
          of both the front view and the rear view of the book
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
