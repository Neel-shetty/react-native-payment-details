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
import * as Location from "expo-location";
import publicIP from "react-native-public-ip";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as yup from "yup";
import Storage from '../../utils/expireStorage'

const Fields = () => {
  const [loading, setLoading] = useState();
  // console.log("🚀 ~ file: Fields.js:22 ~ Fields ~ loading", loading);
  const [dropdownData, setDropdownData] = useState();
  const [currencydata, setCurrencyData] = useState();
  console.log("🚀 ~ file: Fields.js:32 ~ Fields ~ currencydata", currencydata);
  const [location, setLocation] = useState(null);
  // console.log("🚀 ~ file: Fields.js:29 ~ Fields ~ location", location?.coords);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ip, setIp] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  console.log(
    "🚀 ~ file: Fields.js:36 ~ Fields ~ transactionData",
    transactionData
  );
  const [dataLoading, setDataLoading] = useState(false);

  const si = useSelector((state) => state.user.senderImage);
  const sii = useSelector((state) => state.user.senderIdImage);
  const ri = useSelector((state) => state.user.receiverImage);
  const rii = useSelector((state) => state.user.receiverIdImage);
  const dropdown = useSelector((state) => state.user.selectedDropdown);
  const currency = useSelector((state) => state.user.currency);

  const navigation = useNavigation();
  const route = useRoute();
  console.log(
    "🚀 ~ file: Fields.js:45 ~ Fields ~ route",
    route.params.transaction_id
  );

  const formScheme = yup.object({
    amount: yup.string().required(),
    commision: yup.string().required(),
    sender_name: yup.string().required(),
    sender_phone: yup.string().required(),
    sender_address: yup.string().required(),
    receiver_name: yup.string().required(),
    receiver_phone: yup.string().required(),
    receiver_address: yup.string().required(),
    commission: yup.string().required(),
  });

  async function fetchDropdownData(callback) {
    setLoading(true);
    axios
      .post("http://codelumina.com/project/wallet_managment/api/locations")
      .then((res) => {
        // console.log(res.data.data);
        setDropdownData(res.data.data);
        // setLoading(false);
        callback();
      })
      .catch((error) => {
        Alert.alert("failed getting data", "try again later");
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert(
            "Failed getting dropdown data",
            JSON.stringify(error.response.data.message)
          );
          // setLoading(false);
        } else if (error.request) {
          console.log(error.request);
          // setLoading(false);
        } else {
          console.log("Error", error.message);
          // setLoading(false);
        }
        console.log(error.config);
        // setLoading(false);
      });
  }
  async function fetchInfo() {
    // setLoading(true);
    setDataLoading(true);
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/transaction/detail",
        {
          transaction_id: route?.params?.transaction_id,
        }
      )
      .then(async (res) => {
        console.log(res.data.data);
        setTransactionData(res.data.data);
        setLoading(false);
        setDataLoading(false);
      })
      .catch((error) => {
        Alert.alert("failed getting data", "try again later");
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Failed to get transaction data, try again later",
            JSON.stringify(error.response.data.message)
          );
          setLoading(false);
          setDataLoading(false);
        } else if (error.request) {
          console.log(error.request);
          setLoading(false);
          setDataLoading(false);
        } else {
          console.log("Error", error.message);
          setLoading(false);
          setDataLoading(false);
        }
        console.log(error.config);
        setLoading(false);
        setDataLoading(false);
      });
  }
  async function fetchCurrency(callback) {
    // setLoading(true);
    axios
      .post("http://codelumina.com/project/wallet_managment/api/currency")
      .then((res) => {
        console.log(res.data.data);
        setCurrencyData(res.data.data);
        callback();
        // setLoading(false);
      })
      .catch((error) => {
        Alert.alert("failed getting data", "try again later");
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert(
            "Failed getting currency data",
            JSON.stringify(error.response.data.message)
          );
          // setLoading(false);
        } else if (error.request) {
          console.log(error.request);
          // setLoading(false);
        } else {
          console.log("Error", error.message);
          // setLoading(false);
        }
        console.log(error.config);
        // setLoading(false);
      });
  }

  async function sendTransaction(values) {
    // let result = await SecureStore.getItemAsync("id");
        let result = await Storage.getItem('id');

    let formData = new FormData();
    if (ri) {
      let filename3 = ri.uri.split("/").pop();
      let match3 = /\.(\w+)$/.exec(filename3);
      let type3 = match3 ? `image/${match3[1]}` : `image`;
      formData.append("receiver_image", {
        uri: ri.uri,
        name: filename3,
        type: type3,
      });
    }
    if (rii) {
      let filename4 = rii.uri.split("/").pop();

      let match4 = /\.(\w+)$/.exec(filename4);
      let type4 = match4 ? `image/${match4[1]}` : `image`;
      formData.append("receiver_id_card_image", {
        uri: rii.uri,
        name: filename4,
        type: type4,
      });
    }
    if (si) {
      let filename1 = si.uri.split("/").pop();
      let match1 = /\.(\w+)$/.exec(filename1);
      let type1 = match1 ? `image/${match1[1]}` : `image`;
      formData.append("sender_image", {
        uri: si.uri,
        name: filename1,
        type: type1,
      });
    }
    if (sii) {
      let filename2 = sii.uri.split("/").pop();
      let match2 = /\.(\w+)$/.exec(filename2);
      let type2 = match2 ? `image/${match2[1]}` : `image`;
      formData.append("sender_id_card_image", {
        uri: sii.uri,
        name: filename2,
        type: type2,
      });
    }
    formData.append("transaction_id", route?.params?.transaction_id);
    formData.append("amount", values.amount);
    formData.append("commission", values.commision);
    formData.append("sender_name", values.sender_name);
    formData.append("sender_phone", values.sender_phone);
    formData.append("sender_address", values.sender_address);
    formData.append("receiver_name", values.receiver_name);
    formData.append("receiver_phone", values.receiver_phone);
    formData.append("receiver_address", values.receiver_address);
    formData.append("agent_ip", ip);
    formData.append("agent_current_lat", location?.coords.latitude);
    formData.append("agent_current_lng", location?.coords.longitude);
    formData.append("agent_id", result);
    formData.append("currency", currency);
    if (dropdown) {
      formData.append("receive_money_location", dropdown);
    }
    // console.log(
    //   "🚀 ~ file: Fields.js:124 ~ sendTransaction ~ formData",
    //   formData
    // );

    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/transaction/update",
        formData,
        {
          headers: {
            // accept: "application/json",
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (res) => {
        console.log(res.data.data);
        setLoading(false);
        Alert.alert(
          "Transaction Updated",
          JSON.stringify(res.data.data.message),
          [
            {
              text: "OK",
              onPress: () => console.log("ok"),
            },
          ]
        );
        navigation.navigate("TransactionInfoScreen", {
          transaction_id: res.data.data.transaction_id,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert("Failed creating receipt", error.response.data.message);
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    publicIP()
      .then((ip) => {
        console.log(ip);
        setIp(ip);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchDropdownData(function () {
      fetchCurrency(function () {
        fetchInfo();
      });
    });
    // fetchCurrency();
    // fetchInfo();
    // setLoading(false);
  }, []);

  if (dataLoading || transactionData === null) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            commision: transactionData.commission,
            sender_name: transactionData.sender_name,
            sender_phone: transactionData.sender_phone,
            sender_address: transactionData.sender_address,
            // sender_id_card_image: "",
            amount: transactionData.amount,
            // sender_ip: "",
            // sender_current_lat: "",
            // sender_current_lng: "",
            // sender_current_state: "",
            // sender_current_city: "",
            sender_current_location: "",
            receiver_name: transactionData.receiver_name,
            receiver_phone: transactionData.receiver_phone,
            receiver_address: transactionData.receiver_address,
            // receiver_image: "",
            // receiver_id_card_image: "",
            payment_receiving_location: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            sendTransaction(values);
          }}
          // validationSchema={formScheme}
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
                keyboardType={"numeric"}
              />
              <Input
                placeholder={"Commision"}
                title={"Commision"}
                onChangeText={handleChange("commision")}
                handleBlur={handleBlur("commision")}
                value={values.commision}
                fieldType={"commision"}
                keyboardType={"numeric"}
              />
              {!loading ? (
                <Dropdown
                  title={"Currency"}
                  data={currencydata}
                  defaultOption={transactionData.currency}
                />
              ) : (
                <ActivityIndicator size={"large"} color={colors.green} />
              )}
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
                keyboardType={"numeric"}
                maxLength={10}
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
                keyboardType={"numeric"}
                maxLength={10}
              />
              <Input
                placeholder={"Receiver Address"}
                title={"Receiver Address"}
                onChangeText={handleChange("receiver_address")}
                handleBlur={handleBlur("receiver_address")}
                value={values.receiver_address}
                fieldType={"receiver_address"}
              />
              {!loading ? (
                <Dropdown
                  title={"Payment Receiving Location"}
                  data={dropdownData}
                  defaultOption={transactionData.receive_money_location}
                />
              ) : (
                <ActivityIndicator size={"large"} color={colors.green} />
              )}
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
                <CustomButton
                  title={loading ? "loading..." : "Next"}
                  onPress={handleSubmit}
                />
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
