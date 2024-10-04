import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import axios from "axios";
import { BASE_URL } from "@env";
import { router } from "expo-router";
const Trending = ({ newsList }) => {
  // console.log(newsList);
  const getCategoryNews = async (cat) => {
    try {
      const response = await axios.get(BASE_URL + `&category=${cat}`);
      // console.log(response.data.results[0]);
      setTrendingList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTrendingList(newsList);
  }, [newsList]);
  const [category, setCategory] = useState("");
  const [trendingList, setTrendingList] = useState(newsList);
  const categoryChangeHandler = (cat) => {
    if (cat != "") getCategoryNews(cat);
    else setTrendingList(newsList);
    setCategory(cat);
  };
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>Trending Now</Text>
      <Categories
        onCategoryChange={categoryChangeHandler}
        category={category}
      ></Categories>
      <ScrollView style={{ marginBottom: 120 }}>
        {trendingList.map((item) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`news/${item.article_id}`);
              }}
              key={item.article_id}
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
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
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
