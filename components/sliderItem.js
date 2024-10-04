import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";

const sliderItem = ({ itemDetails }) => {
  const { width } = useWindowDimensions();
  const { item } = itemDetails;
  return (
    <View style={[styles.outerContainer, { width }]}>
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default sliderItem;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 300,
    height: 300,
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 20,
  },
  contentContainer: {
    marginVertical: 20,
    alignItems: "center",
    gap: 5,
  },
  title: {
    color: "white",
    letterSpacing: 2.0,
    fontWeight: "900",
    fontSize: 25,
    fontStyle: "italic",
  },
  description: {
    paddingHorizontal: 30,
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
