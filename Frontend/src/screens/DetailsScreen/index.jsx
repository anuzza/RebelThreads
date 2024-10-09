import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import FloatingButton from "../../components/FloatingButton";
import HorizontalLine from "../../components/HorizontalLine";

import { sendEmail, sendSMS } from "../../utils/contact";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/auth";
import { Caption } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const DetailsScreen = ({ navigation, route }) => {
  const [cloth, setCloth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const bookmarkExists =
    user.bookmarks.find((bookmark) => bookmark === cloth?._id) !== undefined;
  const dispatch = useDispatch();
  const notAllowed = (cloth && user._id === cloth.seller._id) || user.isAdmin;

  const fetchBook = async (id) => {
    try {
      const { data } = await axios.get("/sales/" + id);
      setCloth(data);
      setLoading(false);
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBook(route?.params?.id);
    }, [route])
  );

  const handleBookmarks = async () => {
    try {
      if (bookmarkExists) {
        await axios.delete("/users/bookmark/" + cloth?._id);
        dispatch(loadUser());
      } else {
        await axios.post("/users/bookmark/" + cloth?._id);
        dispatch(loadUser());
      }
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
    }
  };

  const handleReport = async () => {
    try {
      await axios.post("/sales/report/" + cloth?._id);
      Alert.alert("Post reported successfully");
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Loader loading={loading} />

      {/* Image Carousel */}
      <View>
        <FlatList
          data={cloth?.pictures}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const currentIndex = Math.round(contentOffsetX / width);
            setCurrentImageIndex(currentIndex);
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              style={styles.image}
              source={{
                uri: item,
              }}
              resizeMode="contain"
            />
          )}
        />

        {/* Carousel Indicator */}
        {cloth && (
          <View style={styles.carouselIndicator}>
            <Text style={styles.indicatorText}>
              {currentImageIndex + 1}/{cloth.pictures.length}
            </Text>
          </View>
        )}

        {/* Close and Report Button */}

        {cloth && user._id !== cloth.seller._id && !user.isAdmin && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Report Post",
                "Are you sure you want to report this post?",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Report", onPress: handleReport },
                ]
              );
            }}
            style={styles.reportButton}
          >
            <Icon name="warning-outline" color="#FF6347" size={35}></Icon>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        {!notAllowed && (
          <View style={styles.bookmarkIcon}>
            <FloatingButton
              onPress={handleBookmarks}
              color="red"
              backgroundColor="#fff"
              iconName={!bookmarkExists ? "heart-outline" : "heart"}
            />
          </View>
        )}

        {/* Title, Posted By, and Date */}
        <View style={styles.detailsSection}>
          <Text style={styles.title}>{cloth?.clothing.title}</Text>
          <View style={styles.organizerInfo}>
            <View style={styles.organizerInfo}>
              <Text style={styles.infoText}>Posted by </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("Profile", { id: cloth?.seller?._id })
                }
                style={{ padding: 0 }}
              >
                <Text style={styles.organizer}>{cloth?.seller.name}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>
              {moment(cloth?.updatedAt).fromNow()}
            </Text>
          </View>
        </View>
        {/* Description */}
        <Text style={styles.description}>
          Description: {cloth?.clothing.description}
        </Text>
        {/* Brand and Size */}
        <View style={styles.brandSizeContainer}>
          <Text style={styles.infoText}>
            Brand: <Text style={styles.brandText}>{cloth?.clothing.brand}</Text>
          </Text>
          <Text style={styles.separator}>|</Text>
          {/* A separator for a cleaner look */}
          <Text style={styles.infoText}>
            Size: <Text style={styles.sizeText}>{cloth?.clothing.size}</Text>
          </Text>
          <Text style={styles.separator}>|</Text>
          {/* A separator for a cleaner look */}
          <Text style={styles.infoText}>
            Category:{" "}
            <Text style={styles.sizeText}>{cloth?.clothing.category}</Text>
          </Text>
        </View>
        <HorizontalLine marginTop={10} marginBottom={10} />

        {/* Price, Condition, and Gender */}
        <View style={styles.amountConditionContainer}>
          <View style={styles.amountConditionInfo}>
            <Text style={styles.amountConditionKey}>Price</Text>
            <Text style={[styles.price, cloth?.price === 0 && styles.free]}>
              {cloth?.price === 0 ? "$ Free" : `$${cloth?.price.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.amountConditionInfo}>
            <Text style={styles.amountConditionKey}>Condition</Text>
            <Text
              style={[
                styles.conditionText,
                {
                  backgroundColor:
                    cloth?.clothing.condition === "New"
                      ? "#4e9049" // Bright Green for "New"
                      : cloth?.clothing.condition === "Like New"
                      ? "#5DADE2" // Light Blue for "Like New"
                      : cloth?.clothing.condition === "Good"
                      ? "#F39C12" // Orange for "Good"
                      : cloth?.clothing.condition === "Fair"
                      ? "#F4D03F" // Amber/Yellow for "Fair"
                      : "#BDC3C7",
                },
              ]}
            >
              {cloth?.clothing.condition}
            </Text>
          </View>
          <View style={styles.amountConditionInfo}>
            <Text style={styles.amountConditionKey}>Gender</Text>
            <Text style={styles.amountConditionValue}>
              {cloth?.clothing.gender}
            </Text>
          </View>
        </View>

        {!notAllowed && (
          <View style={styles.contactContainer}>
            <HorizontalLine marginBottom={10} />
            <Text style={styles.contactOptions}>Contact Via:</Text>

            <View style={styles.buttonContainer}>
              <FloatingButton
                onPress={() =>
                  sendEmail(
                    cloth?.seller?.email,
                    cloth?.seller?.name,
                    cloth?.clothing?.title
                  )
                }
                iconName="mail"
                size={20}
                backgroundColor="#FFB347"
                color="#fff"
              />

              <FloatingButton
                onPress={() =>
                  sendSMS(
                    cloth?.seller?.phone,
                    cloth?.seller?.name,
                    cloth?.clothing?.title
                  )
                }
                marginLeft={20}
                size={20}
                backgroundColor="#4CAF50"
                color="#fff"
                iconName="chatbubble-ellipses"
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.4,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  reportButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 10,
  },

  container: {
    padding: 16,
  },
  bookmarkIcon: {
    position: "absolute",
    top: -30,
    right: 20,
    zIndex: 1,
  },
  detailsSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 3,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 10,
  },
  organizerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    color: "#666",
    fontSize: 15,
    textAlignVertical: "center",
  },
  organizer: {
    color: "#4338ca",
    fontWeight: "bold",
    fontSize: 15,
  },
  amountConditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  amountConditionInfo: {
    alignItems: "center",
  },
  amountConditionKey: {
    fontSize: 16,
    color: "#666",
  },
  amountConditionValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactContainer: {
    marginTop: 20,
  },
  contactOptions: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  carouselIndicator: {
    position: "absolute",
    top: 10,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  indicatorText: {
    color: "#fff",
    fontSize: 14,
  },
  brandSizeContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensures everything is vertically aligned
    marginTop: 10,
  },
  brandText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  separator: {
    marginHorizontal: 6, // Adds space around the separator
    color: "#999", // Light color for the separator
    fontSize: 13,
  },
  conditionText: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  free: {
    color: "#4CAF50", // Green color for "Free"
  },
});

export default DetailsScreen;
