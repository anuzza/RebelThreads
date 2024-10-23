import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, SafeAreaView, RefreshControl, Text } from "react-native";
import { ListCard } from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MyRequests = ({ navigation }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRequestedClothes();
    setRefreshing(false);
  };

  const fetchRequestedClothes = async () => {
    try {
      const { data } = await axios.get("/users/me/requests");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClothAlteration = async (id) => {
    try {
      await axios.post("/requests/markFound/" + id);
      const changedClothes = [...clothes];
      const index = changedClothes.findIndex((cloth) => cloth._id === id);
      changedClothes[index].active = false;
      setClothes(changedClothes);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClothDeletion = async (id) => {
    try {
      await axios.delete("/requests/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClothUpdation = (item) => {
    navigation.push("AddRequestScreen", {
      screen: "RequestClothBaseScreen",
      params: {
        clothState: {
          id: item._id,
          ...item.clothing,
        },
      },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchRequestedClothes();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && clothes.length === 0) {
    return (
      <EmptyListPlaceholder>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          You have not requested any clothes in the past yet
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
            data={clothes.sort((a, b) => b.active - a.active)}
            renderItem={({ item }) => (
              <ListCard
                handleClothAlteration={handleClothAlteration}
                handleClothDeletion={handleClothDeletion}
                handleClothUpdation={handleClothUpdation}
                requests
                item={item}
              />
            )}
          />
        </ScreenContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MyRequests;
