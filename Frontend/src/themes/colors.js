import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";

export const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    accentColor: "#fff",
    primary: "#4338ca",
    silverSand: "#bebfc4",
    green: "#183c28",
    maize: "#eec643",
    orange: "#fa824c",
    lightGreen: "#a2d729",

    // Edge Cases
    alert: {
      b100: "#4BB543",
      b10: "#e5ffe5",
      b200: "#b2ffb2",
      a100: "#D91848",
      a200: "#fed2d2",
      a10: "#ffeaea",
    },

    // Blacks and grays

    grey: "#EEEEEE",
    backgroundGrey: "#E5E5E5",
    notBlack: "#333333",
    lightGrey: "#ECEFF1",
    placeholderGray: "#b2b1b4",
    darkGrey: "#74758C",
    smallTextGrey: "#BBBBBB",
    textGrey: "#A89E9E",
    borderGrey: "#d6d7db",
    greyTextColor: "rgb(34, 27, 27)",

    // Lights & Brights
    notWhite: "#Fafafa",
    lightWhite: "#FBFBFB",
    elevation: {},
  },
};
