import { StyleSheet } from "react-native";

export const uploadFormStyles = StyleSheet.create({
  RowFlex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FormContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  ColumnFlex: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  SingleImageWrapper: {
    marginLeft: 20,
    height: 120,
    padding: 20,
    borderWidth: 1,
  },
  PhotoContainer: {
    marginTop: 40,
    marginHorizontal: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignContent: "center",
  },

  ImageWrapper: {
    width: "50%",
    position: "relative",
  },

  DeleteButton: {
    position: "absolute",
    padding: 5,
    borderRadius: 120,
    backgroundColor: "#D91848",
    bottom: 105,
    right: -7,
  },

  Image: {
    width: "100%",
    height: 120,
  },

  ActionButton: {
    marginTop: 20,
    borderColor: "#4338ca",
    width: "80%",
    padding: 10,
    borderWidth: 1,
    alignSelf: "center",
  },
  ActionText: {
    color: "#000",
    marginLeft: 10,
    fontSize: 20,
  },
  UploadCard: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 15,
  },
  ModalFooter: {
    fontSize: 12,
  },
  StepText: {
    fontSize: 12,
    color: "#D91848",
  },
  error: {
    marginLeft: 10,
    marginTop: 10,
    color: "#D91848",
    justifyContent: "flex-start",
  },
  borderError: {
    borderBottomColor: "#D91848",
  },

  Label: {
    marginLeft: 20,
    fontSize: 13,
    marginTop: 10,
  },
  Input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  longInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    fontSize: 16,
    height: 60,
  },
  SaveButton: {
    width: "100%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: "#4338ca",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  alignedText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
