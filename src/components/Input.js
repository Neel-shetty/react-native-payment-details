import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { layout } from "../constants/layout";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../store/slice/formErrorSlice";

const Input = ({
  placeholder,
  title,
  onChangeText,
  onBlur,
  value,
  fieldType,
  secureTextEntry = false,
}) => {
  const [showPasswordtoggle, setShowPasswordToggle] = useState(false);

  const formError = useSelector((state) => state.error.error);
  const user = useSelector((state)=> state.user.loggedIn)
    // console.log(user,"user...")
  console.log("🚀 ~ file: Input.js:34 ~ formError", formError);
  if (secureTextEntry === true && showPasswordtoggle === true) {
    secureTextEntry = false;
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.infoText}>{title}</Text>
      </View>
      {fieldType === "phoneNumber" ? ( //phone number field
        <View
          style={
            formError.phoneNumber === "error" //if the field has errors
              ? [styles.inputRow, { borderBottomColor: colors.gray }]
              : styles.inputRow
          }
        >
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secureTextEntry}
          />
          <Ionicons
            name="ios-checkmark-circle"
            size={22}
            color={
              formError.phoneNumber === "error" ? colors.gray : colors.green
            }
          />
        </View>
      ) : // not phone number field, aka everything else
      fieldType === "name" ? ( // name field
        <View
          style={
            formError.name === "error" //if the field has errors
              ? [styles.inputRow, { borderBottomColor: colors.gray }]
              : styles.inputRow
          }
        >
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secureTextEntry}
          />
          <Ionicons
            name="ios-checkmark-circle"
            size={22}
            color={
              formError.name === "error" ? colors.gray : colors.green
            }
          />
        </View>
      ) : (
        <View
          style={
            fieldType !== "password" //if the field is normal
              ? formError.email == "error" //if the normal field has errors
                ? [styles.inputRow, { borderBottomColor: colors.gray }]
                : styles.inputRow
              : formError.password === "error" //if the field is password
              ? [styles.inputRow, { borderBottomColor: colors.gray }] // if the field has errors
              : styles.inputRow
          }
        >
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secureTextEntry}
          />
          {fieldType !== "password" && (
            <Ionicons
              name="ios-checkmark-circle"
              size={22}
              color={formError.email === "error" ? colors.gray : colors.green}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setShowPasswordToggle(!showPasswordtoggle);
            }}
          >
            {fieldType === "password" &&
              (showPasswordtoggle ? (
                <Ionicons
                  name="eye"
                  size={22}
                  color={
                    formError.password === "error" ? colors.gray : colors.green
                  }
                />
              ) : (
                <Ionicons
                  name="eye-off"
                  size={22}
                  color={
                    formError.password === "error" ? colors.gray : colors.green
                  }
                />
              ))}
          </TouchableOpacity>
        </View>
      )}
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
