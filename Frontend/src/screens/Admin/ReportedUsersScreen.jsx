import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";
import { AdminListCard } from "../../components/AdminCard";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";

const ReportedUsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onOpenActionSheet = (id) => {
    showActionSheetWithOptions(
      {
        options: ["Delete Report", "Delete Book", "Cancel"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          deleteReport(id);
        }
        if (buttonIndex === 1) {
          deleteItem(id);
        }
      }
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReportedUsers();
    setRefreshing(false);
  };

  const fetchReportedUsers = async () => {
    try {
      const { data } = await axios.get("/admin/users/reports");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    try {
      await axios.delete("/users/" + id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItem = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchReportedUsers();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && users.length === 0) {
    return (
      <EmptyListPlaceholder>
        There aren't any reported users in this platform yet!
      </EmptyListPlaceholder>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <Loader loading={loading} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={({ _id }) => _id}
          data={users}
          renderItem={({ item }) => (
            <AdminListCard
              handleBookDeletion={onOpenActionSheet}
              navigation={navigation}
              users
              item={item}
            />
          )}
        />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default ReportedUsersScreen;
