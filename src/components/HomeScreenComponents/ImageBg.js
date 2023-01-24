import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";

const ImageBg = () => {
  return (
    <View style={styles.root}>
      <Image />
      <Text>Image</Text>
    </View>
  );
};

export default ImageBg;

const styles = StyleSheet.create({
  root: {
    width: layout.width * 0.8,
    backgroundColor: "white",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 10,
    elevation: 6,
    borderWidth: 2,
    borderColor: colors.green,
  },
});
