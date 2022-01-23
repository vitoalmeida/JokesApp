// Importações React
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome";

const Vote = (props) => {
  function _userVoting(type) {
    props.userVoting(type);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => _userVoting("like")}>
        <Icon name={"arrow-up"} size={22} color={"#433327"} />
      </TouchableOpacity>
      <Text style={styles.counter}>{props.joke.likes}</Text>
      <TouchableOpacity onPress={() => _userVoting("dislike")}>
        <Icon name={"arrow-down"} size={22} color={"#433327"} />
      </TouchableOpacity>
    </View>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    color: "#433327",
    fontSize: 14,
    marginVertical: 10,
  },
});

export default Vote;
