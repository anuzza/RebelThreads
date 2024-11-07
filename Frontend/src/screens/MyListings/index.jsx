import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Text,
  Alert,
} from "react-native";
import { ListCard } from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MyListings = ({ navigation }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSoldClothes();
    setRefreshing(false);
  };

  const fetchSoldClothes = async () => {
    try {
      const { data } = await axios.get("/users/me/sale");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClothAlteration = async (id) => {
    try {
      await axios.post("/sales/markSold/" + id);
      const changedClothes = [...clothes];
      const index = changedClothes.findIndex((cloth) => cloth._id === id);
      changedClothes[index].active = false;
      setClothes(changedClothes);
    } catch (error) {
      Alert.alert(
        "Failed to update the post",
        error.response?.data?.error || error
      );
    }
  };

  const handleClothUpdation = (item) => {
    navigation.push("AddListingScreen", {
      screen: "UploadClothBaseScreen",
      params: {
        clothState: {
          id: item._id,
          price: item.price.toString(),
          pictures: item.pictures,
          ...item.clothing,
        },
      },
    });
  };

  const handleClothDeletion = async (id) => {
    try {
      await axios.delete("/sales/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
    } catch (error) {
      Alert.alert(
        "Failed to delete the post",
        error.response?.data?.error || error
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchSoldClothes();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && clothes.length === 0) {
    return (
      <EmptyListPlaceholder>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          You have not posted any listings yet!
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
            renderItem={({ item }) =>
              item.active ? (
                <TouchableOpacity
                  onPress={() => navigation.push("Details", { id: item._id })}
                  activeOpacity={1}
                  underlayColor="#eee"
                >
                  <ListCard
                    handleClothAlteration={handleClothAlteration}
                    handleClothDeletion={handleClothDeletion}
                    handleClothUpdation={handleClothUpdation}
                    item={item}
                  />
                </TouchableOpacity>
              ) : (
                <ListCard
                  handleClothAlteration={handleClothAlteration}
                  handleClothDeletion={handleClothDeletion}
                  handleClothUpdation={handleClothUpdation}
                  item={item}
                />
              )
            }
          />
        </ScreenContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MyListings;
