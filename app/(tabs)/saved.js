import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewsList from "../../components/NewsList";
import Colors from "../../constants/Colors";
const SavedArticlesPage = () => {
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    const getSavedArticles = async () => {
      let jsonData = await AsyncStorage.getItem("bookmarks");
      let bookmarks = jsonData != null ? JSON.parse(jsonData) : [];
      setSaved(bookmarks);
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {saved.length > 0 ? (
        <NewsList trendingList={saved}></NewsList>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <ActivityIndicator
            size={"large"}
            color={Colors.PRIMARY_COLOR}
            style={{ alignSelf: "center" }}
          ></ActivityIndicator>
        </View>
      )}
    </View>
  );
};

export default SavedArticlesPage;

const styles = StyleSheet.create({});
