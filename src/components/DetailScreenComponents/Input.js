import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";

const Input = ({
  placeholder,
  title,
  onChangeText,
  onBlur,
  value,
  fieldType,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.infoText}>{title}</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          // secureTextEntry={secureTextEntry}
        />
        {/* <Ionicons name="ios-checkmark-circle" size={22} color={colors.green} /> */}
        <View style={{ width: 22 }} />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    alignItems: "flex-start",
    justifyContent: "center",
    height: 68,
  },
  input: {
    width: layout.width * 0.8,
    fontFamily: "inter-semibold",
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    borderBottomColor: colors.green,
    borderBottomWidth: 2.5,
    paddingBottom: 5,
  },
  infoText: {
    fontFamily: "inter-semibold",
    fontSize: 12,
    color: colors.gray,
  },
  headerContainer: {
    paddingBottom: 8,
  },
});
