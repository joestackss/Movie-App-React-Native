import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import MovieCard from "../MovieCard";

var { width } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  // console.log("Trending Movies", data);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mt-2 mb-4 ">
      <View className="flex-row justify-between">
        <Text className="text-white text-lg font-bold mx-4 mb-4">
          Trending Movie
        </Text>
      </View>

      {/* Carousal */}
      <Carousal
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
