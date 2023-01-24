import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

const MenuItem = () => {
  return (
    <TouchableOpacity style={styles.root}>
      <Text>MenuItem</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    height: 200,
    marginHorizontal: 20,
    alignSelf: "center",
    borderRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.green,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 200,
    borderRadius: 10,
  },
});
