import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyAppText = ({ children }) => {
  return <Text styles={styles.baseText}>{children}</Text>;
};

export default MyAppText;

const styles = StyleSheet.create({
  baseText: {
    fontFamily: ""
  },
});
