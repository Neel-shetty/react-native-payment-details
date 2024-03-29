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
import { BASEURL } from "../../constants/apiurl";

const TData = () => {
  const [transactions, setTransactions] = useState(null);
  console.log("🚀 ~ file: TData.js:10 ~ TData ~ transactions", transactions);
  const [loading, setLoading] = useState(false);

  const route = useRoute();

  async function fetchInfo() {
    axios
      .post(
        `${BASEURL}/agent/transaction/detail`,
        {
          transaction_id: route?.params?.transaction_id,
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
        <DataItem title={"Commission"} data={transactions.commission} />
        <DataItem title={"Currency"} data={transactions.currency} />
        <DataItem title={"Unique ID"} data={transactions.unique_id} />
        <DataItem title={"Transaction ID"} data={transactions.transaction_id} />
        <DataItem title={"Sender Name"} data={transactions.sender_name} />
        <DataItem title={"Sender Address"} data={transactions.sender_address} />
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
        <DataItem title={"Receiver Name"} data={transactions.receiver_name} />
        <DataItem title={"Receiver Phone"} data={transactions.receiver_phone} />
        <DataItem
          title={"Receiver Address"}
          data={transactions.receiver_address}
        />
        <DataItem
          title={"Receiver Money Location"}
          data={transactions.receive_money_location}
        />
        <DataItem title={"Status"} data={transactions.status} />
        <DataItem title={"Date"} data={date.toLocaleDateString("en-GB")} />
        <View style={{ width: layout.widthp, alignItems: "center" }}>
          <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
            Sender Image
          </Text>
          <Image
            source={{ uri: transactions.sender_image }}
            style={{ width: "100%", height: 250, borderRadius: 10 }}
          />
          <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
            Sender ID Card Image
          </Text>
          <Image
            source={{ uri: transactions.sender_id_card_image }}
            style={{ width: "100%", height: 250, borderRadius: 10 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ width: layout.widthp, alignItems: "center" }}>
          <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
            Receiver Image
          </Text>
          <Image
            source={{ uri: transactions.receiver_image }}
            style={{ width: "100%", height: 250, borderRadius: 10 }}
          />
          <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
            Receiver ID Card Image
          </Text>
          <Image
            source={{ uri: transactions.receiver_id_card_image }}
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
