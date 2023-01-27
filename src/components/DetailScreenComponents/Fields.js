import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Formik } from "formik";
import UploadButton from "./UploadButton";
import { launchCameraAsync } from "expo-image-picker";
import { layout } from "../../constants/layout";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import axios from "axios";
import { colors } from "../../constants/colors";

const Fields = () => {
  const [loading, setLoading] = useState();
  console.log("🚀 ~ file: Fields.js:22 ~ Fields ~ loading", loading);
  const [dropdownData, setDropdownData] = useState();

  const si = useSelector((state) => state.user.senderImage);
  const sii = useSelector((state) => state.user.senderIdImage);
  const ri = useSelector((state) => state.user.receiverImage);
  const rii = useSelector((state) => state.user.receiverIdImage);

  async function fetchDropdownData() {
    setLoading(true);
    axios
      .post("http://codelumina.com/project/wallet_managment/api/locations")
      .then((res) => {
        console.log(res.data.data);
        setDropdownData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert(
            "Failed getting dropdown data",
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

  async function sendTransaction(values) {
    let filename1 = si.uri.split("/").pop();
    let filename2 = sii.uri.split("/").pop();
    let filename3 = ri.uri.split("/").pop();
    let filename4 = rii.uri.split("/").pop();

    let match1 = /\.(\w+)$/.exec(filename1);
    let type1 = match1 ? `image/${match1[1]}` : `image`;
    let match2 = /\.(\w+)$/.exec(filename2);
    let type2 = match2 ? `image/${match2[1]}` : `image`;
    let match3 = /\.(\w+)$/.exec(filename3);
    let type3 = match3 ? `image/${match3[1]}` : `image`;
    let match4 = /\.(\w+)$/.exec(filename4);
    let type4 = match4 ? `image/${match4[1]}` : `image`;

    let formData = new FormData();
    formData.append("receiver_image", {
      uri: ri.uri,
      name: filename3,
      type: type3,
    });
    formData.append("receiver_id_card_image", {
      uri: rii.uri,
      name: filename4,
      type: type4,
    });
    formData.append("sender_image", {
      uri: si.uri,
      name: filename1,
      type: type1,
    });
    formData.append("sender_id_card_image", {
      uri: sii.uri,
      name: filename2,
      type: type3,
    });
    formData.append("amount", values.amount);
    formData.append("commission", values.commision);
    formData.append("sender_name", values.sender_name);
    formData.append("sender_phone", values.sender_phone);
  }

  useEffect(() => {
    fetchDropdownData();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={colors.green} />
      </View>
    );

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            commision: "",
            sender_name: "",
            sender_phone: "",
            sender_address: "",
            sender_id_card_image: "",
            amount: "",
            // sender_ip: "",
            // sender_current_lat: "",
            // sender_current_lng: "",
            // sender_current_state: "",
            // sender_current_city: "",
            sender_current_location: "",
            receiver_name: "",
            receiver_phone: "",
            receiver_address: "",
            // receiver_image: "",
            // receiver_id_card_image: "",
            payment_receiving_location: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={""}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.inputContainer}>
              <Input
                placeholder={"Amount"}
                title={"Amount"}
                onChangeText={handleChange("amount")}
                handleBlur={handleBlur("amount")}
                value={values.amount}
                fieldType={"amount"}
              />
              <Input
                placeholder={"Commision"}
                title={"Commision"}
                onChangeText={handleChange("commision")}
                handleBlur={handleBlur("commision")}
                value={values.commision}
                fieldType={"commision"}
              />
              <Input
                placeholder={"Sender Name"}
                title={"Sender Name"}
                onChangeText={handleChange("sender_name")}
                handleBlur={handleBlur("sender_name")}
                value={values.sender_name}
                fieldType={"sender_name"}
              />
              <Input
                placeholder={"Sender Phone"}
                title={"Sender Phone"}
                onChangeText={handleChange("sender_phone")}
                handleBlur={handleBlur("sender_phone")}
                value={values.sender_phone}
                fieldType={"sender_phone"}
              />
              <Input
                placeholder={"Sender Address"}
                title={"Sender Address"}
                onChangeText={handleChange("sender_address")}
                handleBlur={handleBlur("sender_address")}
                value={values.sender_address}
                fieldType={"sender_address"}
              />
              <Input
                placeholder={"Receiver Name"}
                title={"Receiver Name"}
                onChangeText={handleChange("receiver_name")}
                handleBlur={handleBlur("receiver_name")}
                value={values.receiver_name}
                fieldType={"receiver_name"}
              />
              <Input
                placeholder={"Receiver Phone"}
                title={"Receiver Phone"}
                onChangeText={handleChange("receiver_phone")}
                handleBlur={handleBlur("receiver_phone")}
                value={values.receiver_phone}
                fieldType={"receiver_phone"}
              />
              <Input
                placeholder={"Receiver Address"}
                title={"Receiver Address"}
                onChangeText={handleChange("receiver_address")}
                handleBlur={handleBlur("receiver_address")}
                value={values.receiver_address}
                fieldType={"receiver_address"}
              />
              <Dropdown
                title={"Payment Receiving Location"}
                data={dropdownData}
              />

              <UploadButton title={"Sender Image"} type={"senderImage"} />
              <UploadButton
                title={"Sender ID Card Image"}
                type={"senderIdImage"}
              />
              <UploadButton title={"Receiver Image"} type={"receiverImage"} />
              <UploadButton
                title={"Receiver ID Card Image"}
                type={"receiverIdImage"}
              />
              <View style={{ paddingVertical: 10 }}>
                <CustomButton title={"Next"} onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default Fields;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
  },
});
