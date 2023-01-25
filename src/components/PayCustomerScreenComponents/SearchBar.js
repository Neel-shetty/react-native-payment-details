import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { Formik } from "formik";

const SearchBar = () => {
  return (
    <View style={styles.root}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors = false,
        }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder={"Search"}
              style={styles.input}
              onChangeText={handleChange("search")}
              onBlur={handleBlur("search")}
              value={values.search}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="search" size={24} color={colors.green} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  input: {
    width: layout.width * 0.75,
    fontFamily: "inter-semibold",
    fontSize: 16,
  },
});
