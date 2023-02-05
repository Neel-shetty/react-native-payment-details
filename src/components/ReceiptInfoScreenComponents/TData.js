import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DataItem from "./DataItem";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { layout } from "../../constants/layout";

const TData = () => {
  const [transactions, setTransactions] = useState(null);
  console.log("🚀 ~ file: TData.js:10 ~ TData ~ transactions", transactions);
  const [loading, setLoading] = useState(false);

  const route = useRoute();

  async function fetchInfo() {
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/receipt/detail",
        {
          receipt_id: route?.params?.receipt_id,
        }
      )
      .then(async (res) => {
        setTransactions(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Failed to get Receipt data, try again later",
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
    fetchInfo();
  }, []);

  if (loading || !transactions) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  const date = new Date(transactions.created_at);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DataItem title={" Id"} data={transactions.id} />
        <DataItem title={"Agent ID"} data={transactions.agent_id} />
        <DataItem title={"Amount"} data={transactions.amount} />
        <DataItem title={"Currency"} data={transactions.currency} />
        <DataItem title={"Transaction ID"} data={transactions.transaction_id} />
        {/* <DataItem
          title={"Agent State"}
          data={
            // transactions.agent_current_state
            "Karnataka"
          }
        />
        <DataItem
          title={"Agent City"}
          data={
            // transactions.agent_current_city
            "Bangalore"
          }
        /> */}
        {/* <DataItem
          title={"Agent Location"}
          data={
            // transactions.agent_current_location
            "Placeholder"
          }
        /> */}
        <DataItem title={"Receiver Name"} data={transactions.reciver_name} />
        <DataItem title={"Date"} data={date.toLocaleDateString("en-GB")} />
        <View style={{ width: layout.widthp, alignItems: "center" }}>
          <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
            Receiver Image
          </Text>
          <Image
            source={{ uri: transactions.reciver_image }}
            style={{ width: "100%", height: 250, borderRadius: 10 }}
          />
          <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
            Receiver ID Card Image
          </Text>
          <Image
            source={{ uri: transactions.reciver_id_image }}
            style={{ width: "100%", height: 250, borderRadius: 10 }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TData;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
