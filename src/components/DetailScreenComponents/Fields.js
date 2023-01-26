import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./Input";
import { Formik } from "formik";
import UploadButton from "./UploadButton";
import { launchCameraAsync } from "expo-image-picker";
import { layout } from "../../constants/layout";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";

const Fields = () => {
  const si = useSelector((state) => state.user.senderImage);
  const sii = useSelector((state) => state.user.senderIdImage);
  const ri = useSelector((state) => state.user.receiverImage);
  const rii = useSelector((state) => state.user.receiverIdImage);
  async function sendTransaction(values) {}
  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            agent_id: "",
            unique_id: "",
            transaction_id: "",
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
            receiver_money_location: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={""}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.inputContainer}>
              <Input
                placeholder={"Agent ID"}
                title={"Agent ID"}
                onChangeText={handleChange("agent_id")}
                handleBlur={handleBlur("agent_id")}
                value={values.agent_id}
                fieldType={"agent_id"}
              />
              <Input
                placeholder={"Unique ID"}
                title={"Unique ID"}
                onChangeText={handleChange("unique_id")}
                handleBlur={handleBlur("unique_id")}
                value={values.unique_id}
                fieldType={"unique_id"}
              />
              <Input
                placeholder={"Transaction ID"}
                title={"Transaction ID"}
                onChangeText={handleChange("transaction_id")}
                handleBlur={handleBlur("transaction_id")}
                value={values.transaction_id}
                fieldType={"transaction_id"}
              />
              <Input
                placeholder={"Amount"}
                title={"Amount"}
                onChangeText={handleChange("amount")}
                handleBlur={handleBlur("amount")}
                value={values.amount}
                fieldType={"amount"}
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
              {/* <UploadButton title={"Sender Image"} type={"senderImage"} />
              <UploadButton
                title={"Sender ID Card Image"}
                type={"senderIdImage"}
              /> */}
              {/* <Input
                placeholder={"Sender State"}
                title={"Sender State"}
                onChangeText={handleChange("sender_current_state")}
                handleBlur={handleBlur("sender_current_state")}
                value={values.sender_current_state}
                fieldType={"sender_currrent_state"}
              />
              <Input
                placeholder={"Sender City"}
                title={"Sender City"}
                onChangeText={handleChange("sender_current_city")}
                handleBlur={handleBlur("sender_current_city")}
                value={values.sender_current_city}
                fieldType={"sender_current_city"}
              /> */}
              {/* <Input
                placeholder={"Sender Location"}
                title={"Sender Location"}
                onChangeText={handleChange("sender_current_location")}
                handleBlur={handleBlur("sender_current_location")}
                value={values.sender_current_location}
                fieldType={"sender_current_location"}
              /> */}
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
              <Input
                placeholder={"Receiver Money Location"}
                title={"Receiver Location"}
                onChangeText={handleChange("receiver_money_location")}
                handleBlur={handleBlur("receiver_money_location")}
                value={values.receiver_money_location}
                fieldType={"receiver_money_location"}
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
