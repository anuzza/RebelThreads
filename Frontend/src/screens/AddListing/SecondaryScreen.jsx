import React, { useState, useRef, useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Title } from "react-native-paper";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";
import CustomPicker from "../../components/CustomPicker";

const conditionOptions = [
  "Select Condition",
  "New",
  "Like New",
  "Good",
  "Fair",
  "Worn",
];
const genderOptions = ["Select Gender", "Men", "Women", "Unisex"];
const categoryOptions = [
  "Select Category",
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Footwear",
  "Activewear",
  "Accessories",
  "Other",
];
export const SecondaryScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    price: "0",
    error: {},
  });

  const [condition, setCondition] = useState(conditionOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [gender, setGender] = useState(genderOptions[0]);

  const [modalVisible, setModalVisible] = useState(false);
  const [activePicker, setActivePicker] = useState("");

  const { price, error } = state;

  const validateInput = () => {
    const validationErrors = {};

    if (price === "") {
      validationErrors.priceError = "Price is required!";
    } else {
      const valid = /^-?\d*(\.\d+)?$/;
      if (!price.match(valid)) {
        validationErrors.priceError = "Price must be a decimal value!";
      }
    }
    if (condition === "Select Condition") {
      validationErrors.conditionError = "Condition is required!";
    }
    if (category === "Select Category") {
      validationErrors.categoryError = "Category is required!";
    }
    if (gender === "Select Gender") {
      validationErrors.genderError = "Gender is required!";
    }
    setState({ ...state, error: validationErrors });
    return Object.keys(validationErrors).length < 1;
  };

  const validateInputRef = useRef();

  const onFormSubmit = () => {
    const isValid = validateInput();
    if (!isValid) {
      validateInputRef.current.shake(800);
    } else {
      setState({ ...state, error: {} });
      navigation.push("UploadClothCameraScreen", {
        clothState: {
          ...route?.params?.clothState,
          price,
          condition,
          category,
          gender,
        },
      });
    }
  };

  useEffect(() => {
    if (route?.params?.clothState) {
      setState({
        ...state,
        price: route.params.clothState.price || "0",
      });
      setCondition(route.params.clothState.condition || conditionOptions[0]);
      setCategory(route.params.clothState.category || categoryOptions[0]);
      setGender(route.params.clothState.gender || genderOptions[0]);
    }
  }, [route]);

  return (
    <ScrollView
      style={{ flex: 1, padding: 10 }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 2 of 3</Caption>
        <Title>Add More details</Title>
        <Caption style={styles.ModalFooter}>
          Make sure to add accurate information
        </Caption>
      </View>
      <Animatable.View ref={validateInputRef}>
        <View>
          <Caption style={styles.Label}>
            Price ( Leave the price at $0 if you want to giveaway the cloth for
            free )
          </Caption>

          <TextInput
            value={price}
            style={[styles.Input, error?.priceError && styles.borderError]}
            returnKeyType="done"
            keyboardType="numeric"
            onChangeText={(text) => {
              setState({ ...state, price: text });
            }}
            onFocus={() => {
              if (error?.priceError) {
                delete error["priceError"];
                setState({ ...state, error });
              }
            }}
          />
          {error?.priceError && (
            <Caption style={styles.error}>{error?.priceError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>Condition</Caption>
          <TextInput
            style={[styles.Input, error?.conditionError && styles.borderError]}
            returnKeyType="done"
            editable={false}
            selectTextOnFocus={false}
            value={condition}
            onPressIn={() => {
              if (error?.conditionError) {
                delete error["conditionError"];
                setState({ ...state, error });
              }
              setActivePicker("condition");
              setModalVisible(true);
            }}
          />
          {error?.conditionError && (
            <Caption style={styles.error}>{error?.conditionError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>Category</Caption>
          <TextInput
            style={[styles.Input, error?.categoryError && styles.borderError]}
            returnKeyType="done"
            editable={false}
            value={category}
            selectTextOnFocus={false}
            onPressIn={() => {
              if (error?.categoryError) {
                delete error["categoryError"];
                setState({ ...state, error });
              }
              setActivePicker("category");
              setModalVisible(true);
            }}
          />
          {error?.categoryError && (
            <Caption style={styles.error}>{error?.categoryError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>Gender</Caption>
          <TextInput
            style={[styles.Input, error?.genderError && styles.borderError]}
            returnKeyType="done"
            value={gender}
            editable={false}
            selectTextOnFocus={false}
            onPressIn={() => {
              if (error?.genderError) {
                delete error["genderError"];
                setState({ ...state, error });
              }
              setActivePicker("gender");
              setModalVisible(true);
            }}
          />
          {error?.genderError && (
            <Caption style={styles.error}>{error?.genderError}</Caption>
          )}
        </View>
      </Animatable.View>
      {modalVisible && (
        <CustomPicker
          options={
            activePicker === "condition"
              ? conditionOptions
              : activePicker === "category"
              ? categoryOptions
              : genderOptions
          }
          value={
            activePicker === "condition"
              ? condition
              : activePicker === "category"
              ? category
              : gender
          }
          setValue={
            activePicker === "condition"
              ? setCondition
              : activePicker === "category"
              ? setCategory
              : setGender
          }
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
        <Caption style={styles.alignedText}>Continue</Caption>
      </TouchableOpacity>
    </ScrollView>
  );
};
