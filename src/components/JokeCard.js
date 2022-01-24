// Importações React
import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Importação de componentes
import JokeModal from "../components/JokeModal.js";

// Importações de Bibliotecas
import Vote from "./Vote";

const JokeCard = (props) => {
  const [jokeModalVisible, setJokeModalVisible] = useState(false);

  function _userVoting(joke, likes) {
    props.userVoting(joke, likes);
  }

  function closeModal() {
    setJokeModalVisible(false);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setJokeModalVisible(true)}
    >
      <JokeModal joke={props.joke} closeModal={closeModal} visible={jokeModalVisible} />
      <View style={styles.voteContainer}>
        <Vote userVoting={_userVoting} joke={props.joke} />
      </View>
      <Text style={styles.jokeText}>{props.joke.joke}</Text>
    </TouchableOpacity>
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
