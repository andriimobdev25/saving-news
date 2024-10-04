import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import BreakingNews from "../../components/BreakingNews";
import Trending from "../../components/Trending";
import Header from "../../components/Header";
import DummyData from "../../constants/DummyData";
import axios from "axios";
import Colors from "../../constants/Colors";
const Home = () => {
  const safeArea = useSafeAreaInsets();
  const [newsList, setNewsList] = useState([]);
  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(process.env.BASE_URL);
      // console.log(response.data);
      setNewsList(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBreakingNews();
  }, []);
  return (
    <ScrollView
      style={[
        styles.outerContainer,
        { paddingTop: safeArea.top, paddingBottom: safeArea.bottom },
      ]}
    >
      <Header></Header>
      <SearchBar></SearchBar>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          flex: 1,
        }}
      >
        {newsList.length > 0 ? (
          <BreakingNews breakingNews={newsList}></BreakingNews>
        ) : (
          <ActivityIndicator
            color={Colors.PRIMARY_COLOR}
            size={"large"}
          ></ActivityIndicator>
        )}
      </View>
      <Trending newsList={newsList}></Trending>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
