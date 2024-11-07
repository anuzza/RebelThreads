import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  RefreshControl,
  Text,
  Alert,
} from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";
import { AdminListCard } from "../../components/AdminCard";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ReportedUsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

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

  const onOpenActionSheet = (id, reportId) => {
    showActionSheetWithOptions(
      {
        options: ["Delete Report", "Delete User", "Cancel"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          deleteReport(id, reportId);
        }
        if (buttonIndex === 1) {
          deleteItem(id);
        }
      }
    );
  };

  const deleteReport = async (id, reportId) => {
    try {
      await axios.delete(`/admin/users/reports/${id}/${reportId}`);
      setUsers(users.filter((user) => user._id !== id));
      Alert.alert("Report Deleted successfully!");
    } catch (error) {
      Alert.alert(
        "Failed to delete the report",
        error.response?.data?.error || error
      );
    }
  };

  const deleteItem = async (id) => {
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
      fetchReportedUsers();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && users.length === 0) {
    return (
      <EmptyListPlaceholder>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          There aren't any reported users in this platform yet!
        </Text>
      </EmptyListPlaceholder>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                handleClothDeletion={(id, reportId) =>
                  onOpenActionSheet(id, reportId)
                }
                navigation={navigation}
                users
                item={item}
              />
            )}
          />
        </ScreenContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ReportedUsersScreen;
