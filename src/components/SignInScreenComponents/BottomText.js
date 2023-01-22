import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const BottomText = () => {
  const navigation = useNavigation()
  function SignUpButton(){
    navigation.navigate('SignUpScreen')
  }
  return (
    <View style={styles.root}>
      <Text style={styles.text1}>Don't have an account? </Text>
      <TouchableOpacity onPress={SignUpButton}>
        <Text style={styles.text2}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomText;

const styles = StyleSheet.create({
  root:{
    flexDirection:'row'
  },
  text1:{
    fontFamily:'inter-semibold',
    fontSize:16,
    color: colors.gray
  },
  text2:{
    fontFamily:'inter-semibold',
    fontSize:16,
    color: colors.black
  }
});
