import React, { useState, useEffect } from "react";
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
  const [selectedTag, setSelectedTag] = useState(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [isTopDealsReady, setIsTopDealsReady] = useState(false);

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

  const handleLayout = () => {
    setIsLayoutReady(true);
  };

  const handleSearch = (text) => {
    setText(text);
    setSelectedTag(null);
  };

  const handleTagSelect = (tag) => {
    setText("");
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const filterKeywords = {
    Olemiss: ["olemiss", "ole miss", "rebel"],
    Gameday: ["game day", "gameday", "tailgate"],
    Sorority: ["sorority", "chapter"],
    Fraternity: ["frat", "fraternity"],
    Formal: ["formal", "dress", "suit"],
    Casual: ["casual", "everyday"],
    Winter: ["winter", "coat", "jacket", "sweater"],
    Classroom: ["classroom", "school", "study", "class"],
    Party: ["party", "club", "night", "bar"],
  };

  const filteredClothes = clothes.filter((clothing) => {
    const title = clothing.clothing?.title.toLowerCase();
    const description = clothing.clothing?.description.toLowerCase();
    const size = clothing.clothing?.size.toLowerCase();
    const gender = clothing.clothing?.gender.toLowerCase();
    const brand = clothing.clothing?.brand.toLowerCase();
    const category = clothing.clothing?.category.toLowerCase();

    const matchesText =
      title.includes(text.toLowerCase()) ||
      description.includes(text.toLowerCase()) ||
      size.includes(text.toLowerCase()) ||
      gender.includes(text.toLowerCase()) ||
      brand.includes(text.toLowerCase()) ||
      category.includes(text.toLowerCase());

    const matchesTag = selectedTag
      ? filterKeywords[selectedTag].some(
          (keyword) => title.includes(keyword) || description.includes(keyword)
        )
      : true;

    return matchesText && matchesTag;
  });

  const filterTags = [
    "Olemiss",
    "Gameday",
    "Sorority",
    "Fraternity",
    "Formal",
    "Casual",
    "Winter",
    "Classroom",
    "Party",
  ];

  const topDeals = clothes
    .filter((clothing) => clothing.price < 50)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#4338CA" }}>
        <SearchBarHeader navigation={navigation} handleSearch={handleSearch} />
        <View style={styles.fixedTagContainer} onLayout={handleLayout}>
          {isLayoutReady && (
            <ScrollView
              horizontal={true}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.tagContainer}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {filterTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => handleTagSelect(tag)}
                  style={[
                    styles.tag,
                    selectedTag === tag && styles.selectedTag,
                  ]}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>

      <SafeAreaView style={{ flex: 1 }}>
        <Loader loading={loading} />
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
                  {text === "" && !selectedTag && topDeals?.length > 0 && (
                    <View
                      style={styles.topDealsContainer}
                      onLayout={() => setIsTopDealsReady(true)}
                    >
                      <Text style={styles.sectionTitle}>Top Deals</Text>
                      {isTopDealsReady && (
                        <ScrollView
                          horizontal
                          nestedScrollEnabled
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ alignItems: "center" }}
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
                      )}
                    </View>
                  )}

                  {/* Title for the list of other items */}
                  <Text style={styles.listingTitle}>
                    {selectedTag
                      ? `Showing items for: ${selectedTag}`
                      : text !== ""
                      ? "Search Results"
                      : "Explore Items"}
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
                        style={{ width: "48%" }}
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
                          style={{ width: "48%" }}
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
                  return null;
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
  fixedTagContainer: {
    zIndex: 1, // Ensure it's above other components
    height: 40, // Set a fixed height
  },

  tagContainer: {
    flexDirection: "row",
    padding: 5,
    height: "100%",
  },
  tag: {
    backgroundColor: "#fafafa",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  selectedTag: {
    backgroundColor: "#FFCCBC",
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
    paddingLeft: 10,
    marginTop: 10,
  },
  dealCard: {
    marginRight: 10,
    marginLeft: 4,
    width: 200,
    height: 300,
  },
});
