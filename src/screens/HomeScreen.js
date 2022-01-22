// Importações React
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

// Importação de componentes
import JokeCard from "../components/JokeCard.js";

// Importação de bibliotecas
import { auth } from "../services/firebase.js";
//{auth.currentUser?.email}

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    return fetch(
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10 "
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false), setData(responseJson.jokes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);

  const Item = ({ joke }) => <JokeCard joke={joke} />;

  const renderItem = ({ item }) => <Item joke={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.filter}></View>
      <FlatList
        style={styles.containerJokes}
        data={data}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCC401",
  },
  containerJokes: {
    paddingHorizontal: 30,
  },
  header: {
    backgroundColor: "#433327",
    width: "100%",
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  filter: {
    zIndex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
});

export default HomeScreen;
