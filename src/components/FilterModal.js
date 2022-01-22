// Importações React
import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

// Importação de componentes

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome";

const FilterModal = (props) => {
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
            <Icon name="times" size={20} color={"#000"}></Icon>
          </TouchableOpacity>
          <Text> Teste</Text>
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
    backgroundColor: "#00000066"
  },
  modal: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 35,
    paddingVertical: 35,
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
    top: 25,
    right: 25,
    zIndex: 2,
  },
});

export default FilterModal;
