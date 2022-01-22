// Importações React
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/FontAwesome";

const Vote = (props) => {
    return (
        <View style={styles.container}>
            <Icon name={"arrow-up"} size={22} color={"#433327"} />
            <Text style={styles.counter}>20</Text>
            <Icon name={"arrow-down"} size={22} color={"#433327"} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        color: '#433327',
        fontSize: 14,
        marginVertical: 10,
    }
})

export default Vote;