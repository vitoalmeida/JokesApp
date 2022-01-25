// Importações React
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
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

const HomeScreen = ({ route, navigation }) => {
  // Pega o nível de permissão do usuário
  const { userLevel } = route.params;

  const [scrollLoading, setScrollLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
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
          responseJson.jokes.forEach((element) => {
            // Não permite puxar da API piadas que já estejam no banco
            if (arrayObjectIndexOf(fetchData, element.id, "id") != element.id) {
              fetchData.push({
                ...element,
                likes: 0,
                inDatabase: false,
                hide: false,
              });
            }
          });
          setJokes(fetchData);
          setLoading(false);
          setScrollLoading(false);
          setRefreshing(false);
          console.log("Chamou a API");
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
        if (querySnapshot.size != 0) {
          const list = jokes;
          querySnapshot.forEach((query) => {
            list.push({ ...query.data() });
          });
          if (list.length > 0) {
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
          }
          console.log("Chamou o Banco");
        }
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
      const likerIndex = newJokes[index].likers.indexOf(auth.currentUser?.email);
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
  const Item = ({ joke }) => (
    <JokeCard
      hideJoke={hideJoke}
      userLevel={userLevel}
      userVoting={userVoting}
      joke={joke}
    />
  );
  const renderItem = ({ item }) => {
    if (item.hide != true) return <Item joke={item} />;
  };

  // Handle para fechar o modal de filtros
  function closeModal() {
    setFilterModalVisible(false);
  }

  // Função para um administrador esconder uma piada
  function hideJoke(joke) {
    const newJokes = jokes;
    const index = arrayObjectIndexOf(newJokes, joke.id, "id");
    newJokes[index].hide = !newJokes[index].hide;
    setJokes(newJokes);

    // Caso a piada esteja no banco de dados, altera o booleanod da propriedade "hide"
    if (newJokes[index].inDatabase == true) {
      database.collection("Jokes").doc(`${newJokes[index].id}`).update({
        hide: jokes[index].hide,
      });
      // Caso a piada não esteja no banco, adiciona ela
    } else {
      database
        .collection("Jokes")
        .doc(`${jokes[index].id}`)
        .set({ ...jokes[index], hide: true, inDatabase: true });
    }
  }

  // Função para filtrar a lista de piadas
  function defineFilter(type) {
    const newJokes = jokes;

    if (type == "upvote") {
      newJokes.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });
    } else {
      newJokes.sort((a, b) => {
        if (a.likes > b.likes) {
          return 1;
        }
        if (a.likes < b.likes) {
          return -1;
        }
        return 0;
      });
    }
    setJokes(newJokes);
  }

  // Handle para identificar quando o usuário rolar todo o feed
  function handleEndOfPage() {
    setScrollLoading(true);
  }

  // Handle para deslogar
  function handleSignOut() {
    Alert.alert("Confirmar", "Tem certeza que deseja sair?", [
      {
        text: "Sim",
        onPress: () => {
          auth
            .signOut()
            .then(() => {
              navigation.replace("Login");
            })
            .catch((error) => alert(error.message));
        },
      },
      { text: "Não" },
    ]);
  }

  // Handle para identificar quando o usuário solicitar refresh da pagina
  function refreshPage() {
    setJokes([]);
    setRefreshing(true);
  }

  /* Hook de efeito, executado após a montagem do componente para recuperar piadas
     do banco de dados */
  useEffect(() => {
    if (isLoading == true || isRefreshing == true) return getJokes();
  }, [isLoading, isRefreshing]);

  /* Hook de efeito, executado após a montagem do componente para consumir piadas
     da API */
  useEffect(() => {
    if (isLoading == true || scrollLoading == true || isRefreshing == true)
      return fetchJokeAPI(2);
  }, [isLoading, isRefreshing, scrollLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        {/* Modais */}
        <FilterModal
          defineFilter={defineFilter}
          closeModal={closeModal}
          visible={filterModalVisible}
        />

        <View style={styles.header}>
          <Text style={styles.headerText}>Bem vindo!</Text>
          <View style={styles.headerBtns}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ManageUsers", { userLevel: userLevel });
              }}
            >
              <Icon name={"users-cog"} size={25} color={"#FFF"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut}>
              <Icon name={"sign-out-alt"} size={25} color={"#FFF"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.filterText}>Ordernar</Text>
            <Icon name={"chevron-down"} size={20} color={"#433327"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refreshPage()}>
            <Icon name={"redo"} size={22} color={"#433327"} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.containerJokes}
          data={jokes}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          onEndReached={handleEndOfPage}
          onEndReachedThreshold={0}
          onRefresh={() => refreshPage()}
          refreshing={isRefreshing}
          extraData={isRefreshing}
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
    paddingHorizontal: 20,
    paddingTop: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 26,
    color: "#FFF",
  },
  headerBtns: {
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between",
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
