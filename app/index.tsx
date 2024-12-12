import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => (
  <View>
    <Link href={"/(tabs)"}>
      <Text style={styles.text}>AAAAAAA</Text>
    </Link>
  </View>
);

export default Index;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
