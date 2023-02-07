import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import axios from "axios";
import { ImageSlider } from "react-native-image-slider-banner";
import { BASEURL } from "../../constants/apiurl";
// import Slideshow from "react-native-image-slider-show";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(
  //   "🚀 ~ file: ImageBg.js:32 ~ ImageBg ~ currentIndex",
  //   currentIndex
  // );
  const [autoScroll, setAutoScroll] = useState(true);
  // console.log("🚀 ~ file: ImageBg.js:33 ~ ImageBg ~ autoScroll", autoScroll);

  const ref = useRef();

  async function getImages() {
    axios
      .post(`${BASEURL}/banners`)
      .then((res) => {
        // console.log(res.data);
        setImages(res.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getImages();
  }, []);
  console.log(BASEURL)

  useEffect(() => {
    let interval = null;
    if (autoScroll) {
      interval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
          nextIndex = 0;
        }
        setCurrentIndex(nextIndex);
        ref.current.scrollToIndex({
          animated: true,
          index: nextIndex,
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [autoScroll, currentIndex, images]);

  return (
    <View style={styles.root}>
      <View>
        <Animated.FlatList
          ref={ref}
          data={images}
          renderItem={({ item }) => {
            return (
              <Animated.View
                style={{ flex: 1, width: layout.widthp, overflow: "hidden" }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ height: 200, width: "100%" }}
                  resizeMode="contain"
                />
              </Animated.View>
            );
          }}
          keyExtractor={(item) => {
            item.image;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: layout.widthp,
            offset: layout.widthp * index,
            index,
          })}
          snapToInterval={layout.widthp}
          decelerationRate="fast"
          bounces={false}
          pagingEnabled
          onScroll={(e) => {
            // const x = e.nativeEvent.contentOffset.x;
            // if (
            //   Math.floor(Math.floor(x) / Math.floor(layout.widthp)) >
            //     currentIndex ||
            //   Math.floor(Math.floor(x) / Math.floor(layout.widthp)) === 0
            // ) {
            //   setCurrentIndex(
            //     Math.floor(Math.floor(x) / Math.floor(layout.widthp))
            //   );
            // }
            // setAutoScroll(false);
          }}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews={true}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: layout.widthp,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "turquoise",
          height: 30,
        }}
      >
        {images.map((item, index) => {
          return (
            <View key={item.image}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentIndex == index ? "#93e3fe" : "gray",
                marginLeft: 5,
                marginBottom: 15,
                // position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            ></View>
          );
        })}
        {/* <Button
          title="prev"
          onPress={() => {
            setCurrentIndex(currentIndex - 1);
            ref.current.scrollToIndex({
              animated: true,
              index: parseInt(currentIndex) - 1,
            });
          }}
        />
        <Button
          title="next"
          onPress={() => {
            setCurrentIndex(currentIndex - 1);
            ref.current.scrollToIndex({
              animated: true,
              index: parseInt(currentIndex) + 1,
            });
          }}
        /> */}
      </View>
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
    elevation:6,
shadowRadius: 5,
shadowOpacity: 0.25,
    borderWidth: 1,
    borderColor: "#edf0f3",
    overflow: "hidden",
  },
});
