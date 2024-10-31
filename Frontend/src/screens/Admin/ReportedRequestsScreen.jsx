import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, SafeAreaView, RefreshControl, Text } from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";
import { AdminListCard } from "../../components/AdminCard";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";

const ReportedRequestsScreen = ({ navigation }) => {
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
      const { data } = await axios.get("/admin/requests/reports");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onOpenActionSheet = (id) => {
    showActionSheetWithOptions(
      {
        options: ["Delete Report", "Delete Post", "Cancel"],
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

  const deleteReport = async (id) => {
    try {
      await axios.delete("/requests/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete("/admin/requests/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
    } catch (error) {
      console.log(error.message);
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
          There aren't any reported requests in this platform yet!
        </Text>
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
          data={clothes}
          renderItem={({ item }) => (
            <AdminListCard
              navigation={navigation}
              handleClothDeletion={onOpenActionSheet}
              item={item}
            />
          )}
        />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default ReportedRequestsScreen;
