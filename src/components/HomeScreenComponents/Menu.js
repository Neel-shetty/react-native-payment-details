import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import MenuItem from "./MenuItem";

const Menu = () => {
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Options</Text>
      </View>
      <View style={styles.menuItemContainer}>
        <View style={styles.menu1}>
          <MenuItem />
          <MenuItem />
        </View>
        <View style={styles.menu2}>
          <MenuItem />
          <MenuItem />
        </View>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: layout.widthp,
    height: 500,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 6,
    borderWidth: 2,
    borderColor: colors.green,
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    width: layout.widthp,
    paddingLeft: 20,
    paddingTop: 10,
  },
  menuItemContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
    width: layout.widthp ,
  },
  menu1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu2: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
