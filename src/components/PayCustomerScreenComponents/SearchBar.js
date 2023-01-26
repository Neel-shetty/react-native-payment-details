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
import { setReceipt, setSearched } from "../../store/slice/userSlice";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  console.log("🚀 ~ file: SearchBar.js:22 ~ transactions", transactions);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  const receipt = useSelector((state) => state.user.receipt);
  console.log("🚀 ~ file: SearchBar.js:26 ~ receipt", receipt);

  async function fetchTransactionData() {
    console.log("fetch searchbar");
    setLoading(true);
    let result = await SecureStore.getItemAsync("id");
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/receipt/lists",
        {
          agent_id: result,
        }
      )
      .then(async (res) => {
        // console.log(res.data.data);
        setTransactions(res.data.data);
        checkSearch();
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response", error.response.data);
          // setTransactions(error.response.data);
          Alert.alert(
            "Failed to get transaction data, try again later",
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
    fetchTransactionData();
  }, [searchQuery]);

  useEffect(() => {
    if (!loading) {
      checkSearch();
    }
  }, [searchQuery,transactions]);

  function checkSearch() {
    for (let i = 0; i < transactions.length; i++) {
      console.log('looping');
      // if (JSON.stringify(transactions.data[i]).includes(searchQuery)) {
      // if (!receipt) {
        if (transactions[i].transaction_id == searchQuery) {
          dispatch(setReceipt(transactions[i].id));
          console.log("exists");
        }
      // }
    }
  }

  // if (loading || !transactions) return;

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          console.log(values.search);
          setSearchQuery(values.search);
          dispatch(setSearched(true));
          fetchTransactionData();
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
              autoCapitalize="none"
              autoCorrect={false}
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
