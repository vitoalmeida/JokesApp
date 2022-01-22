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
import { auth } from "../services/firebase.js";

const HomeScreen = ({ navigation }) => {
  const [filter, setFilter] = useState();
  const [scrollLoading, setScrollLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Função para verificar se a piada já esta no array
  function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

  function fetchJokeAPI(count) {
    var fetchData = [...data];
    for (let i = 0; i < count; i++) {
      fetch(
        "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10"
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          setScrollLoading(false);
          // fetchData = [...fetchData, ...responseJson.jokes];
          responseJson.jokes.forEach((element) => {
            if (arrayObjectIndexOf(fetchData, element.id, "id") != element.id) {
              fetchData.push(element);
              setData(fetchData);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
    
    useEffect(() => {
      return fetchJokeAPI(2);
    }, [scrollLoading]);
    
    
  const Item = ({ joke }) => <JokeCard joke={joke} />;

  const renderItem = ({ item }) => <Item joke={item} />;

  function closeModal() {
    setModalVisible(false);
  }

  function handleEndOfPage() {
    setScrollLoading(true);
  }

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        <FilterModal closeModal={closeModal} visible={modalVisible} />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Bem vindo! {/*,{auth.currentUser?.email}*/}{" "}
          </Text>
          <Icon name={"user-circle"} size={30} color={"#FFF"} />
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.filterText}>Filtros</Text>
            <Icon name={"chevron-down"} size={20} color={"#433327"} />
          </TouchableOpacity>
          <Icon name={"redo"} size={22} color={"#433327"} />
        </View>
        <FlatList
          style={styles.containerJokes}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          // refreshing={}
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
