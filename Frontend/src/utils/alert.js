import { Alert } from "react-native";

export const openTwoButtonAlert = (text, onPressYes) => {
  Alert.alert(
    text,
    "",
    [
      { text: "Yes", onPress: onPressYes },
      {
        text: "Cancel",
        onPress: () => console.log("No button clicked"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
};
