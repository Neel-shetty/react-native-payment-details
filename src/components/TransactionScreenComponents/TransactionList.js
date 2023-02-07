import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import { layout } from "../../constants/layout";
import axios from "axios";
// import * as SecureStore from "expo-secure-store";
import Storage from "../../utils/expireStorage";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { colors } from "../../constants/colors";
import { BASEURL } from "../../constants/apiurl";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const TransactionList = () => {
  const [transactions, setTransactions] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(
    "🚀 ~ file: TransactionList.js:26 ~ TransactionList ~ endDate",
    endDate
  );
  console.log(
    "🚀 ~ file: TransactionList.js:25 ~ TransactionList ~ date",
    startDate
  );

  // console.log(
  //   "🚀 ~ file: TransactionList.js:19 ~ TransactionList ~ transactions",
  //   transactions
  // );
  const [loading, setLoading] = useState(false);
  const [refresh, setReferesh] = useState(false);

  function applyFilter() {
    filterFetch();
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    console.log("onchange end date running");
    const endDate = selectedDate;
    setEndDate(endDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showEndDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      // onChangeEndDate,
      mode: "date",
      is24Hour: true,
      onChange: onChangeEndDate,
    });
  };
  const formattedStartDate = new Date(startDate);
  const idk = startDate?.toLocaleDateString("en-IN");
  console.log(idk?.slice(3, 5));

  async function filterFetch() {
    if (!startDate || !endDate) {
      Alert.alert("Not allowed", "Please select the start and end date first");
      return;
    }
    setLoading(true);
    const startyear = startDate?.getFullYear();
    const startidk = startDate?.toLocaleDateString("en-IN");
    const startmonth = startidk?.slice(0, 2);
    const startdate = startidk?.slice(3, 5);
    const endyear = startDate?.getFullYear();
    const endidk = endDate?.toLocaleDateString("en-IN");
    const endmonth = endidk?.slice(0, 2);
    const enddate = endidk?.slice(3, 5);
    let result = await Storage.getItem("id");
    // const date1 = `${startyear}-${startmonth}-${startdate}`;
    // const date2 = `${endyear}-${endmonth}-${enddate}`;
    // console.log(date1, date2);
    axios
      .post(
        `${BASEURL}/agent/transaction/filter`,
        {
          agent_id: result,
          start_date: `${startyear}-${startmonth}-${startdate}`,
          end_date: `${endyear}-${endmonth}-${enddate}`,
        }
      )
      .then(async (res) => {
        console.log(res.data.data);
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

  async function fetchTransactionData() {
    setLoading(true);
    setReferesh(true);
    // let result = await SecureStore.getItemAsync("id");
    let result = await Storage.getItem("id");
    axios
      .post(
        `${BASEURL}/agent/transactions`,
        {
          agent_id: result,
        }
      )
      .then(async (res) => {
        console.log(res.data.data);
        setTransactions(res.data.data);
        setLoading(false);
        setReferesh(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Failed to get transaction data, try again later",
            JSON.stringify(error.response.data.message)
          );
          setLoading(false);
          setReferesh(false);
        } else if (error.request) {
          console.log(error.request);
          setLoading(false);
          setReferesh(false);
        } else {
          console.log("Error", error.message);
          setLoading(false);
          setReferesh(false);
        }
        console.log(error.config);
        setLoading(false);
        setReferesh(false);
      });
  }

  useEffect(() => {
    fetchTransactionData();
  }, []);

  if (loading || !transactions) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View
        style={{
          // flexDirection: "row",
          // justifyContent: "space-between",
          width: layout.widthp,
          backgroundColor: "white",
          borderRadius: 10,
          flex: 1,
          // paddingLeft: 10,
          // paddingRight: 10,
          alignItems: "center",
          elevation:6,
shadowRadius: 5,
shadowOpacity: 0.25,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: layout.widthp,
            flex: 1,
            // backgroundColor:'pink',
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontFamily: "poppins-semibold" }}>Filter </Text>
          <View>
            <TouchableOpacity onPress={applyFilter}>
              <Text
                style={{ fontFamily: "poppins-semibold", color: colors.green }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: layout.widthp,
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={{ fontFamily: "poppins-medium" }}>
              From -{" "}
              <Text style={startDate ? { color: "black" } : { color: "gray" }}>
                {startDate
                  ? startDate.toLocaleDateString("en-IN")
                  : "SelectDate"}
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showEndDatepicker}>
            <Text style={{ fontFamily: "poppins-medium" }}>
              To -{" "}
              <Text style={endDate ? { color: "black" } : { color: "gray" }}>
                {endDate ? endDate.toLocaleDateString("en-IN") : "SelectDate"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 12 }}>
        <FlatList
          onRefresh={fetchTransactionData}
          refreshing={refresh}
          data={transactions}
          renderItem={({ item }) => {
            return (
              // <View>
              <TransactionItem
                id={item.transaction_id}
                amount={item.amount}
                date={item.updated_at}
                deleteTransaction={""}
                currency={item.currency}
                status={item.status}
              />
              // </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: layout.width,
  },
});
