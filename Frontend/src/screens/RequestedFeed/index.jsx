import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Text,
} from "react-native";
import Card from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import FloatingButton from "../../components/FloatingButton";
import ScreenContainer from "../../components/ScreenContainer";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";

const RequestedScreen = ({ navigation }) => {
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
      const { data } = await axios.get("/requests/");
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <Loader loading={loading} />
        {!loading && clothes.length === 0 ? (
          <EmptyListPlaceholder>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Currently, there aren't any requested clothes in the platform
            </Text>
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
              return <Card navigation={navigation} item={item} feed />;
            }}
          />
        )}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 15,
            right: 10,
          }}
        >
          <FloatingButton
            onPress={() => navigation.push("AddRequestScreen")}
            color="#fff"
            backgroundColor="#4338ca"
            iconName="add"
          />
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default RequestedScreen;
