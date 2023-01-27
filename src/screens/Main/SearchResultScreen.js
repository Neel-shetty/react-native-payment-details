import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchResultScreen = () => {
  return (
    <View style={styles.root}>
      <Text>SearchResultScreen</Text>
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
