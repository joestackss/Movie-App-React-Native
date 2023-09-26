import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import TrendingMovies from "../components/TrendingMovie";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGenres,
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpComingMovie,
} from "../../utils/moviesapi";
import Loading from "../components/Loading";
import TopRatedMovies from "../components/TopRatedMovies";
import PopularMovie from "../components/PopularMovie";
import UpcomingMovie from "../components/UpcomingMovie";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [trending, SetTrending] = useState([]);
  const [topRated, SetTopRated] = useState([]);
  const [popular, SetPopular] = useState([]);
  const [upcoming, SetUpcoming] = useState([]);
  const [genre, SetGenres] = useState([]);

  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovie,
    onSuccess: (data) => {
      SetTrending(data.results);
    },
    onError: (error) => {
      console.log("Error fetching trending Movies", error);
    },
  });

  const { isLoading: isTopRatedLoading } = useQuery({
    queryKey: ["topratedMovies"],
    queryFn: fetchTopRatedMovie,
    onSuccess: (data) => {
      SetTopRated(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Top Rated Movies", error);
    },
  });

  const { isLoading: isPopularLoading } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovie,
    onSuccess: (data) => {
      SetPopular(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Popular Movies", error);
    },
  });

  const { isLoading: isUpcomingLoading } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: fetchUpComingMovie,
    onSuccess: (data) => {
      SetUpcoming(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Popular Movies", error);
    },
  });

  const { isLoading: isGenresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    onSuccess: (data) => {
      SetGenres(data.genres);
    },
    onError: (error) => {
      console.log("Error fetching Genre", error);
    },
  });

  // console.log("Trending Movies", trending);

  return (
    <View className="flex-1">
      <Image
        source={require("../../assets/images/homescreen1.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView className="mt-16">
        <StatusBar style="light" />

        {/* Welcome Title */}

        <View className="flex-row justify-between items-center mx-4 mg-4">
          <View className="border-2 border-white rounded-full overflow-hidden">
            <Image
              source={require("../../assets/images/avatar.png")}
              style={{
                width: 45,
                height: 45,
              }}
              resizeMode="cover"
            />
          </View>

          {/* Notification and Search Icon */}
          <View className="flex-row space-x-4">
            <BellIcon size={30} strokeWidth={2} color="white" />
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>

          {/* Movie Card */}
        </View>

        {isTrendingLoading ? (
          <Loading />
        ) : (
          <ScrollView>
            {/* Trending Movies */}
            {trending?.length > 0 && <TrendingMovies data={trending} />}

            {/* Popular Movies */}
            {popular?.length > 0 && (
              <PopularMovie title="Popular" data={popular} />
            )}

            {/* Top Rated Movies */}
            {topRated?.length > 0 && (
              <TopRatedMovies genre={genre} title="Top Rated" data={topRated} />
            )}

            {/* Upcoming Movies */}
            {upcoming?.length > 0 && (
              <UpcomingMovie title="Upcoming" data={upcoming} />
            )}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
}
