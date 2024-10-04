import React from "react";
import { View } from "react-native";
import { Caption, Title } from "react-native-paper";

const EmptyListPlaceholder = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 15,
      }}
    >
      <Title style={{ fontSize: 25 }}>{children}</Title>
      <Caption style={{ marginTop: 10, textAlign: "center" }}>
        When you do, they'll show up here.
      </Caption>
    </View>
  );
};

export default EmptyListPlaceholder;
