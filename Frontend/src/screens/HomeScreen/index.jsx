import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import Card from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import SearchBarHeader from "../../components/SearchBarHeader";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";

const HomeScreen = ({ navigation }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClothes();
    setRefreshing(false);
  };

  const fetchClothes = async () => {
    try {
      const { data } = await axios.get("/sales");
      setClothes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleSearch = (text) => {
    setText(text);
  };

  const filteredClothes = clothes.filter(
    (clothing) =>
      clothing.clothing?.title.toLowerCase().includes(text.toLowerCase()) ||
      clothing.clothing?.description
        .toLowerCase()
        .includes(text.toLowerCase()) ||
      clothing.clothing?.size.toLowerCase().includes(text.toLowerCase()) ||
      clothing.clothing?.gender.toLowerCase().includes(text.toLowerCase()) ||
      clothing.clothing?.brand.toLowerCase().includes(text.toLowerCase()) ||
      clothing.clothing?.category.toLowerCase().includes(text.toLowerCase())
  );

  const topDeals = clothes
    .filter((clothing) => clothing.price < 100)
    .slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#4338CA" }}>
        <SearchBarHeader navigation={navigation} handleSearch={handleSearch} />
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Loader loading={loading} /> */}
        {!loading && clothes.length === 0 ? (
          <EmptyListPlaceholder>
            <Text style={{ textAlign: "center" }}>
              Currently, there aren't any clothes for sale in the platform
            </Text>
          </EmptyListPlaceholder>
        ) : (
          <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={({ _id }) => _id}
              data={filteredClothes}
              ListHeaderComponent={
                <View>
                  {text === "" && topDeals.length > 0 && (
                    <View style={styles.topDealsContainer}>
                      <Text style={styles.sectionTitle}>Top Deals</Text>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {topDeals.map((item) => (
                          <TouchableOpacity
                            key={item._id}
                            onPress={() =>
                              navigation.push("Details", { id: item._id })
                            }
                            style={styles.dealCard}
                          >
                            <Card item={item} />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {/* Title for the list of other items */}
                  <Text style={styles.listingTitle}>
                    {text !== "" ? "Search Results" : "Explore Items"}
                  </Text>
                </View>
              }
              renderItem={({ item, index }) => {
                if (index % 2 === 0) {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.push("Details", { id: item._id })
                        }
                        activeOpacity={1}
                        underlayColor="#eee"
                        style={{ width: "48%" }} // Adjust the width of the card
                      >
                        <Card navigation={navigation} item={item} />
                      </TouchableOpacity>
                      {filteredClothes[index + 1] && (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.push("Details", {
                              id: filteredClothes[index + 1]._id,
                            })
                          }
                          activeOpacity={1}
                          underlayColor="#eee"
                          style={{ width: "48%" }} // Adjust the width of the card
                        >
                          <Card
                            navigation={navigation}
                            item={filteredClothes[index + 1]}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                } else {
                  return null; // Don't return anything for odd indices as we handle them in pairs
                }
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topDealsContainer: {
    marginTop: 5,
    padding: 10,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 8,
  },
  listingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10, // Aligns with padding for consistency
  },
  dealCard: {
    marginRight: 10,
    marginLeft: 4,
    width: 200,
    height: 300,
  },
});
