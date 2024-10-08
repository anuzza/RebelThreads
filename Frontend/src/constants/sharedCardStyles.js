import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  card: {
    width: "100%", // Card takes up full width of its parent
    marginBottom: 15, // Add more space between cards
    backgroundColor: "#fff",
    borderRadius: 12, // Slightly larger border radius for smooth corners
    padding: 10,
    elevation: 4, // Increased shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2, // Increase shadow opacity for better definition
    shadowRadius: 4, // Slightly larger shadow radius
    height: 280, // Adjust height to make card more compact
  },

  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160, // Adjust image height for a better ratio
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  soldText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 35, // Smaller font size for "Sold" text to match new layout
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    flexShrink: 1,
    color: "#333", // Darker color for better readability
  },

  subInformation: {
    flexDirection: "row",
    marginTop: 5, // Reduced margin for compact layout
    alignItems: "center",
  },

  info: {
    fontSize: 13, // Slightly larger font for better readability
    color: "#7a7a7a", // Darker gray for better contrast
  },

  priceContainer: {
    textAlign: "center",
    width: 60,
    height: 40,
    backgroundColor: "#4CAF50", // Slightly brighter green for price
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  alignedText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16, // Larger font for price text
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

  userName: {
    fontSize: 15,
    color: "rgb(34, 27, 27)",
    textAlign: "center",
  },

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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  conditionText: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  free: {
    color: "#4CAF50", // Green color for "Free"
  },
});
