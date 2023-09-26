import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { image500, searchMovies } from "../../utils/moviesapi";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        console.log("We got our search results");
        setLoading(false);
        if (data && data.results) {
          setResults(data.results);
        }
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View className="flex-1 relative">
      <Image
        source={require("../../assets/images/homescreen2.png")}
        style={{
          width: width,
          height: height,
        }}
        className="absolute"
      />

      {/* Search Input */}

      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-white rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your Favorite movies"
          placeholderTextColor={"gray"}
          className="pb-1 pl-6 flex-1 font-medium text-black tracking-wider"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-6"
        >
          <Text className="text-white font-semibold ml-1 text-lg mt-2">
            {results.length} Results
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri:
                          image500(item.poster_path) ||
                          "https://th.bing.com/th/id/R.983b8085251688a15240a6ab11b97c39?rik=MlZlZUcTUEgjyw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1946050.jpg&ehk=s%2fbeqrs6stRqTs%2bO5MOpsePOb%2bQbXA2KyK8HwRy4jCw%3d&risl=&pid=ImgRaw&r=0",
                      }}
                      className="rounded-3xl"
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                    />
                    <Text className="text-gray-300 font-bold text-lg ml-1">
                      {item.title.length > 19
                        ? item.title.slice(0, 19) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        ""
      )}
    </View>
  );
}
