import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { cardStyles as styles } from "../constants/sharedCardStyles";
import moment from "moment";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Caption } from "react-native-paper";

const RightSwipeActions = ({ item, handleBookDeletion, listCard }) => {
  return (
    <View
      style={{
        ...styles.rightSwipeActionContainer,
        marginBottom: listCard ? 20 : 40,
      }}
    >
      <TouchableOpacity
        onPress={() => handleBookDeletion(item._id)}
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
  handleBookDeletion,
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
      book: { title },
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
          handleBookDeletion={handleBookDeletion}
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

const AdminCard = ({ item, feed, navigation, handleBookDeletion, users }) => {
  const [swiped, setSwiped] = useState(false);
  let cardValue;
  if (feed) {
    const {
      _id,
      user: {
        name,
        avatar,
        email,
        contact_number: { value, visibility },
      },
      book: { title, edition, isbn },
      course_code,
      course_name,
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
            <Text style={styles.info}>
              For {course_name} {course_code}
            </Text>
            <View
              style={{
                borderRightWidth: 1,
                height: "100%",
                borderColor: "#A89E9E",
                marginLeft: 5,
                marginRight: 5,
              }}
            />
            <Text style={{ ...styles.info }}>ISBN {isbn}</Text>
          </View>
          <View style={{ ...styles.subInformation, marginTop: 10 }}>
            <Text style={styles.info}>Edition: {edition} </Text>
          </View>
        </View>
      </View>
    );
  } else if (users) {
    const { name, avatar, major, classification, email, createdAt } = item;
    cardValue = (
      <View style={[styles.card]}>
        <View
          style={{
            position: "relative",
            borderTopWidth: 1,
            borderColor: "#bebfc4",
          }}
        >
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
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.subInformation}>
            <Text style={styles.info}>
              Joined on {moment(createdAt).format("MMM DD, YYYY")}
            </Text>
          </View>
          <View style={styles.subInformation}>
            <View style={styles.types}>
              <Text style={styles.type}>{major}</Text>
              <Text style={styles.type}>{classification}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    const {
      book: { title, isbn, edition },
      pictures,
      condition,
      active,
      amount,
    } = item;
    cardValue = (
      <View style={[styles.card]}>
        <View
          style={{
            position: "relative",
            borderTopWidth: 1,
            borderColor: "#bebfc4",
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: pictures[0],
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subInformation}>
            <Text style={styles.info}>{edition}th edition </Text>
            <View
              style={{
                borderRightWidth: 1,
                height: "100%",
                borderColor: "#A89E9E",
                marginLeft: 5,
                marginRight: 5,
              }}
            />
            <Text style={{ ...styles.info, flexWrap: "wrap" }}>
              {" "}
              ISBN {isbn}
            </Text>
          </View>
          <View style={styles.subInformation}>
            <View style={styles.priceContainer}>
              <Text style={styles.alignedText}>${amount.toFixed(2)}</Text>
            </View>
            <View
              style={[
                styles.priceContainer,
                {
                  backgroundColor: condition === "NEW" ? "#a2d729" : "#eec643",
                },
              ]}
            >
              <Text style={styles.alignedText}>{condition}</Text>
            </View>
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
          handleBookDeletion={handleBookDeletion}
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
