import React, { useState } from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import FloatingButton from "./FloatingButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons as Icon } from "@expo/vector-icons";
import { sendEmail, sendSMS } from "../utils/contact";
import moment from "moment";
import { Caption } from "react-native-paper";
import { openTwoButtonAlert } from "../utils/alert";
import axios from "../utils/axios";
import { cardStyles as styles } from "../constants/sharedCardStyles";

const LeftSwipeActions = ({ item, requests, handleClothAlteration }) => {
  return (
    <View style={styles.leftSwipeActionContainer}>
      <TouchableOpacity onPress={() => handleClothAlteration(item._id)}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Mark as {requests ? "Found" : "Sold"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const RightSwipeActions = ({
  item,
  handleClothDeletion,
  active,
  bookmarks,
  handleClothUpdation,
}) => {
  return (
    <View
      style={{
        ...styles.rightSwipeActionContainer,
        marginBottom: bookmarks ? 40 : 20,
      }}
    >
      {active && !bookmarks && (
        <TouchableOpacity
          onPress={() => handleClothUpdation(item)}
          style={{
            backgroundColor: "#eec643",
            ...styles.rightSwipeButtonContainer,
          }}
        >
          <Icon color="#fff" size={20} name="pencil" />
        </TouchableOpacity>
      )}
      {active && !bookmarks && (
        <View
          style={{
            borderRightWidth: 1,
            height: "100%",
            borderColor: "#fff",
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => handleClothDeletion(item._id)}
        style={{
          backgroundColor: "#D91848",
          width: bookmarks && 100,
          borderTopRightRadius: !bookmarks ? 10 : 0,
          borderBottomRightRadius: !bookmarks ? 10 : 0,
          ...styles.rightSwipeButtonContainer,
        }}
      >
        <Icon color="#fff" size={bookmarks ? 30 : 20} name="trash" />
      </TouchableOpacity>
    </View>
  );
};

export const ListCard = ({
  item,
  handleClothDeletion,
  handleClothAlteration,
  handleClothUpdation,
  requests,
  profile,
}) => {
  const [swiped, setSwiped] = useState(false);
  const {
    book: { title },
    createdAt,
    active,
  } = item;
  const returnValue = (
    <View
      style={{
        ...styles.card,
        ...styles.feedCard,
        flexDirection: "column",
        backgroundColor: profile ? "#eee" : "#fff",
        opacity: !profile && !active ? 0.3 : 1,
        borderRadius: !swiped ? 10 : 0,
      }}
    >
      <Text
        style={
          !profile
            ? {
                ...styles.title,
                marginTop: 10,
              }
            : {
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 5,
              }
        }
      >
        {title}
      </Text>
      <View
        style={{
          ...styles.subInformation,
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.info}>
          {requests ? "Requested" : "Posted"} {moment(createdAt).fromNow()}
        </Text>

        {!profile && (
          <Text style={{ ...styles.info }}>
            Status:{" "}
            <Text
              style={{
                color: active ? "#4BB543" : "#D91848",
                fontWeight: "bold",
              }}
            >
              {active ? "Active" : requests ? "Found" : "Sold"}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );

  if (profile) {
    return returnValue;
  }
  return active ? (
    <Swipeable
      renderLeftActions={() => (
        <LeftSwipeActions
          item={item}
          handleClothAlteration={handleClothAlteration}
          requests={requests}
          active={active}
        />
      )}
      renderRightActions={() => (
        <RightSwipeActions
          item={item}
          handleClothDeletion={handleClothDeletion}
          handleClothUpdation={handleClothUpdation}
          active={active}
        />
      )}
      onSwipeableOpen={() => setSwiped(true)}
      onSwipeableClose={() => setSwiped(false)}
    >
      {returnValue}
    </Swipeable>
  ) : (
    <Swipeable
      renderRightActions={() => (
        <RightSwipeActions
          item={item}
          handleClothDeletion={handleClothDeletion}
          active={active}
        />
      )}
      onSwipeableOpen={() => setSwiped(true)}
      onSwipeableClose={() => setSwiped(false)}
    >
      {returnValue}
    </Swipeable>
  );
};

const Card = ({ item, feed, bookmarks, navigation, handleClothDeletion }) => {
  if (feed) {
    const {
      _id,
      user: { name, avatar, email, phone },
      clothing: { title, brand, size, gender, description },
      createdAt,
    } = item;

    const handleReport = async () => {
      try {
        await axios.post("/requests/report/" + _id);
        Alert.alert("Book reported succesfully");
      } catch (error) {
        Alert.alert(
          error?.response?.data ? error.response.data.error : error.message
        );
      }
    };

    return (
      <View
        style={{
          ...styles.card,
          ...styles.feedCard,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.push("Profile", { id: item.user._id })}
        >
          <Image
            style={styles.avatarImage}
            source={{
              uri: avatar
                ? avatar
                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.requestFeedContainer}>
          <View style={styles.requestUserContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.date}>{moment(createdAt).fromNow()}</Text>
          </View>
          <View style={{ width: "90%", flexGrow: 1, flex: 1 }}>
            <Text
              style={{
                ...styles.title,

                marginTop: 10,
              }}
            >
              {title}
            </Text>
          </View>

          <View style={{ ...styles.subInformation, marginTop: 10 }}>
            <Text style={styles.info}>{description}</Text>
          </View>
          <View style={{ ...styles.subInformation, marginTop: 10 }}>
            <Text style={{ ...styles.info }}>Brand: {brand}</Text>
            <View
              style={{
                borderRightWidth: 1,
                height: "100%",
                borderColor: "#A89E9E",
                marginLeft: 5,
                marginRight: 5,
              }}
            />
            <Text style={styles.info}>Size: {size} </Text>
          </View>
          <View style={{ ...styles.subInformation, marginTop: 10 }}>
            <Text style={styles.info}>Gender: {gender} </Text>
          </View>
          <View
            style={{ ...styles.subInformation, marginTop: 15, width: "80%" }}
          >
            <FloatingButton
              onPress={() => sendSMS(phone, title, true)}
              marginLeft={20}
              size={25}
              padding={10}
              color="#fff"
              backgroundColor="#74758C"
              iconName="chatbubbles"
            />
            <TouchableOpacity
              onPress={() =>
                openTwoButtonAlert(
                  "Are you sure you want to report this book?",
                  handleReport
                )
              }
              style={{
                marginLeft: "auto",
                flexWrap: "wrap",
              }}
            >
              <Caption
                style={{ color: "#A89E9E", fontSize: 15, fontWeight: "bold" }}
              >
                Report
              </Caption>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    // const {
    //   clothing: { title, brand, size, gender, description, condition },
    //   pictures,
    //   active,
    //   price,
    // } = item;
    // const cardValue = (
    //   <View style={[styles.card, { opacity: !active && bookmarks ? 0.6 : 1 }]}>
    //     <View
    //       style={{
    //         position: "relative",
    //         borderColor: "#fff",
    //         borderRadius: 10,
    //       }}
    //     >
    //       <Image
    //         style={styles.image}
    //         source={{
    //           uri: pictures[0],
    //         }}
    //         resizeMode="cover"
    //       />

    //       {bookmarks && !active && (
    //         <View style={styles.overlay}>
    //           <Text style={styles.soldText}>SOLD</Text>
    //         </View>
    //       )}
    //     </View>
    //     <View style={{ padding: 10 }}>
    //       <Text style={styles.title}>{title}</Text>
    //       <View style={styles.subInformation}>
    //         <Text style={styles.info}>Brand: {brand} </Text>
    //       </View>
    //       <View style={styles.subInformation}>
    //         <Text style={{ ...styles.info, flexWrap: "wrap" }}>
    //           {" "}
    //           Size: {size}
    //         </Text>
    //         <View
    //           style={{
    //             borderRightWidth: 1,
    //             height: "100%",
    //             borderColor: "#A89E9E",
    //             marginLeft: 5,
    //             marginRight: 5,
    //           }}
    //         />
    //         <Text style={{ ...styles.info, flexWrap: "wrap" }}>
    //           {" "}
    //           Gender: {gender}
    //         </Text>
    //       </View>
    //       <View style={styles.subInformation}>
    //         <View style={styles.priceContainer}>
    //           <Text style={styles.alignedText}>${price.toFixed(2)}</Text>
    //         </View>
    //         <View
    //           style={[
    //             styles.priceContainer,
    //             {
    //               backgroundColor: condition === "New" ? "#a2d729" : "#eec643",
    //             },
    //           ]}
    //         >
    //           <Text style={styles.alignedText}>{condition}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // );
    const {
      clothing: { title, brand, size, gender, description, condition },
      pictures,
      active,
      price,
    } = item;

    const cardValue = (
      <View style={[styles.card, { opacity: !active && bookmarks ? 0.6 : 1 }]}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: pictures[0],
            }}
            resizeMode="cover"
          />
          {/* Sold Overlay */}
          {bookmarks && !active && (
            <View style={styles.overlay}>
              <Text style={styles.soldText}>SOLD</Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          {/* Brand and Size Row */}
          <View style={styles.row}>
            <Text style={styles.infoText}>Brand: {brand}</Text>
            <Text style={styles.infoText}>Size: {size}</Text>
          </View>

          {/* Price Row */}
          <View style={styles.row}>
            <Text style={[styles.price, price === 0 && styles.free]}>
              {price === 0 ? "$ Free" : `$${price.toFixed(2)}`}
            </Text>
            <Text
              style={[
                styles.conditionText,
                {
                  backgroundColor:
                    condition === "New"
                      ? "#4e9049" // Bright Green for "New"
                      : condition === "Like New"
                      ? "#5DADE2" // Light Blue for "Like New"
                      : condition === "Good"
                      ? "#F39C12" // Orange for "Good"
                      : condition === "Fair"
                      ? "#F4D03F" // Amber/Yellow for "Fair"
                      : "#BDC3C7",
                  borderRadius: 20,
                },
              ]}
            >
              {condition}
            </Text>
          </View>
        </View>
      </View>
    );

    return bookmarks ? (
      <Swipeable
        renderRightActions={() => (
          <RightSwipeActions
            handleClothDeletion={handleClothDeletion}
            bookmarks={bookmarks}
            active={active}
            item={item}
          />
        )}
      >
        {cardValue}
      </Swipeable>
    ) : (
      cardValue
    );
  }
};

export default Card;
