import React, { useRef, useState, useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Title } from "react-native-paper";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";
import CustomPicker from "../../components/CustomPicker";

const options = ["USED", "NEW"];

export const FinalScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    amount: "0",
    course_name: "",
    course_code: "",
    error: {},
  });
  const [condition, setCondition] = useState(options[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const { amount, course_name, course_code, error } = state;

  const validateInput = () => {
    const validationErrors = {};
    if (amount === "") {
      validationErrors.amountError = "Price is required!";
    } else {
      const valid = /^-?\d*(\.\d+)?$/;
      if (!amount.match(valid)) {
        validationErrors.amountError = "Price must be a decimal value!";
      }
    }
    if (course_name === "") {
      validationErrors.courseNameError = "Course Name is required!";
    }
    if (course_code === "") {
      validationErrors.courseCodeError = "Course Code is required!";
    } else {
      if (!course_code.match(/^[0-9]+$/)) {
        validationErrors.courseCodeError = "Course Code must be all numbers!";
      }
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
      navigation.push("UploadBookCameraScreen", {
        bookState: {
          ...route?.params?.bookState,
          amount,
          condition,
          course_name,
          course_code,
        },
      });
    }
  };

  useEffect(() => {
    if (route?.params?.bookState) {
      setState({
        ...state,
        amount: route?.params?.bookState?.amount
          ? route.params.bookState.amount
          : "0",
        course_name: route?.params?.bookState?.course_name
          ? route.params.bookState.course_name
          : "",
        course_code: route?.params?.bookState?.course_code
          ? route.params.bookState.course_code
          : "",
      });
      setCondition(
        route?.params?.bookState?.condition
          ? route.params.bookState.condition
          : options[0]
      );
    }
  }, [route]);

  return (
    <ScrollView
      style={{
        backgroundColor: modalVisible ? "rgba(255,255,255,0.1)" : "#fff",
        flex: 1,
        padding: 10,
      }}
    >
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 3 of 4</Caption>
        <Title stule={styles.ModalHeader}>Give us more info</Title>
        <Caption stule={styles.ModalFooter}>
          Leave the price at $0 if you want to giveaway the book for free
        </Caption>
      </View>
      <Animatable.View ref={validateInputRef}>
        <View>
          <Caption style={styles.Label}>Price</Caption>
          <TextInput
            value={amount}
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => {
              if (error?.amountError) {
                delete error["amountError"];
                setState({ ...state, error });
              }
            }}
            style={[styles.Input, error?.amountError && styles.borderError]}
            onChangeText={(text) => {
              setState({ ...state, amount: text });
            }}
          />
          {error?.amountError && (
            <Caption style={styles.error}>{error?.amountError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>For Course (Name)</Caption>
          <TextInput
            value={course_name}
            returnKeyType="done"
            onFocus={() => {
              if (error?.courseNameError) {
                delete error["courseNameError"];
                setState({ ...state, error });
              }
            }}
            style={[styles.Input, error?.courseNameError && styles.borderError]}
            onChangeText={(text) => {
              setState({ ...state, course_name: text });
            }}
          />
          {error?.courseNameError && (
            <Caption style={styles.error}>{error?.courseNameError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>For Course (Code)</Caption>
          <TextInput
            value={course_code}
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => {
              if (error?.courseCodeError) {
                delete error["courseCodeError"];
                setState({ ...state, error });
              }
            }}
            style={[styles.Input, error?.courseCodeError && styles.borderError]}
            onChangeText={(text) => {
              setState({ ...state, course_code: text });
            }}
          />
          {error?.courseCodeError && (
            <Caption style={styles.error}>{error?.courseCodeError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>Condition</Caption>
          <TextInput
            style={styles.Input}
            value={condition}
            editable={false}
            selectTextOnFocus={false}
            returnKeyType="done"
            onPressIn={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </Animatable.View>
      {modalVisible && (
        <CustomPicker
          options={options}
          value={condition}
          setValue={setCondition}
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
