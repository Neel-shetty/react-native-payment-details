import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Formik } from "formik";
import * as yup from "yup";
import { colors } from "../../constants/colors";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import { setError } from "../../store/slice/formErrorSlice";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { setLoggedIn } from "../../store/slice/userSlice";
import * as SecureStore from "expo-secure-store";
import Storage from "../../utils/expireStorage";

const InputFields = () => {
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ file: InputFields.js:26 ~ InputFields ~ loading", loading);
  const formScheme = yup.object({
    // phoneNumber: yup.string().phoneNumber("error").required("error"),
    password: yup.string().min(6, "error").required("error"),
    phoneNumber: yup.string().required("error"),
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function ForgotPasswordButton() {
    navigation.navigate("");
  }

  async function save(key, value, expire) {
    await Storage.setItem(key, value, expire);
  }

  function Login(values) {
    setLoading(true);
    axios
      .post("http://codelumina.com/project/wallet_managment/api/user/login", {
        phone: values.phoneNumber,
        password: values.password,
      })
      .then(async (res) => {
        res.data;
        console.log(res.data);
        dispatch(setLoggedIn(true));
        save("isLoggedIn", "true"); //no expire
        save("id", res.data.data.id);
        // navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        // console.log(e.toJSON());
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          Alert.alert(
            "SignIn failed",
            JSON.stringify(error.response.data.message)
          );
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    setLoading(false);
  }

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{ phoneNumber: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          Login(values);
        }}
        validationSchema={formScheme}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors = false,
        }) => (
          <View>
            {useEffect(() => {
              dispatch(setError(errors));
            }, [errors])}
            <Input
              placeholder={"Phone Number / Email"}
              title={"Your Phone Number / Email"}
              onChangeText={handleChange("phoneNumber")}
              handleBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              fieldType={"phoneNumber"}
              error={errors}
            />
            <Input
              placeholder={"Password"}
              title={"Your Password"}
              onChangeText={handleChange("password")}
              handleBlur={handleBlur("password")}
              value={values.password}
              fieldType={"password"}
              secureTextEntry={true}
              errpr={errors}
            />
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={ForgotPasswordButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              title={loading ? "Loading.." : "Sign In"}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  root: {},
  forgotPasswordContainer: {
    alignItems: "flex-end",
    paddingRight: 15,
    height: 50,
    justifyContent: "center",
  },
  forgotText: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: colors.black,
  },
});
