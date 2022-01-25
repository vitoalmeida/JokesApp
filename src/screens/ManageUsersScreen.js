// Importações React
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Importação de bibliotecas
import Icon from "react-native-vector-icons/FontAwesome5";
import { database } from "../services/firebase.js";

// Importação de componentes

const ManageUsersScreen = ({ route, navigation }) => {
  const { userLevel } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}
          onPress={() => {
            navigation.navigate("Home", { userLevel: userLevel });
          }}
        >
          <Icon name={"chevron-left"} size={25} color={"#FFF"} />
        </TouchableOpacity>
        <View style={styles.headerConteinerText}>
          <Text style={styles.headerText}>Gerenciamento de</Text>
          <Text style={styles.headerText}>Usuários</Text>
        </View>
      </View>
    </View>
  );
};

// Estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCC401",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#433327",
    width: "100%",
    height: 110,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerBtn: {
    position: 'absolute',
    left: 25,
    top: 50
  },
  headerConteinerText: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    color: "#FFF",
  },
});

export default ManageUsersScreen;
