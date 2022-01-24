// Importações React
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Importações de Bibliotecas
import Vote from "./Vote";

const JokeCard = (props) => {
  function _userVoting(joke, likes) {
    props.userVoting(joke, likes);
  }

  return (
    <View style={styles.container}>
      <View style={styles.voteContainer}>
        <Vote userVoting={_userVoting} joke={props.joke} />
      </View>
      <Text style={styles.jokeText}>{props.joke.joke}</Text>
    </View>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    maxHeight: 200,
    marginBottom: 20,
    paddingVertical: 28,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  voteContainer: {
    marginRight: 10,
    paddingLeft: 6,
    // paddingRight: 12,
    // justifyContent: "center",
    borderRightWidth: 2,
    borderRightColor: "#DDD",
    height: "100%",
    width: "18%",
  },
  jokeText: {
    width: "70%",
    overflow: "scroll",
  },
});

export default JokeCard;
