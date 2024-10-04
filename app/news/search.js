import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import NewsList from "../../components/NewsList";
import Colors from "../../constants/Colors";
const search = () => {
  const { category, country, q } = useLocalSearchParams();
  //   console.log(q, category, country);
  const [searchResult, setSearchResult] = useState([]);
  const getSearchNews = async () => {
    try {
      let url =
        "https://newsdata.io/api/1/news?apikey=pub_49795e656ee395aab6f4cdb1c513341198381";
      if (q) url += `&q="${q}"`;
      if (category) url += `&category=${category.trim()}`;
      if (country) url += `&country=${country?.trim().toLowerCase()}`;
      const response = await axios.get(url);
      // console.log(response.data.results);
      setSearchResult(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSearchNews();
  }, [country, category]);
  return (
    <View style={{ flex: 1 }}>
      {searchResult.length > 0 ? (
        <NewsList trendingList={searchResult}></NewsList>
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

export default search;

const styles = StyleSheet.create({});
