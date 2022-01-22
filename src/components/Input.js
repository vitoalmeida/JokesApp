// Importações React
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/MaterialIcons";

const MyInput = (props) => {
  return (
    <View style={styles.container}>
      <Icon name={props.icon} size={24} color={"#433327"} />
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(text) => props.setValue(text)}
        style={styles.input}
        secureTextEntry={!!props.secure ? true : false}
        dataDetectorTypes ={"all"}
      ></TextInput>
    </View>
  );
};

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 40,
    marginBottom: 25,
    borderRadius: 8,
    alignItems: "center",
    paddingLeft: 14,
  },
  input: {
    marginLeft: 10,
    width: "100%",
    height: "100%",
    padding: 5,
  },
});

export default MyInput;
