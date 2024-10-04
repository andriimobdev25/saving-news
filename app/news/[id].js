import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen");
const Article = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [bookmark, setBookmark] = useState(false);
  const [article, setArticle] = useState("");

  const setArticleBoomark = async (id) => {
    // console.log("press");
    // await AsyncStorage.clear();
    const jsonData = await AsyncStorage.getItem("bookmarks");
    let bookmarks = jsonData != null ? JSON.parse(jsonData) : [];
    console.log("before add", bookmarks);
    bookmarks.push(article);
    console.log("added", bookmarks);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmark(true);
  };
  const removeArticleBookmark = async (id) => {
    const jsonData = await AsyncStorage.getItem("bookmarks");
    let bookmarks = jsonData != null ? JSON.parse(jsonData) : [];
    bookmarks = bookmarks.filter(
      (bookmarkedArticle) => bookmarkedArticle.article_id != id
    );
    console.log("Removed :", bookmarks);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmark(false);
  };
  useEffect(() => {
    const checkArticleBookmarkState = async (id) => {
      const jsonData = await AsyncStorage.getItem("bookmarks");
      const bookmarks = jsonData != null ? JSON.parse(jsonData) : [];
      const check = bookmarks.findIndex(
        (bookmarkedArticle) => bookmarkedArticle.article_id == id
      );
      console.log("Initial", bookmarks);
      if (check != -1) {
        // console.log("set");
        setBookmark(true);
      }
    };
    const getArticleNews = async (id) => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_49795e656ee395aab6f4cdb1c513341198381&id=${id}`
        );
        // console.log(response.data.results);r
        setArticle(response.data.results[0]);
        checkArticleBookmarkState(id);
      } catch (error) {
        console.log(error);
      }
    };
    getArticleNews(id);
  }, [id]);
  useEffect(() => {
    navigation.setOptions({
      title: "Article",
      headerRight: () => {
        return (
          <Pressable
            onPress={() => {
              bookmark ? removeArticleBookmark(id) : setArticleBoomark(id);
            }}
          >
            <Ionicons
              name={bookmark ? "heart" : "heart-outline"}
              size={24}
              color={"red"}
            />
          </Pressable>
        );
      },
    });
  }, [bookmark]);
  return (
    <View style={[styles.outerContainer]}>
      {article == "" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            size={"large"}
            color={Colors.PRIMARY_COLOR}
            style={{ alignSelf: "center" }}
          ></ActivityIndicator>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={{ gap: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {article.title}
            </Text>
            <View style={{ gap: 5 }}>
              <Text style={{ fontWeight: "light", fontSize: 12 }}>
                Published Date : {article.pubDate}
              </Text>
              <Text>Source : {article.source_name}</Text>
            </View>
          </View>
          {article.image_url != null ? (
            <Image
              source={{ uri: article.image_url }}
              resizeMode="cover"
              style={{
                width: width,
                height: 200,
                borderRadius: 20,
                marginVertical: 5,
              }}
            ></Image>
          ) : (
            <View
              style={{
                width: width,
                height: 200,
                borderRadius: 20,
                marginVertical: 5,
              }}
            >
              <MaterialIcons name="article" size={500} color="black" />
            </View>
          )}

          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {article.description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Article;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    // alignItems: "center",
  },
  contentContainer: {
    marginHorizontal: 15,
    paddingVertical: 10,
  },
});
