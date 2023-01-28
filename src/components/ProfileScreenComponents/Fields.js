import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Formik } from "formik";
import Input from "../DetailScreenComponents/Input";
import CustomButton from "../CustomButton";

const Fields = () => {
  const [loading, setLoading] = useState(false);
  async function updateProfile(values) {
    setLoading(true);
    const result = await SecureStore.getItemAsync("id");

    let data = {
      user_id: result,
      name: values.name,
      current_password: values.current_password,
    };

    if (values.new_password) {
      data = {
        user_id: result,
        name: values.name,
        current_password: values.current_password,
        new_password: values.new_password,
      };
    }

    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/profile/update",
        data
      )
      .then((res) => {
        console.log(res.data);
        Alert.alert("Profile Updated", res.data.message);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert(
            "Failed Updating Profile",
            JSON.stringify(error.response.data.message)
          );
          setLoading(false);
        } else if (error.request) {
          console.log(error.request);
          setLoading(false);
        } else {
          console.log("Error", error.message);
          setLoading(false);
        }
        console.log(error.config);
        setLoading(false);
      });
  }
  return (
    <View>
      <Formik
        initialValues={{
          name: "",
          current_password: "",
          new_password: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          updateProfile(values);
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
          <View>
            <Input
              placeholder={"Name"}
              title={"Your Updated Name"}
              onChangeText={handleChange("name")}
              handleBlur={handleBlur("name")}
              value={values.name}
            />
            <Input
              placeholder={"CurrentPassword"}
              title={"Current Password"}
              onChangeText={handleChange("current_password")}
              handleBlur={handleBlur("current_password")}
              value={values.current_password}
            />
            <View style={{ height: 10 }} />
            <Input
              placeholder={"New Password"}
              title={
                "New Password\n(leave this empty if you do not want to update password)"
              }
              onChangeText={handleChange("new_password")}
              handleBlur={handleBlur("new_password")}
              value={values.new_password}
            />
            <View style={{ paddingTop: 40 }}>
              <CustomButton
                title={loading ? "Loading.." : "Update"}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Fields;

const styles = StyleSheet.create({});
