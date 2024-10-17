import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { cardStyles as styles } from "../constants/sharedCardStyles";
import moment from "moment";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Caption } from "react-native-paper";

const RightSwipeActions = ({ item, handleClothDeletion, listCard }) => {
  return (
    <View
      style={{
        ...styles.rightSwipeActionContainer,
        marginBottom: listCard ? 20 : 40,
      }}
    >
      <TouchableOpacity
        onPress={() => handleClothDeletion(item._id)}
        style={{
          backgroundColor: "#D91848",
          width: 100,
          borderTopRightRadius: listCard ? 10 : 0,
          borderBottomRightRadius: listCard ? 10 : 0,
          ...styles.rightSwipeButtonContainer,
        }}
      >
        <Icon color="#fff" size={!listCard ? 30 : 20} name="trash" />
      </TouchableOpacity>
    </View>
  );
};

export const AdminListCard = ({
  item,
  users,
  navigation,
  handleClothDeletion,
}) => {
  const [swiped, setSwiped] = useState(false);
  let cardValue;
  if (users) {
    const { name, avatar, _id, reporter, date } = item;
    cardValue = (
      <View
        style={{
          ...styles.card,
          ...styles.feedCard,
          backgroundColor: "#fff",
          borderRadius: !swiped ? 10 : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.push("Profile", { id: reporter._id })}
        >
          <Image
            style={styles.avatarImage}
            source={{
              uri: reporter.avatar
                ? reporter.avatar
                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.requestFeedContainer}>
          <View style={styles.requestUserContainer}>
            <Text style={styles.userName}>
              {reporter.name}{" "}
              <Caption
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  fontSize: 13,
                }}
              >
                reported
              </Caption>
            </Text>
            <Text style={styles.date}>{moment(date).fromNow()}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.push("Profile", { id: _id })}
            style={{ width: "90%", flexGrow: 1, flex: 1 }}
          >
            <Text
              style={{
                ...styles.title,
                color: "#fa824c",
                marginTop: 10,
              }}
            >
              {name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    const {
      clothing: { title },
      _id,
      date,
      seller,
      reporter,
    } = item;
    cardValue = (
      <View
        style={{
          ...styles.card,
          ...styles.feedCard,
          backgroundColor: "#fff",
          borderRadius: !swiped ? 10 : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.push("Profile", { id: reporter._id })}
        >
          <Image
            style={styles.avatarImage}
            source={{
              uri: reporter.avatar
                ? reporter.avatar
                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.requestFeedContainer}>
          <View style={styles.requestUserContainer}>
            <Text style={styles.userName}>
              {reporter.name}{" "}
              <Caption
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  fontSize: 13,
                }}
              >
                reported
              </Caption>
            </Text>
            <Text style={styles.date}>{moment(date).fromNow()}</Text>
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

          <View
            style={{
              ...styles.subInformation,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                ...styles.info,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Posted By:
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push("Profile", { id: seller._id })}
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              <Caption
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "#fa824c",
                  marginLeft: 5,
                  alignSelf: "center",
                }}
              >
                {seller.name}
              </Caption>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <Swipeable
      renderRightActions={() => (
        <RightSwipeActions
          listCard
          handleClothDeletion={handleClothDeletion}
          item={item}
        />
      )}
      onSwipeableOpen={() => setSwiped(true)}
      onSwipeableClose={() => setSwiped(false)}
    >
      {cardValue}
    </Swipeable>
  );
};

const AdminCard = ({ item, feed, navigation, handleClothDeletion, users }) => {
  const [swiped, setSwiped] = useState(false);
  let cardValue;
  if (feed) {
    const {
      _id,
      user: { name, avatar, email, phone },
      clothing: { title, size, condition },
      createdAt,
    } = item;

    cardValue = (
      <View
        style={{
          ...styles.card,
          ...styles.feedCard,
          borderRadius: !swiped ? 10 : 0,
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
            <Text style={styles.info}>Size: {size}</Text>
            <View
              style={{
                borderRightWidth: 1,
                height: "100%",
                borderColor: "#A89E9E",
                marginLeft: 5,
                marginRight: 5,
              }}
            />
            <Text style={{ ...styles.info }}>Condition: {condition}</Text>
          </View>
        </View>
      </View>
    );
  } else if (users) {
    const { name, avatar, email, createdAt } = item;
    cardValue = (
      <View style={[styles.card, { width: "95%", alignSelf: "center" }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: avatar
                ? avatar
                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.subInformation}>
            <Text style={styles.info}>
              Joined on {moment(createdAt).format("MMM DD, YYYY")}
            </Text>
          </View>
          <View style={styles.subInformation}>
            <View style={styles.types}>
              <Text style={styles.type}>Email: {email}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    const {
      clothing: { title, size, condition, brand },
      pictures,
      active,
      price,
    } = item;
    cardValue = (
      <View style={[styles.card, { width: "95%", alignSelf: "center" }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: pictures[0],
            }}
            resizeMode="cover"
          />
        </View>
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
                  borderRadius: 0,
                },
              ]}
            >
              {condition}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <Swipeable
      renderRightActions={() => (
        <RightSwipeActions
          listCard={feed}
          handleClothDeletion={handleClothDeletion}
          item={item}
        />
      )}
      onSwipeableOpen={() => setSwiped(true)}
      onSwipeableClose={() => setSwiped(false)}
    >
      {cardValue}
    </Swipeable>
  );
};

export default AdminCard;
