import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import AdminCard from "../../components/AdminCard";
import FloatingButton from "../../components/FloatingButton";

const UserScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/admin/users");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUserDeletion = async (id) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      Alert.alert("User and all associated posts deleted successfully!");
    } catch (error) {
      Alert.alert(
        "Failed to delete the user",
        error.response?.data?.error || error
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchUsers();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader loading={loading} />
      {!loading && users.length === 0 ? (
        <EmptyListPlaceholder>
          Currently, there aren't any users in the platform
        </EmptyListPlaceholder>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={({ _id }) => _id}
          data={users}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.push("Profile", { id: item._id })}
                activeOpacity={1}
                underlayColor="#eee"
              >
                <AdminCard
                  handleBookDeletion={handleUserDeletion}
                  navigation={navigation}
                  item={item}
                  users
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 15,
          right: 10,
        }}
      >
        <FloatingButton
          onPress={() => navigation.push("AddAdminScreen")}
          color="#fff"
          backgroundColor="#4338ca"
          iconName="add"
        />
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
