// Importações React
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

// Importação de componentes
import JokeCard from "../components/JokeCard.js";
import FilterModal from "../components/FilterModal.js";
import LoadingScreen from "../components/LoadingScreen.js";
import LoadingIndicator from "../components/LoadingIndicator.js";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome5";
import { database } from "../services/firebase.js";
import { auth } from "../services/firebase.js";

const HomeScreen = ({ navigation }) => {
  const [filter, setFilter] = useState();
  const [scrollLoading, setScrollLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [jokes, setJokes] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Função para verificar se a piada já esta no array
  function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

  // Função para buscar dados da API de piadas
  function fetchJokeAPI(count) {
    const fetchData = jokes;
    for (let i = 0; i < count; i++) {
      fetch(
        "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10"
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          setScrollLoading(false);
          responseJson.jokes.forEach((element) => {
            if (arrayObjectIndexOf(fetchData, element.id, "id") != element.id) {
              fetchData.push({ ...element, likes: 0, inDatabase: false });
            }
          });
          setJokes(fetchData);
        })
        .catch((error) => {});
    }
  }

  // Função para buscar piadas no bancod de dados
  function getJokes() {
    database
      .collection("Jokes")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size == 0) {
          return;
        }
        const list = jokes;
        querySnapshot.forEach((query) => {
          list.push({ ...query.data() });
        });
        list.sort((a, b) => {
          if (a.likes < b.likes) {
            return 1;
          }
          if (a.likes > b.likes) {
            return -1;
          }
          return 0;
        });
        setJokes(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Função para adicionar uma piada no banco de dados
  function createJoke(joke) {
    database
      .collection("Jokes")
      .doc(`${joke.id}`)
      .set({ ...joke, likers: [auth.currentUser?.email] });
  }

  // Função para atualizar uma piada no banco de dados
  function updateJoke(joke, likes) {
    database.collection("Jokes").doc(`${joke.id}`).update({
      likes: likes,
      likers: joke.likers,
    });
  }

  // Handle para ação de voto
  function userVoting(joke, likes) {
    const newJokes = jokes;
    const index = arrayObjectIndexOf(jokes, joke.id, "id");

    if (joke.inDatabase == true) {
      if (joke.likes < likes) newJokes[index].voted = "up";
      else newJokes[index].voted = "down";

      // Verifica se o usuário que está dando o voto, já está na lista de likers
      const likerIndex = joke.likers.indexOf(auth.currentUser?.email);
      if (likerIndex == -1) {
        newJokes[index].likers.push(auth.currentUser?.email);
      }

      newJokes[index].likes = likes;
      setJokes(newJokes);
      updateJoke(jokes[index], likes);
    } else {
      newJokes[index].inDatabase = true;
      newJokes[index].likes = likes;
      setJokes(newJokes);
      createJoke(jokes[index]);
    }
  }

  // Componentes da FlatList
  const Item = ({ joke }) => <JokeCard userVoting={userVoting} joke={joke} />;
  const renderItem = ({ item }) => <Item joke={item} />;

  // Handle para fechar o modais
  function closeModal() {
    setFilterModalVisible(false);
  }

  // Handle para identificar quando o usuário rolar todo o feed
  function handleEndOfPage() {
    setScrollLoading(true);
  }

  /* Hook de efeito, executado após a montagem do componente para recuperar piadas
     do banco de dados */
  useEffect(() => {
    return getJokes();
  }, []);

  /* Hook de efeito, executado após a montagem do componente para consumir piadas
     da API */
  useEffect(() => {
    return fetchJokeAPI(1);
  }, [scrollLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        {/* Modais */}
        <FilterModal closeModal={closeModal} visible={filterModalVisible} />

        <View style={styles.header}>
          <Text style={styles.headerText}>
            Bem vindo{/*auth.currentUser?.email*/}!
          </Text>
          <Icon name={"user-circle"} size={30} color={"#FFF"} />
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.filterText}>Filtros</Text>
            <Icon name={"chevron-down"} size={20} color={"#433327"} />
          </TouchableOpacity>
          <Icon name={"redo"} size={22} color={"#433327"} />
        </View>
        <FlatList
          style={styles.containerJokes}
          data={jokes}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          onEndReached={handleEndOfPage}
          onEndReachedThreshold={0}
        ></FlatList>
        {scrollLoading ? <LoadingIndicator /> : null}
      </View>
    );
  }
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCC401",
  },
  containerJokes: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  header: {
    zIndex: 2,
    backgroundColor: "#433327",
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 26,
    color: "#FFF",
  },
  filterContainer: {
    zIndex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -20,
    paddingHorizontal: 30,
    paddingTop: 20,
    width: "100%",
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filter: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  filterText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default HomeScreen;
