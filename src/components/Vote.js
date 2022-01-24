// Importações React
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome";

const Vote = (props) => {
  const [liked, setLiked] = useState({
    vote: props.joke.voted != null ? true : false,
    type: props.joke.voted,
  });
  const [count, setCount] = useState(props.joke.likes);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    props.userVoting(props.joke, count);
  }, [count]);

  function _userVoting(type) {
    if (type == "up" && liked.vote == false) {
      setCount(count + 1);
      setLiked({ vote: true, type: type });
    } else if (type == "down" && liked.vote == false) {
      setCount(count - 1);
      setLiked({ vote: true, type: type });
    } 
    
    else if (liked.type == "down" && type == "up" && liked.vote == true) {
      setCount(count + 2);
      setLiked({ vote: true, type: type });
    } else if (liked.type == "up" && type == "down" && liked.vote == true) {
      setCount(count - 2);
      setLiked({ vote: true, type: type });
    } 
    
    else if (liked.type == "down" && type == "down" && liked.vote == true) {
      setCount(count + 1);
      setLiked({ vote: false, type: "" });
    } else if (liked.type == "up" && type == "up" && liked.vote == true) {
      setCount(count - 1);
      setLiked({ vote: false, type: "" });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // disabled={liked.vote == true && liked.type == "up" ? true : null}
        onPress={() => _userVoting("up")}
      >
        {liked.vote == true && liked.type == "up" ? (
          <Icon name={"arrow-circle-up"} size={28} color={"#21A747"} />
        ) : (
          <Icon name={"arrow-up"} size={22} color={"#433327"} />
        )}
      </TouchableOpacity>
      <Text style={styles.counter}>{count}</Text>
      <TouchableOpacity
        // disabled={liked.vote == true && liked.type == "down" ? true : null}
        onPress={() => _userVoting("down")}
      >
        {liked.vote == true && liked.type == "down" ? (
          <Icon name={"arrow-circle-down"} size={28} color={"#A72121"} />
        ) : (
          <Icon name={"arrow-down"} size={22} color={"#433327"} />
        )}
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
