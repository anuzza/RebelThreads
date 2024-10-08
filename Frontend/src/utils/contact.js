import * as SMS from "expo-sms";
import { Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";

export const sendSMS = async (phone_number, name, title, requested = false) => {
  const isAvailable = await SMS.isAvailableAsync();
  let text = `Hi ${name}, I am interested in the cloth you are selling in RebelThreads. Is this still available? \n Post Name : ${title}`;
  if (requested) {
    text = `Hi ${name}, I have something similar to what you have requested in RebelThreads. Are you still looking for this item? \n Post Name : ${title}`;
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

export const sendEmail = async (email, name, title, requested = false) => {
  const isAvailable = await MailComposer.isAvailableAsync();
  let text = `Hi ${name}, I am interested in the cloth you are selling in RebelThreads. Is this still available? \n Post Name : ${title}`;
  if (requested) {
    text = `Hi ${name}, I have something similar to what you have requested in RebelThreads. Are you still looking for this item? \n Post Name : ${title}`;
  }
  if (isAvailable) {
    const { result } = await MailComposer.composeAsync({
      recipients: [email],
      subject: "RebelThreads",
      body: text,
    });
    if (result === "sent") {
      Alert.alert("Email sent succesfully!");
    }
  } else {
    Alert.alert("There's no Mail feature accesible on this device");
  }
};
