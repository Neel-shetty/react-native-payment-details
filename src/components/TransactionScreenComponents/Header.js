import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Header = ({ back, loc }) => {
  const navigation = useNavigation();
  function addTransaction() {
    navigation.navigate("DetailScreen");
  }
  return (
    <View style={[styles.root]}>
      {/* <BackButton onPress={back} /> */}
      <Text style={styles.title}>
        Trans
        {/* <Text style={{ color: colors.green }}> */}
        actions
        {/* </Text> */}
      </Text>
      <TouchableOpacity onPress={addTransaction}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.green,
            padding: 3,
          }}
        >
          <Text style={styles.subtitle}>Add New</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: layout.widthp,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28.33,
    fontFamily: "poppins-semibold",
    textAlign: "center",
    // backgroundColor: "pink",
  },
  subtitle: {
    fontFamily: "poppins-medium",
    color: colors.green,
  },
});
