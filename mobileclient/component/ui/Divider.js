import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "rgb(246,246,246)",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
