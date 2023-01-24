import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/HomeScreenComponents/Header";

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text>HomeScreen</Text>
      <Header />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
