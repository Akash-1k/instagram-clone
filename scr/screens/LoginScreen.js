import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import LoginForm from "../components/LoginForm";
import Styles from "../styles/Styles";
import themeContext from "../config/themeContext";

export default function LoginScreen({ navigation }) {
  const theme = useContext(themeContext);
  // console.log(theme)
  return (
    <View
      style={[Styles.androidSafeArea, { backgroundColor: theme.background }]}
    >
      <View style={[styles.container]}>
        <View style={styles.logoContainer}>
          <Image
            style={{ height: 50, resizeMode: "contain" }}
            source={require("../assets/instagramLogo.png")}
          />
        </View>
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "30%",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    // height: 300,
    width: "50%",
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: "10%",
    // backgroundColor: '#333',
  },
});
