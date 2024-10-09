import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Avatar, Caption, Title } from "react-native-paper";
import { ListCard } from "../../components/Card";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../../components/Loader";
import { openTwoButtonAlert } from "../../utils/alert";

const ProfileScreen = ({ route, navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  const fetchUser = async (id) => {
    try {
      const { data } = await axios.get("/users/" + id);
      setProfile(data);
      console.log(profile);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchUser(
        route && route.params && route.params.id ? route.params.id : user._id
      );
      return () => {
        isActive = false;
      };
    }, [route, user])
  );

  const handleReport = async () => {
    try {
      await axios.post("/users/report/" + profile?.id);
      Alert.alert("User reported succesfully");
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
    }
  };

  const clothesWrapper =
    !loading && profile?.clothForSale && profile.selling > 0 ? (
      profile?.clothForSale.map((item) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => navigation.push("Details", { id: item._id })}
          activeOpacity={1}
          underlayColor="#eee"
        >
          <ListCard item={item} profile />
        </TouchableOpacity>
      ))
    ) : (
      <Caption style={{ fontSize: 15 }}>
        {route?.params?.id ? "This user is" : "You are"} not selling any book
        right now!
      </Caption>
    );

  return (
    <ScrollView style={styles.Container}>
      <Loader loading={loading} />
      <View style={styles.TopContainer}>
        <View style={styles.TopButtonContainer}>
          {profile && user && profile.id === user._id && (
            <TouchableOpacity
              style={styles.Icon}
              onPress={() => navigation.push("Edit Profile")}
            >
              <Icon style={styles.Icon} name="create-outline" />
            </TouchableOpacity>
          )}
          {profile && user && profile.id !== user._id && !user.isAdmin && (
            <TouchableOpacity
              style={styles.Icon}
              onPress={() => {
                openTwoButtonAlert(
                  "Are you sure you want to report this user?",
                  handleReport
                );
              }}
            >
              <Icon name="warning-outline" color="black" size={35}></Icon>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.InformationWrapper}>
          <Avatar.Image
            source={{
              uri: profile?.avatar
                ? profile.avatar
                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            }}
            size={100}
          />

          <Title style={styles.Title}>{profile?.name}</Title>
          <Caption style={styles.Caption}>{profile?.email}</Caption>
        </View>
        <View style={styles.BookWrapper}>
          <View style={styles.ColumnContainer}>
            <Title style={styles.Value}>{profile?.selling}</Title>
            <Caption style={styles.Key}>Selling</Caption>
          </View>
          <View style={styles.ColumnContainer}>
            <Title style={styles.Value}>{profile?.sold}</Title>
            <Caption style={styles.Key}>Sold</Caption>
          </View>
          <View style={styles.ColumnContainer}>
            <Title style={styles.Value}>{profile?.requested}</Title>
            <Caption style={styles.Key}>Requested</Caption>
          </View>
        </View>
      </View>
      <View style={styles.MiddleContainer}>
        <Title style={styles.MainTopic}>Recently Selling</Title>
        {clothesWrapper}
      </View>
      <View style={{ borderBottomColor: "#e5e5e5", borderBottomWidth: 1 }} />
      <View style={styles.BottomContainer}>
        <Title style={styles.MainTopic}>More Info</Title>
        <View style={styles.types}>
          <Text style={styles.type}>{profile?.major}</Text>
          <Text style={styles.type}>{profile?.classification}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: { flex: 1, flexDirection: "column", backgroundColor: "#fafafa" },
  TopContainer: {
    backgroundColor: "#E6E6FA",
    padding: 20,
  },
  TopButtonContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  Icon: {
    color: "black",
    fontSize: 30,
  },
  InformationWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  Title: { fontWeight: "bold", color: "black", fontSize: 25, marginTop: 15 },
  Caption: { fontSize: 15, color: "black", marginBottom: 15 },
  BookWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ColumnContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  Value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  Key: {
    fontSize: 15,
    color: "black",
  },
  MiddleContainer: {
    padding: 20,
  },
  MainTopic: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  BottomContainer: {
    padding: 20,
  },
  types: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
  },
  type: {
    fontSize: 14,
    color: "#74758C",
    textAlign: "center",
    borderWidth: 1,
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "#d6d7db",
    marginRight: 10,
    borderRadius: 5,
    padding: 8,
  },
});

export default ProfileScreen;
