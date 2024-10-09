import React from "react";
import { View } from "react-native";

const HorizontalLine = ({ marginTop, marginBottom }) => {
  return (
    <View
      style={{
        marginTop,
        marginBottom,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
      }}
    />
  );
};

export default HorizontalLine;
