import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const NewsList = ({ trendingList }) => {
  // console.log(trendingList);
  return (
    // <View style={{ height: Dimensions.get("screen").height }}>
    <ScrollView>
      {trendingList.map((item) => {
        return (
          <Pressable
            key={item.article_id}
            onPress={() => {
              router.push({
                pathname: `news/${item.article_id}`,
              });
            }}
          >
            <View style={styles.itemContainer}>
              {item.image_url != null ? (
                <Image
                  source={{ uri: item.image_url }}
                  resizeMode="cover"
                  style={styles.itemImg}
                ></Image>
              ) : (
                <View>
                  <MaterialIcons name="article" size={100} color="black" />
                </View>
              )}
              <View style={styles.itemContent}>
                <Text
                  style={{
                    fontWeight: "light",
                    fontSize: 10,
                    textTransform: "capitalize",
                  }}
                >
                  {item.category}
                </Text>
                <Text numberOfLines={2} style={{ fontWeight: "semibold" }}>
                  {item.title}
                </Text>
                <View style={styles.itemSource}>
                  <Image
                    source={{ uri: item.source_icon }}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, borderRadius: 4 }}
                  ></Image>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {item.source_name}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
    // </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  itemImg: {
    borderRadius: 20,
    width: 90,
    height: 90,
  },
  itemContent: {
    flex: 1,
    justifyContent: "space-between",
    gap: 5,
    paddingVertical: 5,
  },
  itemSource: {
    flexDirection: "row",
    gap: 5,
  },
});
