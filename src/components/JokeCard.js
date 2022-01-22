// Importações React
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Importações de Bibliotecas
import Icon from "react-native-vector-icons/MaterialIcons";
import Vote from "./Vote";

const JokeCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.voteContainer}>
                <Vote/>
            </View>
            <Text style={styles.jokeText}>
                {props.joke.joke}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        maxHeight: 130,
        marginTop: 20,
        paddingVertical: 28,
        borderRadius: 8,
        flexDirection: 'row'
    },
    voteContainer: {
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 14,
        borderRightWidth: 2,
        borderRightColor: '#DDD',
        height: '100%',
        width: '18%'
    },
    jokeText: {
        width: '70%',
        overflow: 'scroll',
    }
})

export default JokeCard;