import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { layout } from "../../constants/layout";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  setReceipt,
  setReceiptSearch,
  setSearched,
} from "../../store/slice/userSlice";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Input from "./Input";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function fetchTransactionData(values) {
    console.log("fetch searchbar");
    setLoading(true);
    const result = await SecureStore.getItemAsync("id");
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/transaction/search",
        {
          transaction_id: values.transaction_id,
          unique_id: values.unique_id,
          amount: values.amount,
          agent_id: result,
        }
      )
      .then(async (res) => {
        console.log("search result ---------- ", res.data.data);
        navigation.navigate("SearchResultScreen", {
          transactionData: res.data.data,
        });
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response", error.response.data);

          Alert.alert("Search Failed", error.response.data.message);
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
    <View style={styles.root}>
      <Formik
        initialValues={{ transaction_id: "", unique_id: "", amount: "" }}
        onSubmit={(values) => {
          console.log(values);
          // dispatch(setSearched(true));
          fetchTransactionData(values);
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
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Input
              title={"Transaction ID"}
              placeholder={"Transaction ID"}
              onBlur={handleBlur("transaction_id")}
              onChangeText={handleChange("transaction_id")}
              value={values.transaction_id}
            />
            <Input
              title={"Unique ID"}
              placeholder={"Unique ID"}
              onBlur={handleBlur("unique_id")}
              onChangeText={handleChange("unique_id")}
              value={values.unique_id}
            />
            <Input
              title={"Amount"}
              placeholder={"Amount"}
              onBlur={handleBlur("amount")}
              onChangeText={handleChange("amount")}
              value={values.amount}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 10,
                  paddingBottom: 20,
                }}
              >
                <CustomButton title={"Search"} onPress={handleSubmit} />
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
    justifyContent: "center",
    height: 300,
    // width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    // flexDirection: "row",
    paddingHorizontal: 10,
  },
  input: {
    width: layout.width * 0.75,
    fontFamily: "inter-semibold",
    fontSize: 16,
  },
});
