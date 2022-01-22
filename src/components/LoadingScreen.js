// Importações React
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000"></ActivityIndicator>
    </View>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCC401",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
