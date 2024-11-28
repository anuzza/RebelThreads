import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
  modalVisible,
  options,
  value,
  setValue,
  setModalVisible,
}) => {
  const data = options.map((option) => (
    <Picker.Item label={option} value={option} key={option} />
  ));
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "30%",
            position: "absolute",
            bottom: 0,
            padding: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <Picker
            style={{
              height: 50,
              width: "100%",
            }}
            itemStyle={{ color: "black" }}
            selectedValue={value}
            mode="dropdown"
            onValueChange={(itemValue) => {
              setValue(itemValue);
            }}
          >
            {data}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPicker;
