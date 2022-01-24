// Importações React
import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

// Importação de componentes

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome";

const JokeModal = (props) => {
  // Componentes da FlatList
  const Item = ({ liker }) => <Text style={styles.liker}>{liker}</Text>;
  const renderItem = ({ item }) => <Item liker={item} />;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.closeModal()}
      backdropTransitionOutTiming={2}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => props.closeModal()}
          >
            <Icon name="times" size={20} color={"#FFF"}></Icon>
          </TouchableOpacity>
          <View style={styles.likesConteiner}>
            <Text style={styles.likesCount}>{props.joke.likes}</Text>
            <Text style={styles.likesText}>Contagem de Votos</Text>
          </View>
          <Text style={styles.lastLikers}>Últimos votantes:</Text>
          <FlatList
            data={props.joke.likers}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </View>
    </Modal>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#00000066",
  },
  modal: {
    width: "100%",
    paddingBottom: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10,
  },
  modalClose: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingVertical: 25,
    zIndex: 2,
  },
  likesConteiner: {
    backgroundColor: "#433327",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  likesCount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  likesText: {
    color: "#fff",
    fontSize: 12,
  },
  lastLikers: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  liker: {
    fontSize: 16,
    marginTop: 10,
  }
});

export default JokeModal;
