// Importações React
import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome";

const FilterModal = (props) => {
  function _closeModal() {
    props.closeModal();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => _closeModal()}
      backdropTransitionOutTiming={2}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => _closeModal()}
          >
            <Icon name="times" size={20} color={"#000"}></Icon>
          </TouchableOpacity>
          <View style={styles.filterConteiner}>
            <Text style={styles.filterConteinerText}>Ordenar por:</Text>
          </View>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              props.defineFilter("upvote");
              _closeModal();
            }}
          >
            <Text>Mais UpVotes </Text>
            <Icon name={"arrow-up"} size={15} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              props.defineFilter("downvote");
              _closeModal();
            }}
          >
            <Text>Mais DownVotes </Text>
            <Icon name={"arrow-down"} size={15} color={"#000"} />
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 2,
  },
  filterConteiner: {
    backgroundColor: "#D6D6D6",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  filterConteinerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  filter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default FilterModal;
