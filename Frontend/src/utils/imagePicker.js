import * as ImagePicker from "expo-image-picker";
// This function is triggered when the "Select an image" button pressed
export const showImagePicker = async () => {
  // Ask the user for the permission to access the media library
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this appp to access your photos!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync();

  return result;
};
