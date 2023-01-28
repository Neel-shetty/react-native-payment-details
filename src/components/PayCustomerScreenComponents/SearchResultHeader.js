import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const SearchResultHeader = ({ loc }) => {
  const navigation = useNavigation();
  function back() {
    navigation.goBack();
  }
  return (
    <View style={[styles.root]}>
      <BackButton onPress={back} />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Search Result
        </Text>
      </View>
      <View style={{ height: 35, width: 35 }} />
    </View>
  );
};

export default SearchResultHeader;

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
    fontSize: 23.33,
    fontFamily: "poppins-semibold",
    textAlign: "center",
    // backgroundColor: "pink",
  },
  titleContainer: {
    flexDirection: "column",
  },
});
