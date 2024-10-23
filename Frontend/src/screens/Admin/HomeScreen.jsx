import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import AdminCard from "../../components/AdminCard";

const HomeScreen = ({ navigation }) => {
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
      const { data } = await axios.get("/admin/sales");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      // console.log(error.response.data);
      setLoading(false);
    }
  };

  const handleClothDeletion = async (id) => {
    try {
      await axios.delete("/admin/sales/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
    } catch (error) {
      // console.log(error.message);
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
      {!loading && clothes.length === 0 ? (
        <EmptyListPlaceholder>
          Currently, there aren't any clothes for sale in the platform
        </EmptyListPlaceholder>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={({ _id }) => _id}
            data={clothes}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.push("Details", { id: item._id })}
                  activeOpacity={1}
                  underlayColor="#eee"
                >
                  <AdminCard
                    handleClothDeletion={handleClothDeletion}
                    navigation={navigation}
                    item={item}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
