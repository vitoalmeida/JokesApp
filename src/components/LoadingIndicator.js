// Importações React
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000"></ActivityIndicator>
    </View>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#FCC401",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingIndicator;
