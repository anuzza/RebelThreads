import React, { useState } from "react";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import ScreenContainer from "../../components/ScreenContainer";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import AdminCard from "../../components/AdminCard";

const FeedScreen = ({ navigation }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClothes();
    setRefreshing(false);
  };

  const fetchClothes = async () => {
    try {
      const { data } = await axios.get("/admin/requests");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClothDeletion = async (id) => {
    try {
      await axios.delete("/admin/requests/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
    } catch (error) {
      //alert
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchClothes();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <Loader loading={loading} />
        {!loading && clothes.length === 0 ? (
          <EmptyListPlaceholder>
            Currently, there aren't any requested clothes in the platform
          </EmptyListPlaceholder>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={({ _id }) => _id}
            data={clothes}
            renderItem={({ item }) => {
              return (
                <AdminCard
                  handleClothDeletion={handleClothDeletion}
                  navigation={navigation}
                  item={item}
                  feed
                />
              );
            }}
          />
        )}
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default FeedScreen;
