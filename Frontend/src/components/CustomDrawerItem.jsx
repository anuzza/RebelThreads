import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import CustomDrawerIcon from "./CustomDrawerIcon";
import { useTheme } from "@react-navigation/native";

const CustomDrawerItem = ({ onPress, label, iconName }) => {
  const { colors } = useTheme();
  return (
    <DrawerItem
      icon={({ color, focused, size }) => (
        <CustomDrawerIcon name={iconName} color={colors.primary} />
      )}
      label={label}
      onPress={onPress}
    />
  );
};

export default CustomDrawerItem;
