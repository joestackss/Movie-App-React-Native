import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
