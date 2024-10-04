import { Ionicons as Icon } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const FloatingButton = ({ iconName, onPress, color, size, ...props }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.FloatingActionButton, ...props }}
    >
      <Icon
        iconStyle={{
          backgroundColor: "#fff",
        }}
        name={iconName}
        size={size ? size : 30}
        color={color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FloatingActionButton: {
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FloatingButton;
