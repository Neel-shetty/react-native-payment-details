import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { layout } from "../../constants/layout";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { setSearched } from "../../store/slice/userSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  async function fetchTransactionData() {
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
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
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

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          console.log(values);
          dispatch(setSearched(true));
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
