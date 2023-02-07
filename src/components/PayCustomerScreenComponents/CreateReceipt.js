import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { layout } from "../../constants/layout";
import { Formik } from "formik";
import UploadButton from "./UploadButton";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import TopContainer from "./TopContainer";
import Dropdown from "../DetailScreenComponents/Dropdown";
import Storage from "../../utils/expireStorage";
import { BASEURL } from "../../constants/apiurl";

const CreateReceipt = () => {
  const [loading, setLoading] = useState(false);
  const [currencydata, setCurrencyData] = useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  console.log(
    "🚀 ~ file: CreateReceipt.js:20 ~ CreateReceipt ~ route",
    route.params
  );

  const rri = useSelector((state) => state.user.receiptReceiverImage);
  const rrii = useSelector((state) => state.user.receiptReceiverId);
  const currency = useSelector((state) => state.user.currency);
  console.log(
    "🚀 ~ file: CreateReceipt.js:30 ~ CreateReceipt ~ currency",
    currency
  );

  async function fetchCurrency() {
    setLoading(true);
    axios
      .post(`${BASEURL}/currency`)
      .then((res) => {
        console.log(res.data.data);
        setCurrencyData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert(
            "Failed getting currency data",
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
  async function sendReceipt(values) {
    console.log(
      "🚀 ~ file: CreateReceipt.js:23 ~ sendReceipt ~ values",
      values
    );
    let filename1 = rri.uri.split("/").pop();
    let filename2 = rrii.uri.split("/").pop();

    let match1 = /\.(\w+)$/.exec(filename1);
    let type1 = match1 ? `image/${match1[1]}` : `image`;
    let match2 = /\.(\w+)$/.exec(filename2);
    let type2 = match2 ? `image/${match2[1]}` : `image`;

    // let result = await SecureStore.getItemAsync("id");
    let result = await Storage.getItem("id");

    let formData = new FormData();
    formData.append("agent_id", result);
    formData.append("currency", currency);
    formData.append(
      "transaction_id",
      route?.params?.transactionData.transaction_id
    );
    formData.append("amount", values.amount);
    formData.append("reciver_name", values.receiver_name);
    formData.append("reciver_image", {
      uri: rri.uri,
      name: filename1,
      type: type1,
    });
    formData.append("reciver_id_image", {
      uri: rrii.uri,
      name: filename2,
      type: type2,
    });

    axios
      .post(
        `${BASEURL}/agent/receipt/insert`,
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
        console.log(res.data);
        setLoading(false);
        Alert.alert("Receipt Created", res.data.message, [
          {
            text: "OK",
            onPress: () => navigation.navigate("DrawerNavigator",{screen:'HomeScreen'}),
          },
        ]);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response - ", error.response.data);
          Alert.alert(
            "Failed creating receipt",
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
  useEffect(() => {
    fetchCurrency();
  }, []);
  return (
    <View style={styles.root}>
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          // flex: 1,
          // backgroundColor: "pink",
          width: layout.width,
        }}
        style={{
          alignSelf: "center",
          // flex: 1,
          width: layout.width,
        }}
      >
        <View
          style={{
            // flex: 1,
            width: layout.widthp,
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "poppins-semibold",
              fontSize: 24,
              // color: colors.green,
            }}
          >
            Create Receipt
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Formik
            initialValues={{
              transaction_id: "",
              amount: "",
              receiver_name: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              sendReceipt(values);
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {/* <Input
                title={"Transaction ID"}
                placeholder={"Transaction ID"}
                onChangeText={handleChange("transaction_id")}
                onBlur={handleBlur("transaction_id")}
                value={values.transaction_id}
              /> */}
                <Input
                  title={"Amount"}
                  placeholder={"Amount"}
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  value={values.amount}
                />
                <Dropdown title={"Currency"} data={currencydata} />
                <Input
                  title={"Receiver Name"}
                  placeholder={"Receiver Name"}
                  onChangeText={handleChange("receiver_name")}
                  onBlur={handleBlur("receiver_name")}
                  value={values.receiver_name}
                />
                <UploadButton type={"receiverImage"} title={"Receiver Image"} />
                <UploadButton type={"receiverId"} title={"Receive ID Image"} />
                <View style={{ paddingVertical: 10 }}>
                  <CustomButton
                    title={"create Receipt"}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View style={{marginTop:30}}>
          <TopContainer />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateReceipt;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    // height: 400,
    width: layout.width,
    elevation:6,
shadowRadius: 5,
shadowOpacity: 0.25,
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
