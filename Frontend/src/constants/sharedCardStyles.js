import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEFF1",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#fff",
    marginBottom: 40,
  },
  feedCard: {
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },

  image: {
    width: "100%",
    height: 200,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  soldText: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 50,
    top: "50%",
    left: "50%",
    marginLeft: -70,
    marginTop: -40,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  subInformation: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  info: {
    fontSize: 12,
    color: "#A89E9E",
  },
  priceContainer: {
    textAlign: "center",
    width: 90,
    height: 40,
    backgroundColor: "#74758C",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  alignedText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  icon: {
    fontSize: 25,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  requestFeedContainer: {
    marginLeft: 10,
    flexDirection: "column",
    padding: 10,
    width: "100%",
  },
  requestUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "85%",
  },
  userName: { fontSize: 15, color: "rgb(34, 27, 27)", textAlign: "center" },
  date: {
    fontSize: 12,
    color: "#74758C",
    flexWrap: "wrap",
    alignSelf: "center",
  },
  leftSwipeActionContainer: {
    backgroundColor: "#a2d729",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
    marginBottom: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightSwipeActionContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    flexDirection: "row",
  },
  rightSwipeButtonContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  types: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  type: {
    fontSize: 14,
    color: "#74758C",
    textAlign: "center",
    borderWidth: 1,
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "#d6d7db",
    marginRight: 10,
    borderRadius: 5,
    padding: 8,
  },
});
