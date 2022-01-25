// Importações React
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Importação de componentes
import JokeModal from "../components/JokeModal.js";

// Importações de Bibliotecas
import Vote from "./Vote";

const JokeCard = (props) => {
  const [jokeModalVisible, setJokeModalVisible] = useState(false);
  const [isHide, setHide] = useState(false);

  // const opac = isHide ? 0 : 1;

  function _userVoting(joke, likes) {
    props.userVoting(joke, likes);
  }

  function _hideJoke() {
    setHide(!isHide);
    props.hideJoke(props.joke);
  }

  function closeModal() {
    setJokeModalVisible(false);
  }

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => setJokeModalVisible(true)}
    >
      <JokeModal
        joke={props.joke}
        closeModal={closeModal}
        visible={jokeModalVisible}
      />
      {isHide ? (
        <View style={styles.banned}>
          <Icon name="ban" size={100} color={"#FFC0C0"}></Icon>
        </View>
      ) : null}
      <View style={styles.voteContainer}>
        <Vote userVoting={_userVoting} joke={props.joke} />
      </View>
      <Text style={styles.jokeText}>{props.joke.joke}</Text>
      {props.userLevel == 1 ? (
        <TouchableOpacity style={styles.hideJoke} onPress={() => _hideJoke()}>
          <Icon name="ban" size={20} color={"#CB1E1E"}></Icon>
        </TouchableOpacity>
      ) : null}
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
    paddingRight: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    borderRadius: 12,
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  voteContainer: {
    marginRight: 10,
    paddingLeft: 6,
    borderRightWidth: 2,
    borderRightColor: "#DDD",
    justifyContent: "center",
    width: "18%",
  },
  jokeText: {
    width: "70%",
    height: "100%",
    overflow: "scroll",
  },
  hideJoke: {
    position: "absolute",
    paddingHorizontal: 15,
    paddingVertical: 50,
    right: 0,
    zIndex: 2,
  },
  banned: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default JokeCard;
