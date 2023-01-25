import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";
import { LinearGradient } from "expo-linear-gradient";

const MenuItem = ({ title, onPress, source }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#85FFBD", "#FFFB7D"]}
        style={styles.background}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          style={{
            alignItems: "flex-start",
            // backgroundColor: "pink",
            width: "100%",
            flex: 1,
            paddingTop: 5,
            paddingLeft: 5,
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            width: "100%",
            justifyContent: "flex-end",
            flex: 1,
            paddingBottom: 5,
            paddingRight: 5,
          }}
        >
          <Image source={source} style={{ height: 50, width: 50 }} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MenuItem;

console.log(layout.height);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    height: layout.height < 750 ? 150 : 150,
    marginHorizontal: 20,
    alignSelf: "center",
    borderRadius: 10,
    elevation: 6,
    shadowRadius: 5,
    shadowOpacity: 0.25,
    // borderWidth: 1,
    // borderColor: colors.green,
    // padding: 5,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    // textAlign: "center",
  },
  background: {
    height: layout.height < 750 ? 150 : 150,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
