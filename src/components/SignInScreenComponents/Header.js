import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";

const Header = ({ back, loc }) => {
  return (
    <View
      style={[
        styles.root,
        // loc == "signIn" ? { justifyContent: "center" } : null,
      ]}
    >
      {/* {loc !== "signIn" ?  */}
      <BackButton onPress={back} />
      <Text style={styles.title}>
        Scan<Text style={{ color: colors.green }}>Me</Text>
      </Text>
      {/* {loc !== "signIn" ?  */}
      <View style={{ height: 35, width: 35 }} />
      {/* // : null} */}
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
});
