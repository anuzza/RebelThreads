import * as SMS from "expo-sms";
import { Alert } from "react-native";

export const sendSMS = async (phone_number, bookName, requested = false) => {
  const isAvailable = await SMS.isAvailableAsync();
  let text = `Hi, I am interested in the book you are selling?\n\n Book Name : ${bookName} \n\n \t - OleMiss BookShare`;
  if (requested) {
    text = `Hi, I have the book you have requested?\n\n Book Name : ${bookName} \n\n \t - OleMiss BookShare`;
  }
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync([phone_number], text);

    if (result === "sent") {
      Alert.alert("Message sent succesfully!");
    }
  } else {
    Alert.alert("There's no SMS available on this device");
  }
};
