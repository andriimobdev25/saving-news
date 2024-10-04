import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const { width } = Dimensions.get("screen");
const BreakingNewsitem = ({ item }) => {
  return (
    <Pressable
      style={[styles.outerContainer, { width }]}
      onPress={() => {
        console.log("press");
        router.push({
          pathname: `news/${item.article_id}`,
          params: {
            item: { ...item },
          },
        });
        router.p;
      }}
    >
      {item.image_url != null ? (
        <Image
          source={{ uri: item.image_url }}
          style={styles.headlineImg}
        ></Image>
      ) : (
        <View>
          <MaterialIcons name="article" size={width - 250} color="black" />
        </View>
      )}

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.headlineContainer}
      >
        <View style={styles.headlineContentContainer}>
          <View style={styles.headlineSource}>
            <Image
              source={{ uri: item.source_icon }}
              resizeMode="contain"
              style={{ width: 40, height: 40, borderRadius: 8 }}
            ></Image>
            <Text
              numberOfLines={1}
              style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
            >
              {item.source_name}
            </Text>
          </View>
          <Text style={styles.headlineTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default BreakingNewsitem;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    elevation: 25,
  },
  headlineImg: {
    borderRadius: 20,
    // opacity: 0.7,
    height: 200,
    width: width - 25,
  },
  headlineContainer: {
    borderRadius: 20,
    position: "absolute",
    height: 200,
    width: width - 25,
  },
  headlineContentContainer: {
    flex: 1,
    position: "absolute",
    bottom: 15,
    paddingHorizontal: 15,
  },
  headlineSource: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  headlineTitle: {
    color: "white",
    fontSize: 12,
  },
});
