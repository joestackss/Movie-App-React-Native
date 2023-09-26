import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { image500 } from "../../../utils/moviesapi";

export default function Cast({ cast, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Person", item)}
        className="items-start mr-6"
      >
        <View className="items-start justify-start w-full h-[120] rounded-sm overflow-hidden ">
          <Image
            className="rounded-lg h-[100%] w-full"
            source={{
              uri: image500(item.profile_path),
            }}
          />
        </View>

        <View className="mt-3">
          <Text className="text-white text-left ">
            {item?.character.length > 10
              ? ` ${item.original_name.slice(0, 10)} ...`
              : item?.original_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="my-2 mb-8">
      <Text className="text-white text-lg mx-4 mb-5 font-bold">Cast</Text>

      <FlatList
        horizontal
        data={cast}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id} -${index}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
    </View>
  );
}
