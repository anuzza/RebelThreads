import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  RefreshControl,
  Text,
  Alert,
  TouchableOpacity,
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

const ReportedSalesScreen = ({ navigation }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReportedClothes();
    setRefreshing(false);
  };

  const fetchReportedClothes = async () => {
    try {
      const { data } = await axios.get("/admin/sales/reports");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onOpenActionSheet = (id, reportId) => {
    showActionSheetWithOptions(
      {
        options: ["Delete Report", "Delete Post", "Cancel"],
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
      await axios.delete(`/admin/sales/reports/${id}/${reportId}`);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
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
      await axios.delete(`/admin/sales/${id}`);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
      Alert.alert("Post Deleted successfully!");
    } catch (error) {
      Alert.alert(
        "Failed to delete the listing",
        error.response?.data?.error || error
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchReportedClothes();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && clothes.length === 0) {
    return (
      <EmptyListPlaceholder>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          There aren't any reported sales in this platform yet!
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
            data={clothes}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => navigation.push("Details", { id: item._id })}
              >
                <AdminListCard
                  navigation={navigation}
                  handleClothDeletion={(id, reportId) =>
                    onOpenActionSheet(id, reportId)
                  }
                  item={item}
                />
              </TouchableOpacity>
            )}
          />
        </ScreenContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ReportedSalesScreen;
