import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

const CustomDrawerIcon = ({ name, color }) => {
  return <Icon name={name} color={color} size={30} />;
};

export default CustomDrawerIcon;
