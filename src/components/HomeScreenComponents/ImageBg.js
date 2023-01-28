import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import axios from "axios";
import { ImageSlider } from "react-native-image-slider-banner";

const test = [
  {
    img: "http://codelumina.com/project/wallet_managment/public/uploads/banner/3048042034.jpg",
  },
  {
    img: "http://codelumina.com/project/wallet_managment/public/uploads/banner/8376914099.jpg",
  },
  {
    img: "http://codelumina.com/project/wallet_managment/public/uploads/banner/7986263439.jpg",
  },
];
const ImageBg = () => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState();
  async function getImages() {
    axios
      .post("http://codelumina.com/project/wallet_managment/api/banners")
      .then((res) => {
        console.log(res.data);
        setImages(res.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getImages();
  }, []);
  // createData();
  // async function createData() {
  // let temp = [];
  // for (let i = 0; i < images.length; i++) {
  //   temp.push({ img: images[i].image });
  // }
  // console.log("🚀 ~ file: ImageBg.js:25 ~ createData ~ data", temp);
  // setData(temp);
  // setData(temp);
  // }

  return (
    <View style={styles.root}>
      {/* <FlatList
        data={images}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, width: layout.widthp }}>
              <Image
                source={{ uri: item.image }}
                style={{ height: 200, width: "100%" }}
                resizeMode="contain"
              />
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      /> */}
      <ImageSlider
        data={images.map((item) => {
          return { img: item.image };
        })}
        autoPlay={true}
        onItemChanged={(item) => console.log("item", item)}
        closeIconColor="#fff"
        caroselImageStyle={{
          resizeMode: "contain",
          height: 200,
        }}
      />
    </View>
  );
};

export default ImageBg;

const styles = StyleSheet.create({
  root: {
    width: layout.width * 0.9,
    backgroundColor: "white",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    borderRadius: 10,
    elevation: 6,
    // borderWidth: 2,
    borderColor: colors.green,
  },
});
