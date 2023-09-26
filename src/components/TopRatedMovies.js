import {
  View,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../utils/moviesapi";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function TopRatedMovies({ data, title, genre }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    const itemGenre = genre.find((g) => g.id === item.genre_ids[0]);

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
        <View className="space-y-1 mr-4 mb-6">
          <Image
            source={{
              uri: image500(item.poster_path),
            }}
            className="rounded-3xl relative"
            style={{
              width: width * 0.63,
              height: height * 0.15,
            }}
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />

          <View className="absolute bottom-3 left-3">
            <Text className="text-neutral-300 ml-1 text-lg font-bold">
              {item.title.length > 20
                ? item.title.slice(0, 20) + "..."
                : item.title}
            </Text>

            <View className="flex-row">
              <Text className="text-neutral-300 ml-1 text-sm font-medium">
                {item.vote_average} *
              </Text>
              <Text className="text-neutral-300 ml-1 text-sm font-medium">
                {itemGenre?.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View className="space-y-4 my-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg font-bold">{title}</Text>
      </View>

      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
    </View>
  );
}
