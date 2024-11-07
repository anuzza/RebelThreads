import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Text,
  StyleSheet,
} from "react-native";
import Card from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import { loadUser } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BookmarksScreen = ({ navigation }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookmarks();
    setRefreshing(false);
  };

  const fetchBookmarks = async () => {
    try {
      const { data } = await axios.get("/users/me/bookmarks");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClothDeletion = async (id) => {
    try {
      await axios.delete("/users/bookmark/" + id);
      setClothes(clothes.filter((cloth) => cloth._id !== id));
      dispatch(loadUser());
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      fetchBookmarks();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && clothes.length === 0) {
    return (
      <EmptyListPlaceholder>
        <Text style={styles.emptyText}>You have not saved any posts yet</Text>
      </EmptyListPlaceholder>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
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
                  <Card
                    handleClothDeletion={handleClothDeletion}
                    bookmarks
                    item={item}
                    navigation={navigation}
                  />
                </TouchableOpacity>
              ) : (
                <Card
                  handleClothDeletion={handleClothDeletion}
                  bookmarks
                  item={item}
                  navigation={navigation}
                />
              )
            }
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // Add some padding around the list
    paddingVertical: 8,
    backgroundColor: "#f9f9f9", // Light background color for the screen
  },
  listContent: {
    paddingBottom: 16, // Add some bottom padding so the last item is not too close to the bottom
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
  },
});
export default BookmarksScreen;
