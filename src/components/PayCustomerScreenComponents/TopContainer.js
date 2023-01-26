import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { layout } from "../../constants/layout";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { setReceiptData } from "../../store/slice/userSlice";

const TopContainer = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDeatils] = useState();
  console.log(
    "🚀 ~ file: TopContainer.js:13 ~ TopContainer ~ details",
    details
  );
  // const [notSearched, setNotSearched] = useState(true);
  const searched = useSelector((state) => state.user.searched);
  const receiptId = useSelector((state) => state.user.receipt);
  console.log(
    "🚀 ~ file: TopContainer.js:16 ~ TopContainer ~ receiptId",
    receiptId
  );

  const dispatch = useDispatch();

  async function getData() {
    setLoading(true);
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/receipt/detail",
        {
          receipt_id: receiptId,
        }
      )
      .then(async (res) => {
        console.log(res.data);
        // setTransactions(res.data.data);
        setDeatils(res.data);
        dispatch(setReceiptData(res.data));
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response - ", error.response.data);
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
    if (receiptId) {
      getData();
    }
  }, [receiptId, searched]);

  if (loading) return;

  const date = new Date(details?.data.created_at);
  console.log("🚀 ~ file: TopContainer.js:59 ~ TopContainer ~ date", date);

  return (
    <View style={styles.root}>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          width: layout.widthp,
          paddingHorizontal: 10,
        }}
      >
        {searched ? (
          <>
            <Text style={styles.title}>
              Transaction ID -{" "}
              <Text style={{ color: colors.green }}>{details?.data.id}</Text>
            </Text>
            <Text style={styles.title}>
              Unique ID -{" "}
              <Text style={{ color: colors.green }}>
                {details?.data.transaction_id}
              </Text>
            </Text>
            <Text style={styles.title}>
              Date -{" "}
              <Text style={{ color: colors.green }}>
                {date ? date.toLocaleDateString("en-GB") : ""}
              </Text>
            </Text>
          </>
        ) : (
          <Text style={styles.title}>
            Search using transaction ID to get it's details
          </Text>
        )}
      </View>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    // marginHorizontal:10
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
