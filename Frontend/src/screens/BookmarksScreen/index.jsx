import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Card from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import { loadUser } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const BookmarksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
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
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBookDeletion = async (id) => {
    try {
      await axios.delete("/users/bookmark/" + id);
      setBooks(books.filter((book) => book._id !== id));
      dispatch(loadUser());
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchBookmarks();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && books.length === 0) {
    return (
      <EmptyListPlaceholder>
        You haven't added any books to your bookmarks yet
      </EmptyListPlaceholder>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={({ _id }) => _id}
          data={books.sort((a, b) => b.active - a.active)}
          renderItem={({ item }) =>
            item.active ? (
              <TouchableOpacity
                onPress={() => navigation.push("Details", { id: item._id })}
                activeOpacity={1}
                underlayColor="#eee"
              >
                <Card
                  handleBookDeletion={handleBookDeletion}
                  bookmarks
                  item={item}
                  navigation={navigation}
                />
              </TouchableOpacity>
            ) : (
              <Card
                handleBookDeletion={handleBookDeletion}
                bookmarks
                item={item}
                navigation={navigation}
              />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default BookmarksScreen;
