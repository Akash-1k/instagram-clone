import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    marginHorizontal: Platform.OS === "web" ? '33%' : 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0
  }
});