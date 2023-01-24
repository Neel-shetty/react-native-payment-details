import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ back, loc }) => {
  const navigation = useNavigation();

  function drawer() {
    navigation.openDrawer();
  }

  return (
    <View style={[styles.root]}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={drawer}>
          <Ionicons name="menu" size={24} color="#230B34" />
        </TouchableOpacity>
      </View>
      {/* <BackButton onPress={back} /> */}
      <Text style={styles.title}>
        Home <Text style={{ color: colors.green }}>Screen</Text>
      </Text>
      <View style={{ height: 35, width: 35 }} />
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
    fontSize: 24.33,
    fontFamily: "poppins-semibold",
    textAlign: "center",
    // backgroundColor: "pink",
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: "rgba(24, 26, 32, 0.1)",
    borderRadius: 10,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
